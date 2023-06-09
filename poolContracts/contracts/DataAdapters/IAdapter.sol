// SPDX-License-Identifier: 3BSD
pragma solidity ^0.8.0;

interface IAdapter {
	function decode (bytes memory _data) external returns (address, uint128);
}
