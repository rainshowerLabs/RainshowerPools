interface IRiskController {
	function assessPair (address _uniswapPair) returns(bool) external view;
}
