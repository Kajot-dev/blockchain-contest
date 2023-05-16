import ethers from 'ethers';
import { createContext } from 'react';

const contractAddress = process.env.CONSUMER_CONTRACT_ADDRESS;

const abi = [
    "TODO"
];

//use metamask provider
//we are assuming that the user is on the correct chain
//and that user is logged in
const provider = new ethers.providers.Web3Provider(window.ethereum);

//for purposes of customer panel and /launches page - write access
const ConsumerContractContext = createContext({
    //it will get NFTs that belong to given user
    getConsumerNfts: (start = 0, amount = 30) => {}, //TODO - may be replaced with recent transaction (na koniec)
    //it will get details about an NFT that belongs to given user
    getConsumerNft: (nftContractAddress, tokenId) => {}, //READY
    //it will buy an NFT from retailer
    buyNft: (nftContractAddress, tokenId) => {}, //READY
    //it will transfer an NFT to another user
    transferNft: (listingId, toChainId, toAddress) => {}, //READY - proposal (no UI is ready)
});

export default ConsumerContractContext;