require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("dotenv-defaults").config();
require("./tasks/transfer-ownership-admin");

const LACHAIN_RPC_URL = process.env.LACHAIN_RPC_URL;
const LACHAIN_EXPLORER_URL = process.env.LACHAIN_EXPLORER_URL;
const LATESTNET_RPC_URL = process.env.LATESTNET_RPC_URL;
const LATESTNET_EXPLORER_URL = process.env.LATESTNET_EXPLORER_URL;
const ETHEREUM_RPC_URL = process.env.ETHEREUM_RPC_URL;
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;
const PRIVATE_KEYS = process.env.PRIVATE_KEYS;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    lachain: {
      url: LACHAIN_RPC_URL,
      accounts: PRIVATE_KEYS.split(","),
      chainId: 274,
      gasPrice: 5000000000000,
    },
    latestnet: {
      url: LATESTNET_RPC_URL,
      accounts: PRIVATE_KEYS.split(","),
      chainId: 418,
      gasPrice: 10000000,
    },
    ethereum: {
      url: ETHEREUM_RPC_URL,
      accounts: PRIVATE_KEYS.split(","),
      chainId: 1,
      gasPrice: 25000000000,
    },
  },
  etherscan: {
    apiKey: {
      lachain: ETHERSCAN_KEY,
      latestnet: ETHERSCAN_KEY,
      ethereum: ETHERSCAN_KEY,
    },
    customChains: [
      {
        network: "lachain",
        chainId: 274,
        urls: {
          apiURL: LACHAIN_EXPLORER_URL + "/api",
          browserURL: LACHAIN_EXPLORER_URL,
        },
      },
      {
        network: "latestnet",
        chainId: 418,
        urls: {
          apiURL: LATESTNET_EXPLORER_URL + "/api",
          browserURL: LATESTNET_EXPLORER_URL,
        },
      },
    ],
  },
  gasReporter: {
    enabled: true,
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
};
