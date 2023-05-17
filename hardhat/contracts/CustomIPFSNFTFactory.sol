// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./CustomIPFSNFT.sol";

contract customIPFSNFTFactory {

    struct CreatedContract {
        CustomIPFSNFT token;
        uint16 contractId;
        string name;
        string symbol;
        string[] tokenUris;
    }

    uint256 public createdContractCount;
    address[] private creators;

    mapping(address => uint16) private creatorContractsSum;
    mapping(address => CreatedContract[]) private creatorContracts;

    event tokenCreated(address indexed contractAddress, string tokenName, string tokenSymbol);

    function deployToken(string memory tokenName, string memory tokenSymbol, string[] memory tokenUris) public {
        CustomIPFSNFT token = new CustomIPFSNFT(tokenName, tokenSymbol, tokenUris);

        CreatedContract memory newContract;
        creatorContractsSum[msg.sender]++;

        uint16 counter = creatorContractsSum[msg.sender];

        newContract.token = token;
        newContract.contractId = counter;
        newContract.name = tokenName;
        newContract.symbol = tokenSymbol;
        newContract.tokenUris = tokenUris;

        creatorContracts[msg.sender].push(newContract);
        createdContractCount++;
        emit tokenCreated(address(token), tokenName, tokenSymbol);
    }   

    function viewContracts() external view returns (CreatedContract[] memory) {
        return creatorContracts[msg.sender];
    }

}