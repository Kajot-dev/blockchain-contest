const { ethers, getNamedAccounts } = require("hardhat");
require("dotenv").config();

let PROTOCOL_PREFIX = "ipfs://";

let jsonCIDs = [process.env.BOX_CID1, process.env.BOX_CID2];

const collectionNike = {
    name: "Nike Air Collection",
    symbol: "NC",
    id: 0,
};

async function main() {

    console.log("Assigning user roles...");

    const { nikeRetailer } = await getNamedAccounts();
    const nikeDP = await ethers.getSigner(nikeRetailer);

    const NFTFactory = await ethers.getContract("NFTFactory")
    const Marketplace = await ethers.getContract("Marketplace")

    console.log("Creating new NFT Contracts:");
    await NFTFactory.connect(nikeDP).deployToken(collectionNike.name, collectionNike.symbol);

    console.log("Minting and uploading tokenURis!");

    for (let i = 0; i < jsonCIDs.length; i++) {
        let iteratedFullURI = PROTOCOL_PREFIX + jsonCIDs[i];

        const NFTMinter = await NFTFactory.connect(nikeDP).mintNFT(collectionNike.id, iteratedFullURI);
        await NFTMinter.wait(1);

        const tokenUriByIndex = await NFTFactory.showTokenUri(collectionNike.id, i);
        await NFTFactory.connect(nikeDP).approve(collectionNike.id, Marketplace.address, i)

        console.log(`Token #${i} from collection #${collectionNike.id} (${tokenUriByIndex}) got succesfully approved!`);

    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
