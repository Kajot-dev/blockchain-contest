const { ethers, getNamedAccounts } = require("hardhat")
// const { moveBlocks } = require("../utils/move-blocks")

const newOffer = {
    price: ethers.utils.parseEther("0.01"),
    tokenId: 1,
    time: 20, //20 additional seconds
  }

async function update() {

    const { nikeRetailer } = await getNamedAccounts()
    const seller = await ethers.getSigner(nikeRetailer)

    const Marketplace = await ethers.getContract("Marketplace")
    const CustomIPFSNFT = await ethers.getContract("CustomIPFSNFT")

    const listing = await Marketplace.getListing(CustomIPFSNFT.address, newOffer.tokenId)
    console.log("Listing before:")
    console.log(listing)

    console.log("Listing after:")
    const tx = await Marketplace.connect(seller).updateListing(CustomIPFSNFT.address, newOffer.tokenId, newOffer.price, newOffer.time)
    await tx.wait(1)
    const updatedListing = await Marketplace.getListing(CustomIPFSNFT.address, newOffer.tokenId)
    console.log(updatedListing)

    console.log("NFT Updated!")
}

update()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })