const { ethers, getNamedAccounts } = require("hardhat")
// const { moveBlocks } = require("../utils/move-blocks")

const TOKEN_ID = 2

async function cancel() {

    const { nikeRetailer } = await getNamedAccounts()
    const seller = await ethers.getSigner(nikeRetailer)

    const Marketplace = await ethers.getContract("Marketplace")
    const CustomIPFSNFT = await ethers.getContract("CustomIPFSNFT")

    const listing = await Marketplace.getListing(CustomIPFSNFT.address, TOKEN_ID)
    console.log("Listing before:")
    console.log(listing)

    const tx = await Marketplace.connect(seller).cancelListing(CustomIPFSNFT.address, TOKEN_ID)
    await tx.wait(1)

    console.log("NFT Canceled!")
    
    // const currentOfferNumber = await Marketplace.getAmountOfActiveListings().toString()
    // const translatedNumber = ethers.BigNumber.from(currentOfferNumber)
    // console.log(await currentOfferNumber)
    
    // if ((network.config.chainId == "31337")) {
    //     await moveBlocks(2, (sleepAmount = 1000))
    // }
}

cancel()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })