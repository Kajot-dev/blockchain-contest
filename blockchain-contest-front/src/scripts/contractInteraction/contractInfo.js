export const Marketplace = Object.freeze({
  address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  abiString: `[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"nftContract","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"address","name":"seller","type":"address"},{"indexed":false,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":false,"internalType":"enum Marketplace.State","name":"state","type":"uint8"}],"name":"ItemBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"nftContract","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"address","name":"seller","type":"address"},{"indexed":false,"internalType":"enum Marketplace.State","name":"state","type":"uint8"}],"name":"ItemCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"nftContract","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"address","name":"seller","type":"address"},{"indexed":false,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"},{"indexed":false,"internalType":"enum Marketplace.State","name":"state","type":"uint8"}],"name":"ItemListed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"address","name":"seller","type":"address"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"ItemUpdated","type":"event"},{"inputs":[],"name":"activationTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"listingId","type":"uint256"}],"name":"buyItem","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"listingId","type":"uint256"}],"name":"cancelListing","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fetchActiveItems","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"nftContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address payable","name":"seller","type":"address"},{"internalType":"address payable","name":"buyer","type":"address"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"enum Marketplace.State","name":"state","type":"uint8"}],"internalType":"struct Marketplace.Listing[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fetchMyCreatedItems","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"nftContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address payable","name":"seller","type":"address"},{"internalType":"address payable","name":"buyer","type":"address"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"enum Marketplace.State","name":"state","type":"uint8"}],"internalType":"struct Marketplace.Listing[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fetchMyPurchasedItems","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"nftContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address payable","name":"seller","type":"address"},{"internalType":"address payable","name":"buyer","type":"address"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"enum Marketplace.State","name":"state","type":"uint8"}],"internalType":"struct Marketplace.Listing[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"listingId","type":"uint256"}],"name":"getListingById","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"nftContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address payable","name":"seller","type":"address"},{"internalType":"address payable","name":"buyer","type":"address"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"enum Marketplace.State","name":"state","type":"uint8"}],"internalType":"struct Marketplace.Listing","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMyBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalListings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"nftContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"}],"name":"listItem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"uint256","name":"newPrice","type":"uint256"},{"internalType":"uint256","name":"newTime","type":"uint256"}],"name":"updateListing","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]`,
});

export const NFTFactory = Object.freeze({
  address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  abiString: `[{"inputs":[{"internalType":"uint256","name":"yourId","type":"uint256"},{"internalType":"uint256","name":"maximumTokenId","type":"uint256"}],"name":"tokenWithSuchIdDoesNotExist","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_storeAddr","type":"address"},{"indexed":false,"internalType":"string","name":"_storeName","type":"string"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"DateMarkedAsShop","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"PrivlegesMoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"contractAddress","type":"address"},{"indexed":false,"internalType":"string","name":"tokenName","type":"string"},{"indexed":false,"internalType":"string","name":"tokenSymbol","type":"string"}],"name":"tokenCreated","type":"event"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"contractApproved","type":"address"},{"internalType":"uint256","name":"collectionIndex","type":"uint256"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"tokenName","type":"string"},{"internalType":"string","name":"tokenSymbol","type":"string"}],"name":"deployToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"contractId","type":"uint256"}],"name":"getSingleContract","outputs":[{"internalType":"contract CustomIPFSNFT","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getStoreByIndex","outputs":[{"components":[{"internalType":"string","name":"sname","type":"string"},{"internalType":"address","name":"saddress","type":"address"}],"internalType":"struct StoreAccessControl.Store","name":"specifiedStore","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ipfsNFTs","outputs":[{"internalType":"contract CustomIPFSNFT","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_checkAddr","type":"address"}],"name":"isAddressPrivileged","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isVerifiedStore","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_storeAddr","type":"address"},{"internalType":"string","name":"_storeName","type":"string"}],"name":"markUserAsStore","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"collectionIndex","type":"uint256"},{"internalType":"string","name":"nextTokenUri","type":"string"}],"name":"mintNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newAdminAddr","type":"address"}],"name":"moveAdminPrivileges","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"numberOfPartneredStores","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_addrToRemove","type":"address"}],"name":"removeUserPrivileges","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"collectionIndex","type":"uint256"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"showTokenUri","outputs":[{"internalType":"string","name":"tokenUri","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"storeCollection","outputs":[{"internalType":"contract CustomIPFSNFT","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stores","outputs":[{"internalType":"string","name":"sname","type":"string"},{"internalType":"address","name":"saddress","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"store","type":"address"}],"name":"viewCreatorContracts","outputs":[{"internalType":"contract CustomIPFSNFT[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"}]`
});


export const CustomIPFSNFT = Object.freeze({
  address: null, //address is dynamic and should be retrieved from marketplace contract
  abiString: `[{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"string[]","name":"tokenUris","type":"string[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"NFT_AlreadyInitialized","type":"error"},{"inputs":[],"name":"NFT_NotAnOwner","type":"error"},{"inputs":[],"name":"NFT_TransferFailed","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"address","name":"minter","type":"address"}],"name":"NFTMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getInitialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getTokenUri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintRequestedNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]`,
});

export const desiredChainId = "0x7a69";

export const networkName = "Local";
