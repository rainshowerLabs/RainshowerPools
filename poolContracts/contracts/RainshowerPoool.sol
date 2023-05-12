pragma solidity ^0.8.0;

import "./RiskController/interface/IRiskController.sol";
import "./PooolToken/PooolToken.sol";

/**
 * The RainshowerPoool manages lending
 */
contract RainshowerPoool is PooolToken {

	// Errors
	error Risk();
	error Unauthorized();
	error PooolDoesNotExist();

	// Risk controller gives you a go/no go if you can open a borrow
	IRiskController public riskController;
	// DAO
	address public governance;
	// Available token balances
	mapping (address => uint256) availableTokenBalance;
	// Interest bearing tokens
	mapping (address => address) pooolTokenContracts;
	// Adapters to decode module data
	mapping (address => address) moduleAdapters;

	constructor(address _riskController) {
		riskController = IRiskController(_riskController);
		governance = msg.sender;
	}

	// Adds a new token and deploys new PooolToken for that asset
	function addAsset (address _asset) external public {
		if (msg.sender != governance) {
			Unauthorized();
		}
		// Get the name of the `_asset` and add a `r` in front
		string memory _name = string(abi.encodePacked("r", PooolToken(_asset).name()));
		// Get the symbol of the `_asset` and add a `r` in front
		string memory _symbol = string(abi.encodePacked("r", PooolToken(_asset).symbol()));

		PooolToken newToken = new PooolToken(_name, _symbol);
		pooolTokenContracts[_asset] = address(newToken);
	}
	
	// Adds a new borrow adapter to the borrow key
	function addAdapter (address _adapter, address _borrow) {
		if (msg.sender != governance) {
			Unauthorized();
		}
		moduleAdapters[_borrow] = _adapter;
	}

	function deposit (address _token, uint256 _amount) external public {
		// Get the Poool token address of the token we're depositing
		address _pooolToken = pooolTokenContracts[_token];
		if (_pooolToken == address(0)) {
			PooolDoesNotExist();
		}
		// Transferfrom the msg.sender to this contract
		PooolToken(_token).transferFrom(msg.sender, address(this), _amount);
		
		// Add `_amount` to the overall balances
		unchecked {
			availableTokenBalance[_token] += _amount;
		}

		// Mint the _amount to the msg.sender
		PooolToken(_pooolToken).mint(msg.sender, _amount);
	}

	function withdraw (address _token, uint256 _amount) external public {
		// Get the Poool token address of the token we're depositing
		address _pooolToken = pooolTokenContracts[_token];
		if (_pooolToken == address(0)) {
			PooolDoesNotExist();
		}

		// Burn the _amount to the msg.sender
		PooolToken(_pooolToken).burn(msg.sender, _amount);

		// Remove `_amount` to the overall balances
		// Reverts if youre withdrawing more than available
		availableTokenBalance[_token] -= _amount;

		// Transferfrom the msg.sender to this contract
		PooolToken(_token).transfer(msg.sender, _amount);
	}

	function getQuote (
		address _module,
		uint64 _expiry,
		bytes memory _borrowData
		) returns(address _res) internal {
		// Check if the borrow amount is less than the available amount

	}
	

}