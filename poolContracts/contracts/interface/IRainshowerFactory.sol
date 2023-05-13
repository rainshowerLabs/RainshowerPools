//SPDX-License-Identifier: 3BSD
pragma solidity ^0.8.0;

interface IRainshowerFactory {
	function createBorrow(
		address _moduleAddress,
		uint64 _expiry,
		bytes memory _data
	) external returns (address _borrowAddress);
	function isValidBorrow(address _address) external view returns (bool);
}
