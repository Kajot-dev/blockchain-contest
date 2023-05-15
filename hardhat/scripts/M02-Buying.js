const { ethers, getNamedAccounts } = require("hardhat")
// const { moveBlocks } = require("../utils/move-blocks")

const FIRST_TOKEN = 1
const SECOND_TOKEN = 2

async function buyItem() {

  const Marketplace = await ethers.getContract("Marketplace")
  const CustomIPFSNFT = await ethers.getContract("CustomIPFSNFT")

  const { normalUser } = await getNamedAccounts()
  const customer = await ethers.getSigner(normalUser) // Comment if does not insert the signer

  console.log("Trying to purchase token #1...")
  try {
    const listingTime = await Marketplace.getListingTime(CustomIPFSNFT.address, 1)
    const listing = await Marketplace.connect(normalUser).getListing(CustomIPFSNFT.address, 1)
    const price = listing.price.toString()
    const tx = await Marketplace.buyItem(CustomIPFSNFT.address, 1, { value: price })
    await tx.wait(1)

    console.log(`Bought NFT #1 for ${price} wei. Timeleft: ${listingTime}`)
  } catch (e) {
    // Nothing to do here?
  }


  console.log("Trying to purchase token #2...")
  try {
    const secondListingTime = await Marketplace.getListingTime(CustomIPFSNFT.address, SECOND_TOKEN)
    const secondListing = await Marketplace.getListing(CustomIPFSNFT.address, SECOND_TOKEN)
    const secondPrice = secondListing.price.toString()
    const secondTX = await Marketplace.connect(customer).buyItem(CustomIPFSNFT.address, SECOND_TOKEN, { value: secondPrice })
    await secondTX.wait(1)

    console.log(`Bought NFT #1 for ${secondPrice} wei. Timeleft: ${secondListingTime}`)
  } catch (e) {
    // Nothing to do here?
  }

}

buyItem()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })