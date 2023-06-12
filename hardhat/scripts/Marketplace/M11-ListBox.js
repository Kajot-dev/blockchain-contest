const { ethers, getNamedAccounts } = require("hardhat");

const COLLECTION_INDEX = 0

const firstNikeOffer = {
    price: ethers.utils.parseEther("0.1"),
    tokenId: 0,
    time: 3, // 6000 seconds = 100 minutes
};

const secondNikeOffer = {
    price: ethers.utils.parseEther("0.05"),
    tokenId: 1,
    time: 5,
};

const Offers = [firstNikeOffer, secondNikeOffer];

async function main() {
    const Marketplace = await ethers.getContract("Marketplace");
    const NFTFactory = await ethers.getContract("NFTFactory");

    const { nikeRetailer } = await getNamedAccounts();
    const nikeDP = await ethers.getSigner(nikeRetailer);

    console.log("Listing NFTs...");

    const currentCollection = await NFTFactory.getSingleContract(COLLECTION_INDEX);

    for (let i = 0; i < Offers.length; i++) {
        const firstTx = await Marketplace.connect(nikeDP).listItem(
            currentCollection,
            Offers[i].tokenId,
            Offers[i].price,
            Offers[i].time
        );
        await firstTx.wait(1);
        console.log(`NFT #${i} from Collection ${COLLECTION_INDEX} listed!`);
    }

    console.log(`Current number of listings: ${await Marketplace.getTotalListings()}`);
    console.log(await Marketplace.connect(nikeDP).fetchMyCreatedItems())
    // console.log(await Marketplace.connect(rolexDP).fetchMyCreatedItems());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
