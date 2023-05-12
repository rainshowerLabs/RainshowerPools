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

	IRiskController public riskController;
	address public governance;
	mapping (address => uint256) availableTokenBalance;
	mapping (address => address) pooolContracts;

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
		pooolContracts[_asset] = address(newToken);
	}
	

	function deposit (address _token, uint256 _amount) external public {
		// Get the Poool token address of the token we're depositing
		address _pooolToken = pooolContracts[_token];
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
		address _pooolToken = pooolContracts[_token];
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

}
