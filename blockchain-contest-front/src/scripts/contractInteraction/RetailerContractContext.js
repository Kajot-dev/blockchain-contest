import { BrowserProvider, Contract } from "ethers";
import {
  createContext,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useState,
} from "react";
import { Marketplace, CustomIPFSNFT, desiredChainId } from "./contractInfo";
import { useMetaMask } from "metamask-react";

export const RetailerContractContext = createContext(undefined);

//set of functions for retailer panel
export function RetailerContractProvider({ ...props }) {
  const { status, chainId } = useMetaMask();
  const [isReady, setIsReady] = useState(false);

  const provider = useRef(null);
  const signer = useRef(null);
  const contract = useRef(null);

  useEffect(() => {
    if (status === "connected" && chainId === desiredChainId) {
      provider.current = new BrowserProvider(window.ethereum);
      //signer.current = await provider.current.getSigner();
      contract.current = new Contract(
        Marketplace.address,
        Marketplace.abiString,
        provider.current
      );
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [status, chainId]);

  //this should give us all the listings that given retailer has
  //event the ones that are not yet available for sale
  const getMintedListings = useCallback(async () => {
    console.log("calling Marketplace.fetchMyCreatedItems()")
    return contract.current.fetchMyCreatedItems();
  }, []);

  //this will give us a list of transactions that happened and involved NFTs of given retailer
  //for purposes like "someone bought XXX NFTs from this retailer at this time"
  const getRecentTransactions = useCallback(async () => {
    //with events
  }, []);

  //this will create a new deployment of NFTs
  const createListing = useCallback(async (tokenUris, price, deployTime) => {
    //awaiting contract factory
  }, []);

  //this will update existing listing which has not yet been deployed
  const updateListing = useCallback(
    async (listingId, priceWei, deployUnixTime) => {
      let signer = await provider.current.getSigner();
      contract.current.connect(signer);
      return contract.current.updateListing(
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
    contract.current.connect(signer);
    return contract.current.cancelListing(tokenId);
  }, []);

  //this will cash out the money that was earned from sales
  const cashOut = useCallback(async () => {
    return contract.current.withdraw();
  }, []);

  //this will return balance of the retailer in Wei
  const getBalance = useCallback(async () => {
    return contract.current.getMyBalance();
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
