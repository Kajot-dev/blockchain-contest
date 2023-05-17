import { Contract } from "ethers";
import { CustomIPFSNFT } from "./contractInfo";

const promiseWrapper = async (id, func, ...args) => {
  try {
    let result = await func(...args);
    return {
      id,
      result,
    };
  } catch (e) {
    return {
      id,
      error: e,
    };
  }
};
// it gets list of listings with "naftAddress" and "tokenId" fields and "id" field
// it then gets the IPFS URI for each of the listings
// it get the info from IPFS
// it yields the info from IPFS, but with "naftAddress" and "tokenId" fields and "id" field
//it does this asynchronously
export async function* getNFTInfoGenerator(listings, contractRunner) {
  const retrieveNftInfo = async (listing) => {
    const contract = new Contract(
      listing.nftContract,
      CustomIPFSNFT.abiString,
      contractRunner
    );

    let priceWei = listing.price;
    let priceETH = priceWei / 10n ** 18n;

    let ipfsUri = await contract.getTokenUri(listing.tokenId - 1n);
    if (!ipfsUri.startsWith("ipfs://")) {
      throw new Error("Invalid IPFS URI");
    }
    ipfsUri = ipfsUri.substring(7);
    let res = await fetch(`https://ipfs.io/ipfs/${ipfsUri}`);
    let info = await res.json();
    return {
      ...info,
      priceETH,
      nftAddress: listing.nftAddress,
      tokenId: listing.tokenId,
      id: listing.id,
    };
  };

  let taskObj = {};

  for (let listing of listings) {
    taskObj[listing.id] = promiseWrapper(listing.id, retrieveNftInfo, listing);
  }

  let errors = [];

  while (true) {
    let tasks = Object.values(taskObj);
    let taskIds = Object.keys(taskObj);
    if (taskIds.length === 0) {
      break;
    }

    let result = await Promise.race(tasks);

    delete taskObj[result.id];

    if (result.error) {
      errors.push(result);
    } else {
      yield result.result;
    }
  }
  if (errors.length > 0) {
    throw errors;
  }
}

export class NotReadyError extends Error {
  constructor() {
    super("The contract is not ready");
  }
}
