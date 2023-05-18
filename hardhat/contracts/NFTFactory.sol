// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./CustomIPFSNFT.sol";
import "./StoreAccessControl.sol";

contract NFTFactory is StoreAccessControl, IERC721Receiver {
    
    CustomIPFSNFT[] public ipfsNFTs;
    mapping(address => CustomIPFSNFT[]) public storeCollection;

    address private deployer;

    event tokenCreated(address indexed contractAddress, string tokenName, string tokenSymbol);

    error tokenWithSuchIdDoesNotExist(uint256 yourId, uint256 maximumTokenId);

    function deployToken(string memory tokenName, string memory tokenSymbol) public {

        CustomIPFSNFT token = new CustomIPFSNFT(tokenName, tokenSymbol);

        ipfsNFTs.push(token);

        storeCollection[msg.sender].push(token);

        emit tokenCreated(address(token), tokenName, tokenSymbol);

    } 

    function mintNFT(uint256 collectionIndex, string memory nextTokenUri) public {
        
        CustomIPFSNFT collectionContract = ipfsNFTs[collectionIndex];
        uint256 maxToken = collectionContract.getTokenCounter();

        if(collectionIndex > ipfsNFTs.length) {
            revert tokenWithSuchIdDoesNotExist(collectionIndex, maxToken);
        }

        collectionContract.mintRequestedNFT(nextTokenUri);        
    }

    function approve(address contractApproved, uint256 collectionIndex, uint256 tokenId) public {
        
        uint256 allContractsCount = ipfsNFTs.length;

        if(collectionIndex > allContractsCount) {
            revert tokenWithSuchIdDoesNotExist(collectionIndex, allContractsCount);
        }
        
        CustomIPFSNFT contractCalled = ipfsNFTs[collectionIndex];

        uint256 maxToken = contractCalled.getTokenCounter();
        
        if(tokenId > maxToken) {
            revert tokenWithSuchIdDoesNotExist(collectionIndex, maxToken);
        }
        
        contractCalled.approve(contractApproved, tokenId);
    }

    function showTokenUri(uint256 collectionIndex, uint256 tokenId) public view returns(string memory tokenUri) {
        
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
}