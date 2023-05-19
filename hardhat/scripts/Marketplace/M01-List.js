const { ethers, getNamedAccounts } = require("hardhat")

const firstNikeOffer = {
    price: ethers.utils.parseEther("0.1"),
    tokenId: 0,
    time: 6000, // 6000 seconds = 100 minutes
  }

  const secondNikeOffer = {
    price: ethers.utils.parseEther("0.05"),
    tokenId: 1,
    time: 5,
  }

  const thirdNikeOffer = {
    price: ethers.utils.parseEther("0.15"),
    tokenId: 2,
    time: 5,
  }

  const firstRolexOffer = {
    price: ethers.utils.parseEther("10.0"),
    tokenId: 0,
    time: 2000, // 6000 seconds = 100 minutes
  }

  const secondRolexOffer = {
    price: ethers.utils.parseEther("12.5"),
    tokenId: 1,
    time: 5,
  }

  const thirdRolexOffer = {
    price: ethers.utils.parseEther("24.0"),
    tokenId: 2,
    time: 5,
  }

const Offers = [
  [ firstNikeOffer, secondNikeOffer, thirdNikeOffer ],
  [ firstRolexOffer, secondRolexOffer, thirdRolexOffer ]
]

async function main() {

    const Marketplace = await ethers.getContract("Marketplace")
    const NFTFactory = await ethers.getContract("NFTFactory")

    const { nikeRetailer, rolexRetailer } = await getNamedAccounts();
    const nikeDP = await ethers.getSigner(nikeRetailer);
    const rolexDP = await ethers.getSigner(rolexRetailer);
    const signers = [nikeDP, rolexDP]

    console.log("Listing NFTs...")

    for (let j = 0; j < signers.length; j++) {
      const currentStore = signers[j]
      const currentCollection = await NFTFactory.getSingleContract(j);

      for (let i = 0; i < Offers[j].length; i++) {
        const firstTx = await Marketplace.connect(currentStore).listItem(currentCollection, Offers[j][i].tokenId, Offers[j][i].price, Offers[j][i].time)
        await firstTx.wait(1)
        console.log(`NFT #${i} from Collection ${j} listed!`)
        
      }
    }

    console.log(`Current number of listings: ${await Marketplace.getTotalListings()}`)
    console.log(await Marketplace.connect(nikeDP).fetchMyCreatedItems())

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })