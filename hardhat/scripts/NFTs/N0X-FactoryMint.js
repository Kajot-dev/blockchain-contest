const { ethers, getNamedAccounts } = require("hardhat");
require("dotenv").config();

let PROTOCOL_PREFIX = "ipfs://";

let jsonNikeCIDs = [ process.env.NIKE_CID1, process.env.NIKE_CID2, process.env.NIKE_CID3, process.env.NIKE_CID4 ];

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

    const NFTFactory = await ethers.getContract("NFTFactory");
    const Marketplace = await ethers.getContract("Marketplace")

    console.log("Creating new NFT Contracts:");
    await NFTFactory.connect(nikeDP).deployToken(collectionNike.name, collectionNike.symbol);
    await NFTFactory.connect(rolexDP).deployToken(collectionRolex.name, collectionRolex.symbol);

    const verifyNike = await NFTFactory.isUserApproved(collectionNike.id, NFTFactory.address, nikeDP.address)
    console.log(verifyNike)

    const verifyRolex = await NFTFactory.isUserApproved(collectionRolex.id, NFTFactory.address, rolexDP.address)
    console.log(verifyRolex)

    console.log("Minting and uploading tokenURis!");

    for (let j = 0; j < signers.length; j++) {
        const currentStore = signers[j]
        console.log(currentStore.address)
        for (let i = 0; i < jsonNikeCIDs.length; i++) {
            let iteratedFullURI = PROTOCOL_PREFIX + jsonNikeCIDs[i];

            const NFTMinter = await NFTFactory.connect(currentStore).mintNFT(j, currentStore.address, iteratedFullURI);
            await NFTMinter.wait(1);

            const tokenUriByIndex = await NFTFactory.showTokenUri(j, i);
            console.log(`URI of token #${i} is ${tokenUriByIndex}`);

            const isOwner = await NFTFactory.connect(currentStore).isOwner(j, i)
            console.log(`Owner of tokens is: ${isOwner}`)

            if (currentStore.address == isOwner) {
                console.log("OWNER VERIFIED!!!")
            } else {
                console.log("NOT OWNER")
            }
        }
    }

    await NFTFactory.connect(nikeDP).approve(0, Marketplace.address, 1)

    await NFTFactory.approve(0, Marketplace.address, 1)
    console.log(`Token #0 got approved!`)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
