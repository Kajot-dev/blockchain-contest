const { ethers, getNamedAccounts } = require("hardhat")

const firstNikeOffer = {
    price: ethers.utils.parseEther("0.1"),
    tokenId: 0,
    time: 3, // 6000 seconds = 100 minutes
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
    time: 3, // 6000 seconds = 100 minutes
  }

  const secondRolexOffer = {
    price: ethers.utils.parseEther("12.5"),
    tokenId: 1,
    time: 5,
  }

  const thirdRolexOffer = {
    price: ethers.utils.parseEther("24.0"),
    tokenId: 2,
    time: 20,
  }

  const firstTicketOffer = {
    price: ethers.utils.parseEther("0.03"),
    tokenId: 0,
    time: 10,
  }

  const secondTicketOffer = {
    price: ethers.utils.parseEther("0.08"),
    tokenId: 1,
    time: 5,
  }

  const thirdTicketOffer = {
    price: ethers.utils.parseEther("0.2"),
    tokenId: 2,
    time: 150,
  }

  const firstCoinOffer = {
    price: ethers.utils.parseEther("0.25"),
    tokenId: 0,
    time: 10,
  }

  const secondCoinOffer = {
    price: ethers.utils.parseEther("0.5"),
    tokenId: 1,
    time: 5,
  }

  const thirdCoinOffer = {
    price: ethers.utils.parseEther("1.0"),
    tokenId: 2,
    time: 10,
  }

const Offers = [
  [ firstNikeOffer, secondNikeOffer, thirdNikeOffer ],
  [ firstRolexOffer, secondRolexOffer, thirdRolexOffer ],
  [ firstTicketOffer, secondTicketOffer, thirdTicketOffer],
  [ firstCoinOffer, secondCoinOffer, thirdCoinOffer ]
];

async function main() {

    const Marketplace = await ethers.getContract("Marketplace")
    const NFTFactory = await ethers.getContract("NFTFactory")

    const { nikeRetailer, rolexRetailer, ticketRetailer, coinTrader } = await getNamedAccounts();
    const nikeDP = await ethers.getSigner(nikeRetailer);
    const rolexDP = await ethers.getSigner(rolexRetailer);
    const ticketDP = await ethers.getSigner(ticketRetailer)
    const coinDP = await ethers.getSigner(coinTrader)
    const signers = [nikeDP, rolexDP, ticketDP, coinDP]

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
    // console.log(await Marketplace.connect(nikeDP).fetchMyCreatedItems())
    console.log(await Marketplace.connect(rolexDP).fetchMyCreatedItems())

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })