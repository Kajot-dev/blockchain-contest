// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./CustomIPFSNFT.sol";
import "./StoreAccessControl.sol";

contract NFTFactory is StoreAccessControl {
    
    CustomIPFSNFT[] public ipfsNFTs;
    mapping(address => CustomIPFSNFT[]) public storeCollection;
    mapping(address => uint256) public personalCollectionCount;

    address private deployer;

    event tokenCreated(address indexed contractAddress, string tokenName, string tokenSymbol);

    error tokenWithSuchIdDoesNotExist(uint256 yourId, uint256 maximumTokenId);

    function deployToken(string memory tokenName, string memory tokenSymbol) public {

        CustomIPFSNFT token = new CustomIPFSNFT(tokenName, tokenSymbol);

        ipfsNFTs.push(token);

        /*personalCollectionCount[msg.sender]++;
        uint256 contractId = personalCollectionCount[msg.sender];

        storeCollection[msg.sender][contractId] = token;

        emit tokenCreated(address(token), tokenName, tokenSymbol);*/

    } 

    function mintNFT(uint256 collectionIndex, string memory nextTokenUri) public {
        
        CustomIPFSNFT collectionContract = ipfsNFTs[collectionIndex];
        uint256 maxToken = collectionContract.getTokenCounter();

        if(collectionIndex > ipfsNFTs.length) {
            revert tokenWithSuchIdDoesNotExist(collectionIndex, maxToken);
        }

        collectionContract.mintRequestedNFT(nextTokenUri);        
    }

    function showTokenUri(uint256 collectionIndex, uint256 tokenId) public view returns(string memory tokenUri) {
        CustomIPFSNFT collectionContract = ipfsNFTs[collectionIndex];
        uint256 maxToken = collectionContract.getTokenCounter();

        if(collectionIndex > ipfsNFTs.length && tokenId > collectionContract.getTokenCounter() ) {
            revert tokenWithSuchIdDoesNotExist(collectionIndex, maxToken);
        }

        return collectionContract.tokenURI(tokenId);
    }

    function viewCreatorContracts(address store) external view returns (CustomIPFSNFT[] memory) {
        return storeCollection[store];
    }

    function getSingleContract(uint256 contractId) external view returns(CustomIPFSNFT) {
        return ipfsNFTs[contractId];
    }
}