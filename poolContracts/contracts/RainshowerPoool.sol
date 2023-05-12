pragma solidity ^0.8.0;

import "./RiskController/interface/IRiskController.sol";

/**
 * The RainshowerPoool contract does this and that...
 */
contract RainshowerPoool {

	IRiskController public riskController;
	mapping (address => uint256) tokenBalances;

	constructor(address _riskController) {
		riskController = IRiskController(_riskController);
	}

}
