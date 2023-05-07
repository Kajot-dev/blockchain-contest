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
    string[] internal s_TokenUris;
    bool private s_initialized;
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

    constructor(string memory _name, string memory _symbol, string[] memory tokenUris) ERC721(s_tokenName, s_tokenSymbol) {
        owner=msg.sender;        
        s_tokenCounter = 0;
        s_tokenName = _name;
        s_tokenSymbol = _symbol;

        _initializeContract(tokenUris);
    }

    function mintRequestedNFT() public onlyOwner {

        address tokenOwner = msg.sender;
        uint256 tokenId = s_tokenCounter;
        s_tokenCounter = s_tokenCounter + 1;
        _safeMint(tokenOwner, tokenId);
        _setTokenURI(tokenId, s_TokenUris[uint256(tokenId)]);

        emit NFTMinted(tokenId, tokenOwner);

    }

    function _initializeContract(string[] memory tokenUris) private {

        if (s_initialized) {
            revert NFT_AlreadyInitialized();
        }

        s_TokenUris = tokenUris;
        s_initialized = true;
    }

    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (!success) {
            revert NFT_TransferFailed();
        }
    }

    function getTokenUri(uint256 index) public view returns (string memory) {
        return s_TokenUris[index];
    }

    function getInitialized() public view returns (bool) {
        return s_initialized;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }

    function _burn(uint256 tokenId) virtual internal override(ERC721URIStorage) {
        super._burn(tokenId);
    }

}