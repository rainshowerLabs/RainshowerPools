// SPDX-License-Identifier: 3BSD
pragma solidity ^0.8.0;

contract UniswapDataAdapter {
	struct swapData {
	    address quoteToken; // this 
	    uint128 quoteAmount;
	    address baseToken;
	    address oracleAddress;
	    uint24 poolFee;
	    uint32 period;
	    uint80 maintanenceMargin;
	    address swapRouterAddress;
	    address pool;
	}

	function decode (bytes memory _data) public returns (address _quoteToken, uint128 _quoteAmount) {
		swap = abi.decode(_data, (swapData));
		return swap;
	}	
}
