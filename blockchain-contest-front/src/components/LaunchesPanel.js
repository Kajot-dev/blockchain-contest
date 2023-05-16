import { Panel, OutlineButton, TextField } from "@/components/Forms";
import { PulseLoader } from "react-spinners";
import { SearchRegular } from "@fluentui/react-icons";
import { Unbounded } from "next/font/google";

import styles from "../styles/Launches.module.css";
import stylesForm from "../styles/Forms.module.css";
const unbounded6 = Unbounded({ subsets: ["latin"], weight: "600" });

function ListingCard({ listing }) {
  const { symbol, name, imageIpfsUrl, priceETH } = listing;

  return (
    <Panel className={`${styles.card} ${stylesForm.thin}`}>
      <div className={`${stylesForm.title} ${unbounded6.className}`}>
        {symbol}
      </div>
      <img src={imageIpfsUrl} alt={name} className={styles.cardImage} />
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
            <ListingCard key={listing.symbol} listing={listing} />
          ))
        : placeholder}
    </div>
  );
}

export default function LaunchesPanel({ className = "" }) {
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
        <CardGrid
          placeholder={<PulseLoader />}
          listings={[
            {
              symbol: "KRW",
              name: "Krew, pot i łzy",
              imageIpfsUrl:
                "https://ipfs.io/ipfs/bafybeihfqpm4gdi44kzrl5yq3p2asgn3sgabse42ds46lqpl3wxug3hf7q/nft.jpeg",
              priceETH: "0.0001",
            },
          ]}
        />
      </div>
    </div>
  );
}
