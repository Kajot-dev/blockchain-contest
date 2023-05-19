import { BrowserProvider, Contract, formatEther, parseEther } from "ethers";
import {
  createContext,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useState,
} from "react";
import { Marketplace, NFTFactory, CustomIPFSNFT, desiredChainId } from "./contractInfo";
import { useMetaMask } from "metamask-react";

export const RetailerContractContext = createContext(undefined);

function dataURIToBlob(dataURI) {
  //this is only to be called in the browser
  let byteString = window.atob(dataURI.split(",")[1]);
  let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];


  let ab = new ArrayBuffer(byteString.length);
  let dw = new DataView(ab);

  for (let i = 0; i < byteString.length; i++) {
    dw.setUint8(i, byteString.charCodeAt(i));
  }

  return new Blob([ab], { type: mimeString });
}

function waitForEvent(contract, eventName) {
  console.log("waiting for event", eventName);
  return new Promise((resolve, reject) => {
    contract.once(eventName, (...args) => {
      console.log("event", eventName, "fired");
      resolve(args);
    });
  });
}


//set of functions for retailer panel
export function RetailerContractProvider({ ...props }) {
  const { status, chainId } = useMetaMask();
  const [isReady, setIsReady] = useState(false);

  const provider = useRef(null);
  const contractMarketplace = useRef(null);
  const contractFactory = useRef(null);

  useEffect(() => {
    if (status === "connected" && chainId === desiredChainId) {
      provider.current = new BrowserProvider(window.ethereum);
      contractMarketplace.current = new Contract(
        Marketplace.address,
        Marketplace.abiString,
        provider.current
      );
      contractFactory.current = new Contract(
        NFTFactory.address,
        NFTFactory.abiString,
        provider.current
      );
      window.contractFactory = contractFactory.current;
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [status, chainId]);

  //this should give us all the listings that given retailer has
  //event the ones that are not yet available for sale
  const getMintedListings = useCallback(async () => {
    return contractMarketplace.current.fetchMyCreatedItems();
  }, []);

  //this will give us a list of transactions that happened and involved NFTs of given retailer
  //for purposes like "someone bought XXX NFTs from this retailer at this time"
  const getRecentTransactions = useCallback(async () => {
    //with events
  }, []);

  //this will create a new deployment of NFTs
  const createListing = useCallback(async function*(symbol, description, priceWei, deployUnixTime, itemsData) {
    let signer = await provider.current.getSigner();
    let signedMContract = contractMarketplace.current.connect(signer);
    let signedFContract = contractFactory.current.connect(signer);

    yield {
      "status": "Deploying Contract",
      "CurrentNft": 0,
      "NFTsTotal": itemsData.length,
    }

    //create NFT contract
    let deployTx = await signedFContract.deployToken(description, symbol);
    let allDplEvents = await signedFContract.queryFilter("collectionCreated", deployTx.blockNumber, deployTx.blockNumber);
    
    let dplEvent = allDplEvents.find((e) => e.transactionHash === deployTx.hash);

    const collectionContractAddress = dplEvent.args[0];
    const collectionIndex = dplEvent.args[3];

    for (let i = 0; i < itemsData.length; i++) {

      yield {
        "status": "Uploading NFT",
        "CurrentNft": i + 1,
        "NFTsTotal": itemsData.length,
      }

      let item = itemsData[i];
      const { traitType, traitValue, rawImageDataURL } = item;
      //create FormData
      let formData = new FormData();
      formData.append("symbol", symbol);
      formData.append("description", description);
      formData.append("traitType", traitType);
      formData.append("traitValue", traitValue);
      formData.append("image", dataURIToBlob(rawImageDataURL));

      const endpoint = `${window.location.protocol}//${window.location.host}/api/nft`;
      let res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      let statusCode = res.status;
      
      //assert that status code is 201
      if (statusCode === 400) {
        console.log(await res.json())
        throw new Error("Bad Request");
      }

      if (statusCode !== 201) {
        throw new Error("Error while uploading NFT");
      }

      let resJson = await res.json();

      yield {
        "status": "Minting NFT",
        "CurrentNft": i + 1,
        "NFTsTotal": itemsData.length,
      }
      console.log("minting NFT", collectionIndex, resJson.metadataURL)
      //mint NFT
      let mintTx = await signedFContract.mintNFT(collectionIndex, resJson.data.metadataURL);
      let allMintEvents = await signedFContract.queryFilter("nftMinted", mintTx.blockNumber, mintTx.blockNumber);
      let mintEvent = allMintEvents.find((e) => e.transactionHash === mintTx.hash);

      const mintedTokenId = mintEvent.args[1];

      yield {
        "status": "Approving NFT",
        "CurrentNft": i + 1,
        "NFTsTotal": itemsData.length,
      }

      const collectionContract = new Contract(
        collectionContractAddress,
        CustomIPFSNFT.abiString,
        signer
      );

      //approve NFT
      await collectionContract.approve(Marketplace.address, mintedTokenId);

      yield {
        "status": "Listing NFT",
        "CurrentNft": i + 1,
        "NFTsTotal": itemsData.length,
      }


      //list NFT
      await signedMContract.listItem(
        collectionContractAddress,
        mintedTokenId,
        priceWei,
        deployUnixTime
      );
    }

    yield {
      "status": "Done",
      "CurrentNft": itemsData.length,
      "NFTsTotal": itemsData.length,
    }
  }, []);

  //this will update existing listing which has not yet been deployed
  const updateListing = useCallback(
    async (listingId, priceWei, deployUnixTime) => {
      let signer = await provider.current.getSigner();
      let signedContract = contractMarketplace.current.connect(signer);
      return signedContract.updateListing(
        listingId,
        priceWei,
        deployUnixTime
      );
    },
    []
  );

  //this will cancel existing listing which has not yet been deployed
  const cancelListing = useCallback(async (tokenId) => {
    let signer = await provider.current.getSigner();
    contractMarketplace.current.connect(signer);
    return contractMarketplace.current.cancelListing(tokenId);
  }, []);

  //this will cash out the money that was earned from sales
  const cashOut = useCallback(async () => {
    return contractMarketplace.current.withdraw();
  }, []);

  //this will return balance of the retailer in Wei
  const getBalance = useCallback(async () => {
    return contractMarketplace.current.getMyBalance();
  }, []);

  const value = useMemo(
    () => ({
      getMintedListings,
      getRecentTransactions,
      createListing,
      updateListing,
      cancelListing,
      cashOut,
      getBalance,
      isReady,
      contractProviderRef: provider,
    }),
    [
      getMintedListings,
      getRecentTransactions,
      createListing,
      updateListing,
      cancelListing,
      cashOut,
      getBalance,
      isReady,
      provider,
    ]
  );

  return <RetailerContractContext.Provider value={value} {...props} />;
}

const exports = {
  RetailerContractContext,
  RetailerContractProvider,
};

export default exports;
