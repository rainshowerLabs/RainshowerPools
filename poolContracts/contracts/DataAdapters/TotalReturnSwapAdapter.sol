// SPDX-License-Identifier: 3BSD
pragma solidity ^0.8.0;

contract TotalReturnSwapDataAdapter {
    struct params {
        address marginToken;
        address quoteToken;
        address oracleAddress;
        uint32 period;
        // Expressed as a minimum of how much the taker deposit can be 
        // swaped to the quote token.
        uint80 maintanenceMargin;
        uint56 initialDepositTimestamp;
        uint88 hourlyTakerFee;
        uint256 entryPrice;
        uint128 makerDeposit;
        uint128 takerDeposit;
    }

	function decode (bytes memory _data) public returns (params memory trs) {
		trs = abi.decode(_data, (swapData));
		return trs;
	}	
}
