// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./CustomIPFSNFT.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract customIPFSNFTFactory {
    
    struct CreatedContract {
        CustomIPFSNFT token;
        uint16 contractId;
        uint256 contractPublicId;
        address creator;
        string name;
        string symbol;
        string[] tokenUris;
    }

    uint256 public createdContractCount;
    CreatedContract[] public allCreatedContracts;
    address[] private creators;


    mapping(address => uint16) private creatorContractsSum;
    mapping(address => CreatedContract[]) private creatorContracts;

    event tokenCreated(address indexed contractAddress, string tokenName, string tokenSymbol);

    error tokenWithSuchIdDoesNotExist(uint256 yourId, uint256 maximumTokenId);

    function deployToken(string memory tokenName, string memory tokenSymbol, string[] memory tokenUris) public {
        CustomIPFSNFT token = new CustomIPFSNFT(tokenName, tokenSymbol, tokenUris);

        CreatedContract memory newContract;
        

        uint16 counter = creatorContractsSum[msg.sender];

        newContract.token = token;
        newContract.contractId = counter;
        newContract.contractPublicId = createdContractCount;
        newContract.creator = msg.sender;
        newContract.name = tokenName;
        newContract.symbol = tokenSymbol;
        newContract.tokenUris = tokenUris;

        creatorContracts[msg.sender].push(newContract);
        allCreatedContracts[createdContractCount] = newContract;
        creatorContractsSum[msg.sender]++;
        createdContractCount++;
        emit tokenCreated(address(token), tokenName, tokenSymbol);
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

    function getAllContracts() external view returns(CreatedContract[] memory){
        return allCreatedContracts;
    }
}