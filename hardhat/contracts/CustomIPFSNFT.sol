// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CustomIPFSNFT is ERC721URIStorage {

    //Errors
    error NFT_AlreadyInitialized();
    error NFT_TransferFailed();
    error NFT_NotAnOwner();

    // Events
    event NFTMinted(uint256 indexed tokenId, address minter);

    // NFT Variables
    uint256 private s_tokenCounter;
    string internal s_tokenName;
    string internal s_tokenSymbol;

    address private owner;

    //Modifiers
    modifier onlyOwner() {
        if(msg.sender==owner) {
            _;
        } else {
            revert NFT_NotAnOwner();
        }
    }

    constructor(string memory _name, string memory _symbol) ERC721(s_tokenName, s_tokenSymbol) {
        owner=msg.sender;        
        s_tokenCounter = 0;
        s_tokenName = _name;
        s_tokenSymbol = _symbol;
    }

    function mintRequestedNFT(string memory ftokenURI) public onlyOwner {

        address tokenOwner = msg.sender;
        uint256 tokenId = s_tokenCounter;
        s_tokenCounter = s_tokenCounter + 1;
        _safeMint(tokenOwner, tokenId);
        _setTokenURI(tokenId, ftokenURI);

        emit NFTMinted(tokenId, tokenOwner);

    }

    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (!success) {
            revert NFT_TransferFailed();
        }
    }

    function tokenURI(uint256 tokenId) public view override(ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }

    function _burn(uint256 tokenId) virtual internal override(ERC721URIStorage) {
        super._burn(tokenId);
    }

}