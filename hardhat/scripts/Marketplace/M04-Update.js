const { ethers, getNamedAccounts } = require("hardhat")

const updatedOffer = {
    id: 1,
    price: ethers.utils.parseEther("0.5"),
    time: 10
}

async function update() {

    const { nikeRetailer } = await getNamedAccounts()
    const seller = await ethers.getSigner(nikeRetailer)

    const Marketplace = await ethers.getContract("Marketplace")
    const CustomIPFSNFT = await ethers.getContract("CustomIPFSNFT")

    const listing = await Marketplace.getListingById(updatedOffer.id)
    console.log("Listing before:")
    console.log(listing)

    console.log("Listing after:")
    const tx = await Marketplace.connect(seller).updateListing(updatedOffer.id, updatedOffer.price, updatedOffer.time)
    await tx.wait(1)
    const updatedListing = await Marketplace.getListingById(updatedOffer.id)
    console.log(updatedListing)

    console.log("NFT Updated!")
}

update()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })