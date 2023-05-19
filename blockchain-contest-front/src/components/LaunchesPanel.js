import { Panel, OutlineButton, Button, TextField } from "@/components/Forms";
import { PulseLoader } from "react-spinners";
import { SearchRegular, ImageProhibitedRegular } from "@fluentui/react-icons";
import { Unbounded } from "next/font/google";
import { useEffect, useState, useContext, useCallback, useMemo, useRef } from "react";
import { AnonymousContractContext } from "@/scripts/contractInteraction/AnonymousContractContext";
import { ConsumerContractContext } from "@/scripts/contractInteraction/ConsumerContractContext";
import { getNFTInfoGenerator } from "@/scripts/contractInteraction/contractUtils";
import { PopupContext } from "@/scripts/PopupContext";

import styles from "../styles/Launches.module.css";
import stylesForm from "../styles/Forms.module.css";
import stylesPopup from "../styles/Popup.module.css";
import { formatEther, parseEther } from "ethers";

const unbounded6 = Unbounded({ subsets: ["latin"], weight: "600" });

function ListingCard({ listing, refreshFunc }) {
  const { name, description, image, priceWei, properties: listingProperties } = listing;
  const traitType = listingProperties.traitType;
  const traitValue = listingProperties.traitValue;
  const priceETH = formatEther(listing.priceWei);

  const { createPopup, closePopup } = useContext(PopupContext);
  const { buyNft } = useContext(AnonymousContractContext);

  const [imageError, setImageError] = useState(image === null);

  const imageErrorHandler = useCallback((e) => {
    setImageError(true);
  }, []);

  const getImageUrl = useCallback(() => {
    let realImageUrl = null;
    if (image) {
      if (image.startsWith("ipfs://")) {
        realImageUrl = "https://ipfs.io/ipfs/" + image.slice(7);
      } else if (image.startsWith("http://") || image.startsWith("https://")) {
        realImageUrl = image;
      }
    }
    return realImageUrl;
  }, [image]);

  const definiteBuyHandler = useCallback(async () => {
    try {
      await buyNft(listing.id, listing.priceWei);
      refreshFunc();
    } catch (e) {
      console.error(e);
    } finally {
      closePopup();
    }
  }, [buyNft, closePopup, listing, refreshFunc]);

  const buyButtonHandler = useCallback(() => {
    createPopup("Buy NFT", [
      <div className={stylesPopup.content} key="content">
        <img className={styles.popupImage} src={getImageUrl()} alt={listing.description} />
        <div className={styles.popupInfo}>
          <div className={styles.popupNotice}>You are about to buy</div>
          <div className={unbounded6.className}>{name}</div>
          <div
            className="flexRow"
            style={{
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <div className={stylesForm.subtle}>for:</div>
            <div className={stylesForm.emphasize}>{priceETH} ETH</div>
          </div>
        </div>
      </div>,
      <div className={stylesPopup.footer} key="footer">
        <Button onClick={definiteBuyHandler}>Buy</Button>
      </div>,
    ]);
  }, [createPopup, definiteBuyHandler, getImageUrl, listing.description, name, priceETH]);

  return (
    <Panel className={`${styles.card} ${stylesForm.thin}`}>
      <div className={`${stylesForm.title} ${unbounded6.className}`}>{name}</div>
      {imageError ? (
        <div className={styles.cardImage}>
          <ImageProhibitedRegular className={styles.cardImageError} />
        </div>
      ) : (
        <img src={getImageUrl()} alt={description} className={styles.cardImage} onError={imageErrorHandler} />
      )}
      <div className={styles.cardPrice}>{priceETH} ETH</div>
      <div className={stylesForm.subtle}>{description}</div>
      <div>
        {traitType && traitValue
          ? [
              <span className={stylesForm.subtle} key="traitType">
                {traitType}
                {": "}
              </span>,
              <span className={stylesForm.emphasize} key="traitValue">
                {traitValue}
              </span>,
            ]
          : "---"}
      </div>
      <OutlineButton onClick={buyButtonHandler}>Buy</OutlineButton>
    </Panel>
  );
}

function CardGrid({ listings = [], placeholder = null, refreshFunc }) {
  const placeholderMemo = useMemo(() => {
    return <div className={styles.placeholder}>{placeholder}</div>;
  }, [placeholder]);

  return (
    <div className={styles.cardContainer}>
      {listings.length > 0
        ? listings.map((listing) => <ListingCard key={listing.id} listing={listing} refreshFunc={refreshFunc} />)
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
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  //field handlers
  const searchTextHandler = useCallback((e) => {
    let parsedVal = e.target.value.trim().toLowerCase();
    setSearchText(parsedVal);
  }, []);

  const minPriceHandler = useCallback((e) => {
    setMinPrice(parseEther(e.target.value));
  }, []);

  const maxPriceHandler = useCallback((e) => {
    setMaxPrice(parseEther(e.target.value));
  }, []);

  const { getAvailableListings, isReady, contractProviderRef } = useContext(AnonymousContractContext);

  const prepareListings = useCallback(async () => {
    try {
      setCardPlaceholder(loadingComp);
      let activeListings = await getAvailableListings();

      for await (const listing of getNFTInfoGenerator(activeListings, contractProviderRef.current)) {
        if (listing.time * 1000n > BigInt(Date.now())) continue;
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
    if ((!Number.isNaN(minPrice) && listing.priceETH < minPrice) || (!Number.isNaN(maxPrice) && listing.priceETH > maxPrice)) {
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
        {"Ready "}
        <span className={styles.emphasize}>2</span>
        {" be "}
        <span className={styles.emphasize}>Forged</span>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.contentHeader}>
          <div className={styles.priceRange}>
            <span>Price:</span>
            <div className={styles.narrowField}>
              <TextField placeholder="0.00" desc="From" replaceRegex={/[^0-9.]/g} onChange={minPriceHandler} />
            </div>
            <span>-</span>
            <div className={styles.narrowField}>
              <TextField placeholder="10.00" desc="To" replaceRegex={/[^0-9.]/g} onChange={maxPriceHandler} />
            </div>
          </div>
          <div className={styles.wideField}>
            <TextField placeholder="" desc="Search" FluentIcon={SearchRegular} onChange={searchTextHandler} />
          </div>
        </div>
        <CardGrid placeholder={cardPlaceholder} listings={listingsArray} refreshFunc={prepareListings} />
      </div>
    </div>
  );
}
