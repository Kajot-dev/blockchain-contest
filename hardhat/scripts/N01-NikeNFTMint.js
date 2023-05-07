const { network, ethers } = require("hardhat")
require('dotenv').config();

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

async function main() {

    let tokenUris = []

    for (i in jsonCIDs) {
        iteratedFullURI = PROTOCOL_PREFIX + jsonCIDs[i]
        tokenUris.push(iteratedFullURI)
    }

    console.log("Assigning user roles...")

    let deployerNike = await ethers.getSigner(process.env.NIKE_SHOP_PUB)
    let storeOwnerRolex = await ethers.getSigner(process.env.ROLEX_SHOP_PUB)
    
    console.log(`Owner address is: ${deployerNike.address}`)

    console.log("Deploying contract...")

    const CustomIPFSNFTFactory = await ethers.getContractFactory("CustomIPFSNFT")
    console.log("Contract is being deployed..")
    const CustomIPFSNFT = await (await CustomIPFSNFTFactory.deploy(tokenInfo.name, tokenInfo.symbol, tokenUris)).connect(deployerNike)
    await CustomIPFSNFT.deployed()
    console.log(`Contract was deployed at: ${CustomIPFSNFT.address}`)

    console.log("Token URIs uploaded! They are:")

    for (i in tokenUris) {
        const NFTMinter = await CustomIPFSNFT.mintRequestedNFT()
        await NFTMinter.wait(1)
        const tokenUriByIndex = await CustomIPFSNFT.getTokenUri(i)
        console.log(`URI of token #${i} is ${tokenUriByIndex}`)
    }

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })