// SPDX-License-Identifier: 3BSD
pragma solidity ^0.8.0;

contract UniswapDataAdapter {
	struct swapData {
	    address quoteToken;
	    uint128 quoteAmount;
	    address baseToken;
	    address oracleAddress;
	    uint24 poolFee;
	    uint32 period;
	    uint80 maintanenceMargin;
	    address swapRouterAddress;
	    address pool;
	}

	function decode (bytes memory _data) returns (swapData memory swap) public {
		swap = abi.decode(_data, (swapData));
		return swap;
	}	
}
