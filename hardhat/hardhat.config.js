require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy")
require("./tasks/block-number")
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {

  solidity: "0.8.18",

  namedAccounts: {
    admin: {
      default: 0,
      localhost: 0,
    },
    unusedRetailer: {
      default: 1,
      localhost: 1,
    },
    normalUser: {
      default: 2,
      localhost: 2,
    },
    nikeRetailer: {
      default: 11,
      localhost: 11,
    },
    rolexRetailer: {
      default: 12,
      localhost: 12,
    },
    ticketRetailer: {
      default: 13,
      localhost: 13,
    },
    coinTrader: {
      default: 14,
      localhost: 14
    }
  },

};
