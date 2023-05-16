import ethers from 'ethers';
import { createContext } from 'react';

const abi = [
    "TODO"
];

//use metamask provider
//we are assuming that the user is on the correct chain
//and that user is logged in as a retailer
const provider = new ethers.providers.Web3Provider(window.ethereum);

//set of functions for retailer panel
const RetailerContractContext = createContext({
    //this should give us all the listings that given retailer has
    //event the ones that are not yet available for sale
    getMintedListings: (start = 0, amount = 30) => {}, //TODO
    //this will give us a list of transactions that happened and involved NFTs of given retailer
    //for purposes like "someone bought XXX NFTs from this retailer at this time"
    getRecentTransactions: (start = 0, amount = 30) => {}, //READY
    //this will create a new deployment of NFTs
    createListing: ({ name, symbol, imageBlob, price, items, deployTime }) => {}, //READY
    //this will update existing listing which has not yet been deployed
    updateListing: ({ tokenId, price, deployTime }) => {}, //READY
    //this will cancel existing listing which has not yet been deployed
    cancelListing: (nftContractAddress, tokenId) => {}, //READY
    //this will cash out the money that was earned from sales
    cashOut: () => {}, //TODO
});

export default RetailerContractContext;