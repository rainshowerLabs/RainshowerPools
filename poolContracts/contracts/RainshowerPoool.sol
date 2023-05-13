// SPDX-License-Identifier: 3BSD
pragma solidity ^0.8.0;

import "./RiskController/interface/IRiskController.sol";
import "./PooolToken/PooolToken.sol";
import "./interface/IRainshowerFactory.sol";
import "./interface/IRainshowerBorrow.sol";
import "./Events.sol";
import "./DataAdapters/IAdapter.sol";

import {FixedPointMathLib as FPML} from "./lib/FixedPointMathLib.sol";

/**
 * The RainshowerPoool manages lending
 */
contract RainshowerPoool is Events {

	// Errors
	error Risk();
	error PooolDoesNotExist();
	error Unauthorized();

	// Risk controller gives you a go/no go if you can open a borrow
	IRiskController public riskController;
	// Factory address
	IRainshowerFactory public factory;
	// DAO
	address public governanceContract;
	// Interest bearing tokens
	mapping (address => address) pooolTokenContracts;
	// Adapters to decode module data
	mapping (address => address) dataAdapters;
	// This is horrible, but i dont want to deal with events
	uint256 public latestRate;

	constructor(address _riskController, address _factory) {
		riskController = IRiskController(_riskController);
		governanceContract = msg.sender;
		factory = IRainshowerFactory(_factory);
	}

	// Adds a new token and deploys new PooolToken for that asset
	function addAsset (address _asset) external {
		if (msg.sender != governanceContract) {
			revert Unauthorized();
		}
		// Get the name of the `_asset` and add a `r` in front
		string memory _name = string(abi.encodePacked("r", PooolToken(_asset).name()));
		// Get the symbol of the `_asset` and add a `r` in front
		string memory _symbol = string(abi.encodePacked("r", PooolToken(_asset).symbol()));

		PooolToken newToken = new PooolToken(_name, _symbol);
		pooolTokenContracts[_asset] = address(newToken);
	}
	
	// Adds a new borrow adapter to the borrow key
	function addAdapter (address _adapter, address _module) external {
		if (msg.sender != governanceContract) {
			revert Unauthorized();
		}
		dataAdapters[_module] = _adapter;
	}

	function deposit (address _token, uint256 _amount) external {
		// Get the Poool token address of the token we're depositing
		address _pooolToken = pooolTokenContracts[_token];
		if (_pooolToken == address(0)) {
			revert PooolDoesNotExist();
		}
		// Transferfrom the msg.sender to this contract
		PooolToken(_token).transferFrom(msg.sender, address(this), _amount);
		
		// Mint the _amount to the msg.sender
		PooolToken(_pooolToken).mint(msg.sender, _amount);
	}

	function withdraw (address _token, uint256 _amount) external {
		// Get the Poool token address of the token we're depositing
		address _pooolToken = pooolTokenContracts[_token];
		if (_pooolToken == address(0)) {
			revert PooolDoesNotExist();
		}

		// Burn the _amount to the msg.sender
		PooolToken(_pooolToken).burn(msg.sender, _amount);

		// Transferfrom the msg.sender to this contract
		PooolToken(_token).transfer(msg.sender, _amount);
	}

	function getRates (address _token) public returns(uint256) {
		// Gets the balanceOf address(this) of the `_token`
		uint256 _poolBalance = PooolToken(_token).balanceOf(address(this));
		// Gets the totalSupply of the `_token`
		uint256 _totalSupply = PooolToken(pooolTokenContracts[_token]).totalSupply();
		// Divide `_poolBalance` by `_totalSupply` to get the utilizatio 
		uint256 _utilization = FPML.divWadUp(_poolBalance, _totalSupply);

		uint256 _rate;
		if (_utilization > 800000000000000000) {
			_rate = FPML.mulWadUp(FPML.divWadUp(_utilization, 800000000000000000), 20000000000000000);
		} else {
			_rate = 1000000000000000000 + FPML.mulWadUp(FPML.divWadUp((_utilization-800000000000000000), 20000000000000000), 20000000000000000);

		}

		latestRate = _rate;

		return _rate;
	}


	function getQuote (
		address _module,
		bytes memory _borrowData
		) external returns(address _res) {

		// Get the adapter address
		address _adapter = dataAdapters[_module];
		// Call the adapter with the borrow data
		// TODO: implement adapters.
		(address _borrowToken, uint128 _borrowTokenAmount) = IAdapter(_adapter).decode(_borrowData);

		// Call RiskController to see if we can open a position with the data
		// funny address
		if (!riskController.assessPair(address(0))) {
			revert Risk();
		}

		// Call factory to create borrow with data
		_res = IRainshowerFactory(factory).createBorrow(_module, type(uint64).max, _borrowData);

		// Approve the borrow
		PooolToken(_borrowToken).approve(_res, _borrowTokenAmount);

		IRainshowerBorrow(_res).fundWithTokens();

		emit getQuoteEvent(_res);
		return _res;
	}
}
