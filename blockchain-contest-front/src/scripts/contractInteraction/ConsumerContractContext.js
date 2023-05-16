import ethers from "ethers";
import { createContext, useEffect, useCallback, useRef, useMemo } from "react";

const contractAddress = process.env.MARKETPLACE_CONTRACT_ADDRESS;

const abi = ["TODO"];

export const ConsumerContractContext = createContext(undefined);

//for purposes of customer panel and /launches page - write access
export function ConsumerContractProvider({ ...props }) {
  const provider = useRef(null);
  const contract = useRef(null);

  useEffect(() => {
    provider.current = new ethers.providers.Web3Provider(window.ethereum);
    contract.current = new ethers.Contract(
      contractAddress,
      abi,
      provider.current
    );
  }, []);

  //it will get NFTs that belong to given user
  const getConsumerNfts = useCallback(async (start = 0, amount = 30) => {}, []); //TODO - may be replaced with recent transaction (na koniec)

  //it will get details about an NFT that belongs to given user
  const getConsumerNft = useCallback(async (nftContractAddress, tokenId) => {},
  []); //READY

  //it will buy an NFT from retailer
  const buyNft = useCallback(async (nftContractAddress, tokenId) => {}, []); //READY

  //it will transfer an NFT to another user
  const transferNft = useCallback(async (listingId, toChainId, toAddress) => {},
  []); //READY - proposal (no UI is ready)

  const value = useMemo(
    () => ({
      getConsumerNfts,
      getConsumerNft,
      buyNft,
      transferNft,
    }),
    [getConsumerNfts, getConsumerNft, buyNft, transferNft]
  );

  return <ConsumerContractContext.Provider value={value} {...props} />;
}

export default {
  ConsumerContractContext,
  ConsumerContractProvider,
};
