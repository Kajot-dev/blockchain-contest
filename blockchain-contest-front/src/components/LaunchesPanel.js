import { Panel, OutlineButton, TextField } from "@/components/Forms";
import { PulseLoader } from "react-spinners";
import { SearchRegular, ImageProhibitedRegular } from "@fluentui/react-icons";
import { Unbounded } from "next/font/google";
import { useEffect, useState, useContext, useCallback } from "react";
import { AnonymousContractContext } from "@/scripts/contractInteraction/AnonymousContractContext";

import styles from "../styles/Launches.module.css";
import stylesForm from "../styles/Forms.module.css";

const unbounded6 = Unbounded({ subsets: ["latin"], weight: "600" });

function ListingCard({ listing }) {
  const { symbol, name, imageIpfsUrl, priceETH } = listing;

  const [imageError, setImageError] = useState(imageIpfsUrl === null);

  const imageErrorHandler = useCallback((e) => {
    setImageError(true);
  }, []);

  let realImageUrl = null;
  if (imageIpfsUrl) {
    if (imageIpfsUrl.startsWith("ipfs://")) {
      realImageUrl = "https://ipfs.io/ipfs/" + imageIpfsUrl.slice(7);
    } else if (
      imageIpfsUrl.startsWith("http://") ||
      imageIpfsUrl.startsWith("https://")
    ) {
      realImageUrl = imageIpfsUrl;
    }
  }

  return (
    <Panel className={`${styles.card} ${stylesForm.thin}`}>
      <div className={`${stylesForm.title} ${unbounded6.className}`}>
        {symbol}
      </div>
      {imageError ? (
        <div className={styles.cardImage}>
          <ImageProhibitedRegular className={styles.cardImageError} />
        </div>
      ) : (
        <img
          src={realImageUrl}
          alt={name}
          className={styles.cardImage}
          onError={imageErrorHandler}
        />
      )}
      <div className={styles.cardPrice}>{priceETH} ETH</div>
      <div className={stylesForm.subtle}>{name}</div>
      <OutlineButton>Buy</OutlineButton>
    </Panel>
  );
}

function CardGrid({ listings = [], placeholder = null }) {
  return (
    <div className={styles.cardContainer}>
      {listings.length > 0
        ? listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        : placeholder}
    </div>
  );
}

export default function LaunchesPanel({ className = "" }) {
  const [listings, setListings] = useState({});

  const { getAvailableListings, getListingIPFSUri, isReady } = useContext(
    AnonymousContractContext
  );

  const prepareListings = useCallback(async () => {
    let activeListings = await getAvailableListings();
    for (const listingInfo of activeListings) {
      const nftContractAddress = listingInfo.nftContract;
      const tokenId = listingInfo.tokenId;
      const ipfsUri = await getListingIPFSUri(nftContractAddress, tokenId - 1n);
      console.log(listingInfo, ipfsUri);
      let priceWei = listingInfo.price;
      let priceETH = priceWei / 10n ** 18n;

      let listingObj = {
        symbol: "--",
        name: "Not available",
        imageIpfsUrl: null,
        priceETH: priceETH.toString(),
      };

      //fetch data from ipfs
      console.log(ipfsUri);
      try {
        let res = await fetch(`https://ipfs.io/ipfs/${ipfsUri.slice(7)}`);
        let data = await res.json();
        let { name, description, image } = data;
        listingObj.symbol = name;
        listingObj.name = description;
        listingObj.imageIpfsUrl = image;
      } catch (e) {
        console.error(e);
      }

      setListings((listings) =>
        Object.assign({}, listings, {
          [listingInfo.id]: listingObj,
        })
      );
    }
  }, [getAvailableListings, getListingIPFSUri]);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    prepareListings();
  }, [isReady, prepareListings]);

  let listingsArray = [];

  for (const [id, listing] of Object.entries(listings)) {
    listingsArray.push({
      id,
      ...listing,
    });
  }

  return (
    <div className={`${styles.mainContainer} ${className}`}>
      <div className={`${styles.motto} ${unbounded6.className}`}>
        {"Best NFTs - Best Products - Ready "}
        <span className={styles.emphasize}>2</span>
        {" be "}
        <span className={styles.emphasize}>Forged</span>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.contentHeader}>
          <div className={stylesForm.title}>Marketplace</div>
          <div className={styles.priceRange}>
            <span>Price:</span>
            <div className={styles.narrowField}>
              <TextField
                placeholder="0.00"
                desc="From"
                replaceRegex={/[^0-9.]/g}
              />
            </div>
            <span>-</span>
            <div className={styles.narrowField}>
              <TextField
                placeholder="10.00"
                desc="To"
                replaceRegex={/[^0-9.]/g}
              />
            </div>
          </div>
          <div className={styles.wideField}>
            <TextField
              placeholder="Weird monkey..."
              desc="Search"
              FluentIcon={SearchRegular}
            />
          </div>
        </div>
        <CardGrid placeholder={<PulseLoader />} listings={listingsArray} />
      </div>
    </div>
  );
}
