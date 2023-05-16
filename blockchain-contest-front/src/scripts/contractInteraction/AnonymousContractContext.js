import ethers from "ethers";
import { createContext, useEffect, useCallback, useRef, useMemo } from "react";

//there will be one, public contract already deployed
//which is capable of reading the available listings
const contractAddress = process.env.MARKETPLACE_CONTRACT_ADDRESS;

const abi = [
  "function getAllListings() public view returns (uint256[] memory)",
];

export const AnonymousContractContext = createContext(undefined);

//for purposes of /launches page - only read access
export function AnonymousContractProvider({ ...props }) {
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

  //it will get NFTs that are available for sale
  const getAvailableListings = useCallback(async (start = 0, amount = 30) => {},
  []); //TODO (prototype ready)

  //it will get the amount of NFTs that are available for sale
  const getAvailableListingsCount = useCallback(async () => {}, []); //TODO (only if getting SOME listing is possible)

  //it will get details about an NFT that is available for sale
  const getListing = useCallback(async (nftContractAddress, tokenId) => {}, []); //READY

  const value = useMemo(
    () => ({
      getAvailableListings,
      getAvailableListingsCount,
      getListing,
    }),
    [getAvailableListings, getAvailableListingsCount, getListing]
  );

  return <AnonymousContractContext.Provider value={value} {...props} />;
}

export default {
  AnonymousContractContext,
  AnonymousContractProvider,
};
