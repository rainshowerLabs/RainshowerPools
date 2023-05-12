pragma solidity ^0.8.0;


import "@solmate/src/tokens/ERC20.sol";

contract PooolToken is ERC20 {

	address public governance;

	// Errors
	error Unauthorized();

	constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
		governance = msg.sender;
	}

	function mint(address _to, uint256 _amount) external {
		if (msg.sender != governance) {
			Unauthorized();
		}

		_mint(_to, _amount);
	}

	function burn(address _to, uint256 _amount) external {
		if (msg.sender != governance) {
			Unauthorized();
		}

		_burn(_to, _amount);
	}
}