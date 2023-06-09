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

export const ConsumerContractContext = createContext(undefined);

//for purposes of customer panel and /launches page - write access
export function ConsumerContractProvider({ ...props }) {
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

  //it will get NFTs that belong to given user
  const getConsumerNfts = useCallback(async () => {
    let signer = await provider.current.getSigner();
    let signedContract = contract.current.connect(signer);
    return signedContract.fetchMyPurchasedItems();
  }, []);

  //it will get details about an NFT that belongs to given user
  const getConsumerNftIPFSUri = useCallback(
    async (nftContractAddress, tokenId) => {
      let nftContract = new Contract(
        nftContractAddress,
        CustomIPFSNFT.abiString,
        provider.current
      );

      return nftContract.getTokenUri(tokenId);
    },
    []
  );

  //it will transfer an NFT to another user
  const transferNft = useCallback(async (listingId, toChainId, toAddress) => {},
  []); //READY - proposal (no UI is ready)

  const value = useMemo(
    () => ({
      getConsumerNfts,
      getConsumerNftIPFSUri,
      transferNft,
      isReady,
      contractProviderRef: provider,
    }),
    [getConsumerNfts, getConsumerNftIPFSUri, transferNft, provider, isReady]
  );

  return <ConsumerContractContext.Provider value={value} {...props} />;
}

const exports = {
  ConsumerContractContext,
  ConsumerContractProvider,
};

export default exports;
