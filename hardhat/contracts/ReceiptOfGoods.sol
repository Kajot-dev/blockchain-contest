//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CustomIPFSNFT.sol";
import "./StoreAccessControl.sol";

abstract contract ReceiptOfGoods is CustomIPFSNFT, StoreAccessControl {

    address internal customer;
    mapping(uint256=>bool) internal tokensBurned;

    event nftBurned(address indexed _from, address indexed nftAddress, uint256 indexed tokenId, uint256 date);

    error NotACustomer();

    modifier isCustomer() {
        if(isAddressPrivileged(msg.sender))
            revert NotACustomer();
        _;
    }

    function passNFTToBurn (address nftAddress, uint256 tokenId) external isCustomer
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