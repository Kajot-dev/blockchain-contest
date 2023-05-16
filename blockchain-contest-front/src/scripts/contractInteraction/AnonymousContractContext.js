import ethers from 'ethers';
import { createContext } from 'react';

//there will be one, public contract already deployed
//which is capable of reading the available listings
const contractAddress = process.env.READ_CONTRACT_ADDRESS;

const abi = [
    "function getAllListings() public view returns (uint256[] memory)",
];

//use metamask provider
const provider = new ethers.providers.Web3Provider(window.ethereum);

//do not use signer as we are not sending transactions
const contract = new ethers.Contract(contractAddress, abi, provider);

//for purposes of /launches page - only read access
const AnonymousContractContext = createContext({
    //it will get NFTs that are available for sale
    getAvailableListings: (start = 0, amount = 30) => {}, //TODO (prototype ready)
    //it will get the amount of NFTs that are available for sale
    getAvailableListingsCount: () => {}, //TODO (only if getting SOME listing is possible)
    //it will get details about an NFT that is available for sale
    getListing: (nftContractAddress, tokenId) => {}, //READY
});

export default AnonymousContractContext;