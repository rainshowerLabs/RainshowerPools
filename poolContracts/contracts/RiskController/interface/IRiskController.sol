// SPDX-License-Identifier: 3BSD
pragma solidity ^0.8.0;

interface IRiskController {
	function assessPair (address _uniswapPair) external pure returns(bool);
}
