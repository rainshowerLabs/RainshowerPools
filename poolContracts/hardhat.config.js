require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    local: {
      url: "http://127.0.0.1:8545/",
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? [process.env.PRIVATE_KEY]
          : [""],
    },
    scroll: {
      url: "https://alpha-rpc.scroll.io/l2",
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? [process.env.PRIVATE_KEY]
          : [""],
    },
    linea: {
      url: "https://rpc.goerli.linea.build",
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? [process.env.PRIVATE_KEY]
          : [""],
    },
    mumbai: {
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? [process.env.PRIVATE_KEY]
          : [""],
    },
    goerli: {
      url: "https://rpc.vnet.tenderly.co/devnet/jhjhjhjh/26a680a3-9cb8-45b3-a76f-1552ee9d3d06",
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? [process.env.PRIVATE_KEY]
          : [""],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
