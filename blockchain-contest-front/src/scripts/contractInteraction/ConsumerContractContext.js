import ethers from 'ethers';
import { createContext } from 'react';

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
    getUserListingsIDs: (start = 0, amount = 30) => {},
    //it will get details about an NFT that belongs to given user
    getUserListing: (listingId) => {},
    //it will buy an NFT from retailer
    buyListing: (listingId) => {},
    //it will transfer an NFT to another user
    transferListing: (listingId, toChainId, toAddress) => {},
});

export default ConsumerContractContext;