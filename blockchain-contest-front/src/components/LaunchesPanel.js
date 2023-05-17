import { Panel, OutlineButton, TextField } from "@/components/Forms";
import { PulseLoader } from "react-spinners";
import { SearchRegular, ImageProhibitedRegular } from "@fluentui/react-icons";
import { Unbounded } from "next/font/google";
import { useEffect, useState, useContext, useCallback } from "react";
import { AnonymousContractContext } from "@/scripts/contractInteraction/AnonymousContractContext";
import { getNFTInfoGenerator } from "@/scripts/contractInteraction/contractUtils";

import styles from "../styles/Launches.module.css";
import stylesForm from "../styles/Forms.module.css";

const unbounded6 = Unbounded({ subsets: ["latin"], weight: "600" });

function ListingCard({ listing }) {
  const { name, description, image, priceETH } = listing;

  const [imageError, setImageError] = useState(image === null);

  const imageErrorHandler = useCallback((e) => {
    setImageError(true);
  }, []);

  let realImageUrl = null;
  if (image) {
    if (image.startsWith("ipfs://")) {
      realImageUrl = "https://ipfs.io/ipfs/" + image.slice(7);
    } else if (image.startsWith("http://") || image.startsWith("https://")) {
      realImageUrl = image;
    }
  }

  return (
    <Panel className={`${styles.card} ${stylesForm.thin}`}>
      <div className={`${stylesForm.title} ${unbounded6.className}`}>
        {name}
      </div>
      {imageError ? (
        <div className={styles.cardImage}>
          <ImageProhibitedRegular className={styles.cardImageError} />
        </div>
      ) : (
        <img
          src={realImageUrl}
          alt={description}
          className={styles.cardImage}
          onError={imageErrorHandler}
        />
      )}
      <div className={styles.cardPrice}>{priceETH} ETH</div>
      <div className={stylesForm.subtle}>{description}</div>
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

  const { getAvailableListings, isReady, contractProviderRef } = useContext(
    AnonymousContractContext
  );

  const prepareListings = useCallback(async () => {
    let activeListings = await getAvailableListings();

    for await (const listing of getNFTInfoGenerator(
      activeListings,
      contractProviderRef.current
    )) {
      setListings((listings) =>
        Object.assign({}, listings, {
          [listing.id]: listing,
        })
      );
    }
  }, [getAvailableListings, contractProviderRef]);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    prepareListings();
  }, [isReady, prepareListings]);

  let listingsArray = [];

  for (const tokenId in listings) {
    listingsArray.push(listings[tokenId]);
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
