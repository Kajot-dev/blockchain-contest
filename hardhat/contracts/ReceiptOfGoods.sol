//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Marketplace } from "./Marketplace.sol";
import { ERC721Minter } from "./ERC721Minter.sol";
 

contract ReceiptOfGoods is Marketplace, ERC721Minter {
    address private customer;

    event nftBurned(address indexed _from, , indexed address nftAddress, uint256 indexed tokenId);

    constructor(string memory tokenName, string memory symbol) ERC721Minter (tokenName, symbol) {
        customer = msg.sender;
    }

    function passNFTToBurn (address nftAddress, uint256 tokenId) external
        notListed(nftAddress, tokenId)
        isOwner(nftAddress, tokenId, this.customer) 
    {
        _burn(tokenId);
        nftBurned(customer, nftAddress, tokenId);
    }


    function _burn(uint256 tokenId) internal override (ERC721Minter) {
        super._burn(tokenId);
    }
}