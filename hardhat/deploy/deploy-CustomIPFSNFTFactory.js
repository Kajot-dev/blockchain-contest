const { network } = require("hardhat")

module.exports = async function ({ getNamedAccounts, deployments }) {

    const { deploy, log } = deployments
    const { admin } = await getNamedAccounts()

    log("----------------------------")
    const args = []
    const CustomIPFSNFTFactory = await deploy("CustomIPFSNFTFactory", {
        from: admin,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    //const deployedStoreAccessControl = await deploy("StoreAccessControl", admin)

    log("----------------------------")

}

module.exports.tags = ["all", "marketplace"]