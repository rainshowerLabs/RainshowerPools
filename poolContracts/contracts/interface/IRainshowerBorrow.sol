//SPDX-License-Identifier: 3BSD
pragma solidity >=0.7.0;

interface IRainshowerBorrow {
    function fundWithTokens () external payable;
    function fundWithMarginAndOpen (uint256 _extraMargin) external payable;
    function close () external payable;
}
