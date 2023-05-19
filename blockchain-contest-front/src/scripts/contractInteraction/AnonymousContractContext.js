import { BrowserProvider, Contract, parseEther } from "ethers";
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
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [status, chainId]);

  //it will get NFTs that are available for sale
  const getAvailableListings = useCallback(async () => {
    let activeItems = contract.current.fetchActiveItems();
    return activeItems;
  }, []);

  //it will get the amount of NFTs that are available for sale
  const getAvailableListingsCount = useCallback(async () => {
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

  //it will buy an NFT from retailer
  const buyNft = useCallback(async (tokenId, priceWei) => {
    let signer = await provider.current.getSigner();
    let contractWithSigner = contract.current.connect(signer);
    return contractWithSigner.buyItem(tokenId, {
      value: priceWei,
    });
  }, []);

  const value = useMemo(
    () => ({
      getAvailableListings,
      getAvailableListingsCount,
      getListingIPFSUri,
      buyNft,
      isReady,
      contractProviderRef: provider,
    }),
    [
      getAvailableListings,
      getAvailableListingsCount,
      getListingIPFSUri,
      buyNft,
      isReady,
      provider,
    ]
  );

  return <AnonymousContractContext.Provider value={value} {...props} />;
}

const exports = {
  AnonymousContractContext,
  AnonymousContractProvider,
};

export default exports;
