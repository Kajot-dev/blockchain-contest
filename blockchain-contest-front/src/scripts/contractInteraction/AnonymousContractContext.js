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

export const AnonymousContractContext = createContext(undefined);

//for purposes of /launches page - only read access
export function AnonymousContractProvider({ ...props }) {
  const { status, chainId } = useMetaMask();
  const [isReady, setIsReady] = useState(false);

  const provider = useRef(null);
  const contract = useRef(null);

  useEffect(() => {
    if (status === "connected" && chainId === desiredChainId) {
      provider.current = new BrowserProvider(window.ethereum);
      contract.current = new Contract(
        Marketplace.address,
        Marketplace.abiString,
        provider.current
      );
      window.contractRef = contract;
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [status, chainId]);

  //it will get NFTs that are available for sale
  const getAvailableListings = useCallback(async () => {
    let activeItems = contract.current.fetchActiveItems();
    //TODO return only nftContract and tokenId
    return activeItems;
  }, []);

  //it will get the amount of NFTs that are available for sale
  const getAvailableListingsCount = useCallback(async () => {
    console.log("Trying to get total listings");
    console.log(contract.current);
    return contract.current.getTotalListings();
  }, []);

  //it will get details about an NFT that is available for sale
  const getListingIPFSUri = useCallback(async (nftContractAddress, tokenId) => {
    let nftContract = new Contract(
      nftContractAddress,
      CustomIPFSNFT.abiString,
      provider.current
    );

    return nftContract.getTokenUri(tokenId);
  }, []);

  const value = useMemo(
    () => ({
      getAvailableListings,
      getAvailableListingsCount,
      getListingIPFSUri,
      isReady,
    }),
    [
      getAvailableListings,
      getAvailableListingsCount,
      getListingIPFSUri,
      isReady,
    ]
  );

  return <AnonymousContractContext.Provider value={value} {...props} />;
}

const exports = {
  AnonymousContractContext,
  AnonymousContractProvider,
};

export default exports;
