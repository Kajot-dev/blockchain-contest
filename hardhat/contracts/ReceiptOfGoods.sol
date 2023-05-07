//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./CustomIPFSNFT.sol";
import "./Marketplace.sol";
 

abstract contract ReceiptOfGoods is Marketplace, CustomIPFSNFT {

    address internal customer;
    mapping(uint256=>bool) internal tokensBurned;

    event nftBurned(address indexed _from, address indexed nftAddress, uint256 indexed tokenId, uint256 date);

    function passNFTToBurn (address nftAddress, uint256 tokenId) external notListed(nftAddress, tokenId) isOwner(nftAddress, tokenId, customer) 
    {
        _burn(tokenId);
        tokensBurned[tokenId] = true;
        uint256 date = block.timestamp;

        emit nftBurned(customer, nftAddress, tokenId, date);
    }


    function _burn(uint256 tokenId) internal override (CustomIPFSNFT) {
        super._burn(tokenId);
    }
}