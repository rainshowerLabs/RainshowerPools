// SPDX-License-Identifier: 3BSD
pragma solidity ^0.8.0;


contract UniswapDataAdapter {

	function decode(
		bytes memory _data
	) public pure returns (address quoteToken, uint256 quoteAmount) {
		assembly {
            quoteToken := mload(add(_data, 0x20))
            quoteAmount := mload(add(_data, 0x40))
        }
	}

}
