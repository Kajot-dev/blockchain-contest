const { ethers, getNamedAccounts } = require("hardhat")
require('dotenv').config()

const TOTAL_NFTS = 4

async function main() {

    console.log("Assigning user roles...")

    const { nikeRetailer } = await getNamedAccounts()
    const deployer = await ethers.getSigner(nikeRetailer)

    const CustomIPFSNFT = await ethers.getContract("CustomIPFSNFT")
    const Marketplace = await ethers.getContract("Marketplace")

    console.log("Token URIs uploaded! They are:")

    for (let i = 0; i < TOTAL_NFTS; i++) {

        const NFTMinter = await CustomIPFSNFT.connect(deployer).mintRequestedNFT()
        await NFTMinter.wait(1)

        const tokenUriByIndex = await CustomIPFSNFT.getTokenUri(i)
        console.log(`URI of token #${i} is ${tokenUriByIndex}`)

        const approvalTx = await CustomIPFSNFT.connect(deployer).approve(Marketplace.address, i)
        console.log(`Token #${i} got approved!`)
    }

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })