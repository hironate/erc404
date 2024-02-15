require('dotenv').config();

require('@nomicfoundation/hardhat-toolbox');
require('hardhat-gas-reporter');
require('@nomiclabs/hardhat-solhint');

// import hardhat CLI tasks
require('./tasks/mock-erc20');

// eslint-disable-next-line prefer-destructuring
const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mainnet: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_MAINNET_API_KEY}`,
      accounts: [`${ACCOUNT_PRIVATE_KEY}`],
      chainId: 1,
      gas: 'auto',
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_SEPOLIA_API_KEY}`,
      accounts: [`${ACCOUNT_PRIVATE_KEY}`],
      chainId: 11155111,
      gas: 'auto',
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_POLYGON_API_KEY}`,
      accounts: [`${ACCOUNT_PRIVATE_KEY}`],
      chainId: 137,
      gas: 'auto',
    },
    polygonMumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_MUMBAI_API_KEY}`,
      accounts: [`${ACCOUNT_PRIVATE_KEY}`],
      chainId: 80001,
      gas: 'auto',
    },
    // add more networks here
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: true,
  },
};
