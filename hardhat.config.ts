import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

import dotenv from 'dotenv';
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    ganache: {
      url: 'http://127.0.0.1:7545',
      accounts: [process.env.GANACHE_PRIVATE_KEY]
    },
    lachain: {
      url: 'https://rpc1.mainnet.lachain.network',
      accounts: [process.env.MAINNET_PRIVATE_KEY]
    },
    latestnet: {
      url: 'https://rpc.testnet.lachain.network',
      accounts: [process.env.MAINNET_PRIVATE_KEY]
    }
  }
};

export default config;
