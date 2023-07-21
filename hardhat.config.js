require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("dotenv-defaults").config();

const LACHAIN_RPC_URL = process.env.LACHAIN_RPC_URL;
const PRIVATE_KEYS_LACHAIN = process.env.PRIVATE_KEYS_LACHAIN;
const LACHAIN_EXPLORER_URL = process.env.LACHAIN_EXPLORER_URL;
const LACHAIN_TESTNET_RPC_URL = process.env.LACHAIN_TESTNET_RPC_URL;
const LACHAIN_TESTNET_EXPLORER_URL = process.env.LACHAIN_TESTNET_EXPLORER_URL;
const PRIVATE_KEYS_LATESTNET = process.env.PRIVATE_KEYS_LATESTNET;
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    lachain: {
      url: LACHAIN_RPC_URL,
      accounts: PRIVATE_KEYS_LACHAIN.split(","),
      chainId: 274,
      gasPrice: 5000000000000,
    },
    latestnet: {
      url: LACHAIN_TESTNET_RPC_URL,
      accounts: PRIVATE_KEYS_LATESTNET.split(","),
      chainId: 418,
      gasPrice: 10000000,
    },
  },
  etherscan: {
    apiKey: {
      lachain: ETHERSCAN_KEY,
      latestnet: ETHERSCAN_KEY,
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
          apiURL: LACHAIN_TESTNET_EXPLORER_URL + "/api",
          browserURL: LACHAIN_TESTNET_EXPLORER_URL,
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
