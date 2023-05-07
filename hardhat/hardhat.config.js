require("@nomicfoundation/hardhat-toolbox");
require("./tasks/block-number")
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {

  solidity: "0.8.18",

  namedAccounts: {
    deployingStoreOwner: {
      default: 0,
      localhost: 0,
    },
    diffStoreOwner: {
      default: 1,
      localhost: 1,
    },
    normalUser: {
      default: 2,
      localhost: 2,
    },
  },

};
