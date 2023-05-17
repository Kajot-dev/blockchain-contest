// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {

    using Counters for Counters.Counter;
    Counters.Counter private _listingsCounter;
    Counters.Counter private _soldCounter;

    enum State {
        Inactive,
        Active
    }

    struct Listing {
        uint256 id;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable buyer;
        uint256 price;
        uint256 time;
        State state;
    }

    mapping(uint256 => Listing) private allListings;
    mapping(address => uint256) private sellerBalance;
    uint256 public activationTime;

    event ItemListed(
        uint256 indexed id,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address buyer,
        uint256 price,
        uint256 time,
        State state
    );

     event ItemCancelled(
        uint256 indexed id,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        State state
    );

    event ItemBought(
        uint256 indexed id,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address buyer,
        uint256 price,
        State state
    );

    event ItemUpdated(
        uint256 indexed id,
        address seller,
        uint256 price,
        uint256 time
    );

    function listItem(address nftContract, uint256 tokenId, uint256 price, uint256 time) public nonReentrant {
        
        require(price > 0, "[Marketplace] Price must be more than 0!");
        require(IERC721(nftContract).getApproved(tokenId) == address(this), "[Marketplace] NFT must be approved to market.");

        _listingsCounter.increment();
        uint256 id = _listingsCounter.current();

        activationTime = block.timestamp + time;

        allListings[id] = Listing(
            id,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            activationTime,
            State.Active
        );

        emit ItemListed(
            id,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            time,
            State.Active
        );
    }

    function cancelListing(uint256 listingId) public nonReentrant {

        require(listingId <= _listingsCounter.current(), "[Marketplace] Listing ID is out of bounds! Try smaller number.");

        Listing storage listing = allListings[listingId]; //Must use storage (more gas consumption)

        require(listing.state == State.Active, "[Marketplace] Listing must be active in order to be cancelled.");
        require(IERC721(listing.nftContract).ownerOf(listing.tokenId) == msg.sender, "[Marketplace] You must be the owner.");
        require(IERC721(listing.nftContract).getApproved(listing.tokenId) == address(this), "[Marketplace] NFT must be approved to market.");

        listing.state = State.Inactive;

        emit ItemCancelled(
            listingId,
            listing.nftContract,
            listing.tokenId,
            listing.seller,
            State.Inactive
        );
    }

    function buyItem(uint256 listingId) public payable nonReentrant {

        Listing storage listing = allListings[listingId]; //Must use storage (more gas consumption)

        address nftContract = listing.nftContract;
        uint256 tokenId = listing.tokenId;
        uint256 price = listing.price;

        require(block.timestamp > listing.time, "[Marketplace] Offer is pending, wait until protection time expires.");
        require(listing.state == State.Active, "[Marketplace] Offer is not active.");
        require(msg.value == price, "[Marketplace] Please submit the asking price");
        require(IERC721(nftContract).getApproved(tokenId) == address(this), "[Marketplace] NFT must be approved to market.");

        listing.buyer = payable(msg.sender);
        _soldCounter.increment();
        IERC721(nftContract).transferFrom(listing.seller, msg.sender, tokenId);
        sellerBalance[listing.seller]+=msg.value;

        listing.state = State.Inactive;

        emit ItemBought(
            listingId,
            nftContract,
            tokenId,
            listing.seller,
            msg.sender,
            price,
            State.Inactive
        );
    }

    function updateListing(uint256 listingId, uint256 newPrice, uint256 newTime) public nonReentrant {

        require(listingId <= _listingsCounter.current(), "[Marketplace] Listing ID is out of bounds! Try smaller number.");

        Listing storage listing = allListings[listingId]; //Must use storage (more gas consumption)

        require(listing.state == State.Active, "[Marketplace] Listing must be active in order to be updated");
        require(IERC721(listing.nftContract).ownerOf(listing.tokenId) == msg.sender, "[Marketplace] You must be the owner.");

        listing.price = newPrice;
        listing.time = block.timestamp + newTime;

        emit ItemUpdated(listingId, msg.sender, newPrice, newTime);

    }

     function withdraw() external {
        uint256 totalEth = sellerBalance[msg.sender];
        require(sellerBalance[msg.sender] > 0, "[Marketplace] Your current balance is 0, reverting..");

        sellerBalance[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: totalEth}("");
        require(success, "Transfer failed");
    }

    function getListingById(uint256 listingId) public view returns (Listing memory) {
        return allListings[listingId];
    }

    function getTotalListings() public view returns (uint256) {
        return _listingsCounter.current();
    }

    function getMyBalance() public view returns (uint256) {
        return sellerBalance[msg.sender];
    }

    function fetchActiveItems() public view returns (Listing[] memory) {
        return fetchHepler(FetchOperator.ActiveListings);
    }

    function fetchMyPurchasedItems() public view returns (Listing[] memory) {
        return fetchHepler(FetchOperator.MyPurchasedItems);
    }

    function fetchMyCreatedItems() public view returns (Listing[] memory) {
        return fetchHepler(FetchOperator.MyCreatedListings);
    }

    enum FetchOperator {
        ActiveListings,
        MyCreatedListings,
        MyPurchasedItems
    }

    function fetchHepler(FetchOperator _op)
        private
        view
        returns (Listing[] memory)
    {
        uint256 total = _listingsCounter.current();

        uint256 itemCount = 0;
        for (uint256 i = 1; i <= total; i++) {
            if (isCondition(allListings[i], _op)) {
                itemCount++;
            }
        }

        uint256 index = 0;
        Listing[] memory items = new Listing[](itemCount);
        for (uint256 i = 1; i <= total; i++) {
            if (isCondition(allListings[i], _op)) {
                items[index] = allListings[i];
                index++;
            }
        }
        return items;
    }

    function isCondition(Listing memory listing, FetchOperator _op)
        private
        view
        returns (bool)
    {
        if (_op == FetchOperator.MyCreatedListings) {
            return
                (listing.seller == msg.sender && listing.state != State.Inactive)
                    ? true
                    : false;
        } else if (_op == FetchOperator.MyPurchasedItems) {
            return (listing.buyer == msg.sender) ? true : false;
        } else if (_op == FetchOperator.ActiveListings) {
            return
                (listing.buyer == address(0) &&
                    listing.state == State.Active &&
                    (IERC721(listing.nftContract).getApproved(listing.tokenId) ==
                        address(this)))
                    ? true
                    : false;
        } else {
            return false;
        }
    }
}