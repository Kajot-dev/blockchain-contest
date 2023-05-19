const { network } = require("hardhat")

module.exports = async function ({ getNamedAccounts, deployments }) {

    const { deploy, log } = deployments
    const { admin } = await getNamedAccounts()

    log("----------------------------")
    const args = []
    const NFTFactory = await deploy("NFTFactory", {
        from: admin,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log("----------------------------")

}

module.exports.tags = ["all", "factory"]