const hre = require("hardhat");

const testToken = {
  tokenName: "Ether",
  symbol: "ETH",
  decimals: 1000000000,
};
const factoryAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy Risk Controller
  const RiskController = await hre.ethers.getContractFactory("RiskController");
  const riskController = await RiskController.deploy();

  console.log("RiskController deployed to:", riskController.address);

  // Deploy Rainshower Pool
  const RainshowerPool = await hre.ethers.getContractFactory("RainshowerPoool");
  const rainshowerPool = await RainshowerPool.deploy(
    riskController.address,
    factoryAddress
  );

  console.log("RainshowerPool deployed to:", rainshowerPool.address);

  // Deploy poool token
  const PooolToken = await hre.ethers.getContractFactory("PooolToken");
  const pooolToken = await PooolToken.deploy(
    testToken.tokenName,
    testToken.symbol
  );

  console.log("PooolToken deployed to:", pooolToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
