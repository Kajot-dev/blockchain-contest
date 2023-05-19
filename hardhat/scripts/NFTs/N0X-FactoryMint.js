const { ethers, getNamedAccounts } = require("hardhat");
require("dotenv").config();

let PROTOCOL_PREFIX = "ipfs://";

let jsonCIDs = [
    [ process.env.NIKE_CID1, process.env.NIKE_CID2, process.env.NIKE_CID3 ],
    [ process.env.ROLEX_CID1, process.env.ROLEX_CID2, process.env.ROLEX_CID3 ],
    [ process.env.TICKET_CID1, process.env.TICKET_CID2, process.env.TICKET_CID3 ],
    [ process.env.COIN_CID1, process.env.COIN_CID2, process.env.COIN_CID3 ]
];

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

const collectionTickets = {
    name: "Heavy Metal Productions",
    symbol: "HMP",
    id: 2,
};

const collectionCoins = {
    name: "Indiana Vault",
    symbol: "IV",
    id: 3,
};

async function main() {

    console.log("Assigning user roles...");

    const { nikeRetailer, rolexRetailer, ticketRetailer, coinTrader } = await getNamedAccounts();
    const nikeDP = await ethers.getSigner(nikeRetailer);
    const rolexDP = await ethers.getSigner(rolexRetailer);
    const ticketDP = await ethers.getSigner(ticketRetailer)
    const coinDP = await ethers.getSigner(coinTrader)
    const signers = [nikeDP, rolexDP, ticketDP, coinDP]

    const NFTFactory = await ethers.getContract("NFTFactory")
    const Marketplace = await ethers.getContract("Marketplace")

    console.log("Creating new NFT Contracts:");
    await NFTFactory.connect(nikeDP).deployToken(collectionNike.name, collectionNike.symbol);
    await NFTFactory.connect(rolexDP).deployToken(collectionRolex.name, collectionRolex.symbol);
    await NFTFactory.connect(ticketDP).deployToken(collectionTickets.name, collectionTickets.symbol);
    await NFTFactory.connect(coinDP).deployToken(collectionCoins.name, collectionCoins.symbol);

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
