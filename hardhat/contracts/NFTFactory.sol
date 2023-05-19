// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./CustomIPFSNFT.sol";

contract NFTFactory {
    
    CustomIPFSNFT[] public ipfsNFTs;
    mapping(address => CustomIPFSNFT[]) public storeCollection;

    event collectionCreated(address indexed contractAddress, string tokenName, string tokenSymbol, uint256 collectionIndex);
    event nftMinted(uint256 collectionIndex, uint256 tokenId);

    error tokenWithSuchIdDoesNotExist(uint16 maximumCollectionId, uint256 maximumTokenId);

    function deployToken(string memory tokenName, string memory tokenSymbol) public {

        CustomIPFSNFT token = new CustomIPFSNFT(tokenName, tokenSymbol);
        token.setApprovalForAll(msg.sender, true);
        ipfsNFTs.push(token);
        storeCollection[msg.sender].push(token);

        uint256 collectionIndex = ipfsNFTs.length - 1;

        emit collectionCreated(address(token), tokenName, tokenSymbol, collectionIndex);

    }

    function approve(uint16 collectionIndex, address to, uint256 tokenId) public {
        CustomIPFSNFT collectionContract = ipfsNFTs[collectionIndex];
        collectionContract.approve(to, tokenId);
    }
    
    function mintNFT(uint16 collectionIndex, string memory nextTokenUri) public {
        
        CustomIPFSNFT collectionContract = ipfsNFTs[collectionIndex];
        uint256 maxToken = collectionContract.getTokenCounter();

        if(collectionIndex > ipfsNFTs.length) {
            revert tokenWithSuchIdDoesNotExist(collectionIndex, maxToken);
        }

        collectionContract.mintRequestedNFT(msg.sender, nextTokenUri);       

        emit nftMinted(collectionIndex, maxToken);
    }

    function showTokenUri(uint16 collectionIndex, uint256 tokenId) public view returns(string memory tokenUri) {
        
        uint256 allContractsCount = ipfsNFTs.length;

        if(collectionIndex > allContractsCount) {
            revert tokenWithSuchIdDoesNotExist(collectionIndex, allContractsCount);
        }

        CustomIPFSNFT collectionContract = ipfsNFTs[collectionIndex];
        uint256 maxToken = collectionContract.getTokenCounter();
        
        if(tokenId > maxToken) {
            revert tokenWithSuchIdDoesNotExist(collectionIndex, maxToken);
        }

        return collectionContract.tokenURI(tokenId);
    }

    function viewCreatorContracts(address store) external view returns (CustomIPFSNFT[] memory) {
        return storeCollection[store];
    }

    function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    function getSingleContract(uint256 contractId) external view returns(CustomIPFSNFT) {
        return ipfsNFTs[contractId];
    }

    function isUserApproved(uint16 collectionIndex, address owner, address operator) external view returns(bool) {
        CustomIPFSNFT collectionContract = ipfsNFTs[collectionIndex];
        return collectionContract.isApprovedForAll(owner, operator);
    }

    function isOwner(uint16 collectionIndex, uint256 tokenId) external view returns(address) {
        CustomIPFSNFT collectionContract = ipfsNFTs[collectionIndex];
        return collectionContract.ownerOf(tokenId);
    }

}