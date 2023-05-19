const { ethers, getNamedAccounts } = require("hardhat");
require("dotenv").config();

let PROTOCOL_PREFIX = "ipfs://";

let jsonCIDs = [
    [ process.env.NIKE_CID1, process.env.NIKE_CID2, process.env.NIKE_CID3 ],
    [ process.env.ROLEX_CID1, process.env.ROLEX_CID2, process.env.ROLEX_CID3 ] ];

const collectionNike = {
    name: "Nike Air Collection",
    symbol: "NC",
    id: 0,
};

const collectionRolex = {
    name: "Summer Navy Series",
    symbol: "SNS",
    id: 1,
};

async function main() {

    console.log("Assigning user roles...");

    const { nikeRetailer, rolexRetailer } = await getNamedAccounts();
    const nikeDP = await ethers.getSigner(nikeRetailer);
    const rolexDP = await ethers.getSigner(rolexRetailer);
    const signers = [nikeDP, rolexDP]

    const NFTFactory = await ethers.getContract("NFTFactory")
    const Marketplace = await ethers.getContract("Marketplace")

    console.log("Creating new NFT Contracts:");
    await NFTFactory.connect(nikeDP).deployToken(collectionNike.name, collectionNike.symbol);
    await NFTFactory.connect(rolexDP).deployToken(collectionRolex.name, collectionRolex.symbol);

    console.log("Minting and uploading tokenURis!");

    for (let j = 0; j < signers.length; j++) {
        const currentStore = signers[j]

        for (let i = 0; i < jsonCIDs[j].length; i++) {
            let iteratedFullURI = PROTOCOL_PREFIX + jsonCIDs[j][i];

            const NFTMinter = await NFTFactory.connect(currentStore).mintNFT(j, iteratedFullURI);
            await NFTMinter.wait(1);

            const tokenUriByIndex = await NFTFactory.showTokenUri(j, i);
            await NFTFactory.connect(currentStore).approve(j, Marketplace.address, i)
            
            console.log(`Token #${i} from collection #${j} (${tokenUriByIndex}) got succesfully approved!`);

        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
