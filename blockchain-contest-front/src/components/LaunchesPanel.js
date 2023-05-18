import { Panel, OutlineButton, TextField } from "@/components/Forms";
import { PulseLoader } from "react-spinners";
import { SearchRegular, ImageProhibitedRegular } from "@fluentui/react-icons";
import { Unbounded } from "next/font/google";
import { useEffect, useState, useContext, useCallback, useMemo } from "react";
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
  const placeholderMemo = useMemo(() => {
    return <div className={styles.placeholder}>{placeholder}</div>;
  }, [placeholder]);

  return (
    <div className={styles.cardContainer}>
      {listings.length > 0
        ? listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        : placeholderMemo}
    </div>
  );
}

export default function LaunchesPanel({ className = "" }) {
  const [listings, setListings] = useState({});

  const loadingComp = useMemo(() => {
    return <PulseLoader color="var(--accent-color)" />;
  }, []);

  const [cardPlaceholder, setCardPlaceholder] = useState(loadingComp);

  //fields for filtering
  const [searchText, setSearchText] = useState("");
  const [minPrice, setMinPrice] = useState(Number.NaN);
  const [maxPrice, setMaxPrice] = useState(Number.NaN);

  //field handlers
  const searchTextHandler = useCallback((e) => {
    let parsedVal = e.target.value.trim().toLowerCase();
    setSearchText(parsedVal);
  }, []);

  const minPriceHandler = useCallback((e) => {
    setMinPrice(parseFloat(e.target.value));
  }, []);

  const maxPriceHandler = useCallback((e) => {
    setMaxPrice(parseFloat(e.target.value));
  }, []);

  const { getAvailableListings, isReady, contractProviderRef } = useContext(
    AnonymousContractContext
  );

  const prepareListings = useCallback(async () => {
    try {
      setCardPlaceholder(loadingComp);
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
      setCardPlaceholder("No listings found");
    } catch (e) {
      console.error(e);
      setCardPlaceholder("Error loading listings");
    }
  }, [getAvailableListings, contractProviderRef, loadingComp]);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    prepareListings();
  }, [isReady, prepareListings]);

  let listingsArray = [];

  for (const tokenId in listings) {
    const listing = listings[tokenId];
    if (
      (!Number.isNaN(minPrice) && listing.priceETH < minPrice) ||
      (!Number.isNaN(maxPrice) && listing.priceETH > maxPrice)
    ) {
      continue;
    } else if (
      searchText !== "" &&
      !listing.name.toLowerCase().includes(searchText) &&
      !listing.description.toLowerCase().includes(searchText)
    ) {
      continue;
    }
    //do insertion sort
    let i = 0;
    while (i < listingsArray.length && listingsArray[i].id < listing.id) {
      i++;
    }
    listingsArray.splice(i, 0, listing);
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
                onChange={minPriceHandler}
              />
            </div>
            <span>-</span>
            <div className={styles.narrowField}>
              <TextField
                placeholder="10.00"
                desc="To"
                replaceRegex={/[^0-9.]/g}
                onChange={maxPriceHandler}
              />
            </div>
          </div>
          <div className={styles.wideField}>
            <TextField
              placeholder="Weird monkey..."
              desc="Search"
              FluentIcon={SearchRegular}
              onChange={searchTextHandler}
            />
          </div>
        </div>
        <CardGrid placeholder={cardPlaceholder} listings={listingsArray} />
      </div>
    </div>
  );
}
