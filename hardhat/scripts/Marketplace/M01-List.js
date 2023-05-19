const { ethers, getNamedAccounts } = require("hardhat")

const firstOffer = {
    price: ethers.utils.parseEther("0.1"),
    tokenId: 1,
    time: 6000, // 6000 seconds = 100 minutes
  }

  const secondOffer = {
    price: ethers.utils.parseEther("0.05"),
    tokenId: 3,
    time: 5,
  }

async function main() {

    const Marketplace = await ethers.getContract("Marketplace")
    const NFTFactory = await ethers.getContract("NFTFactory")

    const { nikeRetailer } = await getNamedAccounts()
    const deployer = await ethers.getSigner(nikeRetailer)

    const firstNikeCollection = await NFTFactory.getSingleContract(0);
    console.log(firstNikeCollection)
    
    console.log("Listing NFTs...")

    const firstTx = await Marketplace.connect(deployer).listItem(firstNikeCollection, firstOffer.tokenId, firstOffer.price, firstOffer.time)
    await firstTx.wait(1)
    console.log("NFT #1 Listed!")

    const secondTx = await Marketplace.connect(deployer).listItem(firstNikeCollection, secondOffer.tokenId, secondOffer.price, secondOffer.time)
    await secondTx.wait(1)
    console.log("NFT #2 Listed!")

    console.log(`Current number of listings: ${await Marketplace.getTotalListings()}`)

    console.log(await Marketplace.connect(deployer).fetchMyCreatedItems())

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })