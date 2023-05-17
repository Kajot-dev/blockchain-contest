import ethers from "ethers";
import { createContext, useCallback } from "react";

const contractAddress = process.env.MARKETPLACE_CONTRACT_ADDRESS;

const abi = ["TODO"];

export const RetailerContractContext = createContext(undefined);

//set of functions for retailer panel
export function RetailerContractProvider({ ...props }) {
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

  //this should give us all the listings that given retailer has
  //event the ones that are not yet available for sale
  const getMintedListings = useCallback(async (start = 0, amount = 30) => {},
  []); //TODO

  //this will give us a list of transactions that happened and involved NFTs of given retailer
  //for purposes like "someone bought XXX NFTs from this retailer at this time"
  const getRecentTransactions = useCallback(
    async (start = 0, amount = 30) => {},
    []
  ); //READY

  //this will create a new deployment of NFTs
  const createListing = useCallback(
    async ({ name, symbol, imageBlob, price, items, deployTime }) => {},
    []
  ); //READY

  //this will update existing listing which has not yet been deployed
  const updateListing = useCallback(
    async ({ tokenId, price, deployTime }) => {},
    []
  ); //READY

  //this will cancel existing listing which has not yet been deployed
  const cancelListing = useCallback(async (nftContractAddress, tokenId) => {},
  []); //READY

  //this will cash out the money that was earned from sales
  const cashOut = useCallback(async () => {}, []); //TODO

  const value = useMemo(
    () => ({
      getMintedListings,
      getRecentTransactions,
      createListing,
      updateListing,
      cancelListing,
      cashOut,
    }),
    [
      getMintedListings,
      getRecentTransactions,
      createListing,
      updateListing,
      cancelListing,
      cashOut,
    ]
  );

  return <RetailerContractContext.Provider value={value} {...props} />;
}

const exports = {
  RetailerContractContext,
  RetailerContractProvider,
};

export default exports;
