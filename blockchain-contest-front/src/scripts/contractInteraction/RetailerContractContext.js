import ethers from 'ethers';
import { createContext } from 'react';

const abi = [
    "TODO"
];

//use metamask provider
//we are assuming that the user is on the correct chain
//and that user is logged in
const provider = new ethers.providers.Web3Provider(window.ethereum);

//set of functions for retailer panel
const RetailerContractContext = createContext({
    //this should give us all the listings that given retailer has
    //event the ones that are not yet available for sale
    getForgedContracts: (userChainId, start = 0, amount = 30) => {},
    //this will give us a list of transactions that happened and involved NFTs of given retailer
    //for purposes like "someone bought XXX NFTs from this retailer at this time"
    getRecentTransactions: (userChainId, start = 0, amount = 30) => {},
    //this will create a new deployment of NFTs
    createDeployment: ({ name, symbol, imageBlob, price, items, deployTime }) => {},
    //this will update existing listing which has not yet been deployed
    updateDeployment: ({ listingId, name, symbol, imageBlob, price, deployTime }) => {},
    //this will cancel existing listing which has not yet been deployed
    cancelDeployment: (listingId) => {},
    //this will cash out the money that was earned from sales
    cashOut: () => {},
});

export default RetailerContractContext;