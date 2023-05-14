const { network } = require("hardhat")
require('dotenv').config()

let PROTOCOL_PREFIX = "ipfs://"

let jsonCIDs = [
    process.env.NIKE_CID1,
    process.env.NIKE_CID2,
    process.env.NIKE_CID3,
    process.env.NIKE_CID4,
]

const tokenInfo = {
    name: "Nike Air Collection",
    symbol: "NC",
}


module.exports = async function ({ getNamedAccounts, deployments }) {

    let tokenUris = []

    for (i in jsonCIDs) {
        iteratedFullURI = PROTOCOL_PREFIX + jsonCIDs[i]
        tokenUris.push(iteratedFullURI)
    }

    const { deploy, log } = deployments
    const { nikeRetailer } = await getNamedAccounts()

    log("----------------------------")
    const args = [ tokenInfo.name, tokenInfo.symbol, tokenUris ]
    const CustomIPFSNFT = await deploy("CustomIPFSNFT", {
        from: nikeRetailer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log("----------------------------")

}

module.exports.tags = ["all", "nikenft"]