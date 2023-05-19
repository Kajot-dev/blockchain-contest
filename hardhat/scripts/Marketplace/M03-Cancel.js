const { ethers, getNamedAccounts } = require("hardhat")

const LISTING_ID = 1

async function cancel() {

    const { nikeRetailer } = await getNamedAccounts()
    const seller = await ethers.getSigner(nikeRetailer)

    const Marketplace = await ethers.getContract("Marketplace")

    const listing = await Marketplace.getListingById(LISTING_ID)
    console.log("Listing before:")
    console.log(listing)

    const tx = await Marketplace.connect(seller).cancelListing(LISTING_ID)
    await tx.wait(1)

    console.log("Listing canceled!")

    console.log("Updated state:")
    const upListing = await Marketplace.getListingById(LISTING_ID)
    console.log(upListing)

}

cancel()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })