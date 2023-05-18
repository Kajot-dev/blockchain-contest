// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./CustomIPFSNFT.sol";

contract NFTFactoryv2 {
    
    struct CreatedContract {
        CustomIPFSNFT token;
        uint16 contractId;
        uint256 contractPublicId;
        address creator;
        string name;
        string symbol;
    }

    uint256 public createdContractCount;
    address[] private creators;

    mapping(address => uint16) private creatorContractsSum;
    mapping(address => CreatedContract[]) private creatorContracts;

    mapping(uint256 => CreatedContract) public allCreatedContracts;

    event tokenCreated(address indexed contractAddress, string tokenName, string tokenSymbol);

    error tokenWithSuchIdDoesNotExist(uint256 yourId, uint256 maximumTokenId);

    function deployToken(string memory tokenName, string memory tokenSymbol) public {

        CustomIPFSNFT token = new CustomIPFSNFT(tokenName, tokenSymbol);

        CreatedContract memory newContract;
        

        uint16 counter = creatorContractsSum[msg.sender];

        newContract.token = token;
        newContract.contractId = counter;
        newContract.contractPublicId = createdContractCount;
        newContract.creator = msg.sender;
        newContract.name = tokenName;
        newContract.symbol = tokenSymbol;

        creatorContracts[msg.sender].push(newContract);
        allCreatedContracts[createdContractCount] = newContract;
        creatorContractsSum[msg.sender]++;

        createdContractCount++;
        emit tokenCreated(address(token), tokenName, tokenSymbol);
    }   

    function mintNFT(uint256 collectionIndex, string memory nextTokenUri) public {
         if(collectionIndex > createdContractCount) {
            revert tokenWithSuchIdDoesNotExist(collectionIndex, createdContractCount);
         }
        CustomIPFSNFT collectionContract = allCreatedContracts[collectionIndex].token;
        collectionContract.mintRequestedNFT(nextTokenUri);        
    }

    function showTokenUri(uint256 collectionIndex, uint256 tokenId) public view returns(string memory tokenUri) {
        CustomIPFSNFT collectionContract = allCreatedContracts[collectionIndex].token;

        if(collectionIndex > createdContractCount && tokenId > collectionContract.getTokenCounter() ) {
            revert tokenWithSuchIdDoesNotExist(collectionIndex, createdContractCount);
         }
        return collectionContract.tokenURI(tokenId);
    }

    function viewCreatorContracts() external view returns (CreatedContract[] memory) {
        return creatorContracts[msg.sender];
    }

    function getSingleContract(uint256 publicContractId) external view returns(CreatedContract memory) {
        if (publicContractId > createdContractCount) {
            revert tokenWithSuchIdDoesNotExist(publicContractId, createdContractCount);
        }
        return allCreatedContracts[publicContractId];
    }
}