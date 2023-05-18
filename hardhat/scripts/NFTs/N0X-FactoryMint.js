const { ethers, getNamedAccounts } = require("hardhat")
require('dotenv').config()

let PROTOCOL_PREFIX = "ipfs://"

let jsonNikeCIDs = [
    process.env.NIKE_CID1,
    process.env.NIKE_CID2,
    process.env.NIKE_CID3,
    process.env.NIKE_CID4,
]

const tokenInfo = {
    name: "Air",
    symbol: "NC",
}

async function main() {

    console.log("Assigning user roles...")

    const { nikeRetailer } = await getNamedAccounts()
    const nikeDP = await ethers.getSigner(nikeRetailer)

    const NFTFactory = await ethers.getContract("NFTFactory")

    console.log("Creating new NFT Contracts:")
    await NFTFactory.connect(nikeDP).deployToken(tokenInfo.name, tokenInfo.symbol)

    console.log("Minting and uploading tokenURis!")

    for (let i = 0; i < jsonNikeCIDs.length(); i++) {

        iteratedFullURI = PROTOCOL_PREFIX + jsonCIDs[i]

        const NFTMinter = await NFTFactory.connect(nikeDP).mintNFT(0, iteratedFullURI)
        await NFTMinter.wait(1)

        const tokenUriByIndex = await NFTFactory.showTokenUri(0, i)
        console.log(`URI of token #${i} is ${tokenUriByIndex}`)

    }

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })