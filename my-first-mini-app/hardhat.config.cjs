require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/*****************
 * Hardhat config for EtherCast
 * Uses the default Hardhat network. You can add Worldchain/other networks later
 * by extending the `networks` section with RPC URLs + deployer private key.
 *****************/

/** @type import('hardhat/config').HardhatUserConfig */
const config = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  networks: {
    worldchain: {
      url: process.env.WORLDCHAIN_RPC_URL || "",
      accounts: process.env.WORLDCHAIN_PRIVATE_KEY
        ? [process.env.WORLDCHAIN_PRIVATE_KEY]
        : [],
    },
  },
};

module.exports = config;
