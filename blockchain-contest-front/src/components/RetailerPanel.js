import { Panel, OutlineButton } from "./Forms";
import Table from "./Table";
import Link from "next/link";
import { InfoBox } from "./Utils";
import { FormContents as AccountFormContents } from "./ConnectForm";
import { useCallback, useContext, useState, useEffect } from "react";
import { RetailerContractContext } from "@/scripts/contractInteraction/RetailerContractContext";
import { getNFTInfoGenerator } from "@/scripts/contractInteraction/contractUtils";

import { RocketRegular, MoneyRegular } from "@fluentui/react-icons";
import styles from "@styles/Retailer.module.css";
import stylesForm from "@styles/Forms.module.css";
import { formatEther, parseEther } from "ethers";

function CreateLaunch({ ...props }) {
  return (
    <Panel label="Create Launch" {...props}>
      <InfoBox text="Create a new launch to forge your NFTs. You can deploy multiple variants of the same product at once!" />
      <Link href="/launches/create">
        <OutlineButton
          style={{
            fontSize: "1.5rem",
            gap: "0.25rem",
          }}
          className="flexRow"
        >
          <RocketRegular />
          Let&apos;s Forge!
          <RocketRegular />
        </OutlineButton>
      </Link>
    </Panel>
  );
}

function AccountInfo({ ...props }) {
  return (
    <Panel label="Account Info" {...props}>
      <AccountFormContents
        displayConnectedGreetings={false}
        displayExploreButton={false}
      />
    </Panel>
  );
}

function RecentTransactions({ ...props }) {
  return (
    <Panel label="Recent transactions" {...props}>
      <Table
        headers={["Transaction", "Symbol", "Current Owner", "Price"]}
        noElements={"It looks like there are no transactions yet..."}
      />
    </Panel>
  );
}

function NftList({ ...props }) {
  const [mintedListings, setMintedListings] = useState({});

  const { isReady, getMintedListings, contractProviderRef } = useContext(
    RetailerContractContext
  );

  const handleMintedListings = useCallback(async () => {
    setMintedListings({});
    let listings = await getMintedListings();
    for await (const listingInfo of getNFTInfoGenerator(
      listings,
      contractProviderRef.current
    )) {
      let listingIdentifier = `${listingInfo.id}-${listingInfo.name}`;

      setMintedListings((listings) => {
        let singleListingList = [];
        singleListingList.push(listingInfo);
        console.log(listingIdentifier, "singleListingList", singleListingList);
        if (listingIdentifier in listings) {
          singleListingList = listings[listingIdentifier];
        }
        return Object.assign({}, listings, {
          [listingIdentifier]: singleListingList,
        });
      });
    }
  }, [getMintedListings, contractProviderRef]);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    console.log("reading listings");
    handleMintedListings();
  }, [isReady, handleMintedListings]);

  let listingsArray = [];

  console.log("mintedListings", mintedListings);

  for (const listingIdentifier in mintedListings) {
    const similarListingArray = mintedListings[listingIdentifier];
    for (const listing of similarListingArray) {
      //do insertion sort
      let i = 0;
      while (i < listingsArray.length && listingsArray[i].id < listing.id) {
        i++;
      }
      console.log(listing.time);
      listingsArray.splice(i, 0, [
        listing.name,
        listing.description,
        listing.properties.traitType,
        listing.properties.traitValue,
        `${new Date(Number(listing.time) * 1000).toLocaleDateString()}`,
      ]);
    }
  }

  return (
    <Panel label="NFT List" {...props}>
      <Table
        headers={["Name", "Description", "Attribute", "Trait", "Status"]}
        data={listingsArray}
        noElements={
          "It seems like you don't have any more NFTs to sell... But you can always create a new launch!"
        }
      />
    </Panel>
  );
}

function WithdrawBox({ ...props }) {
  const [balanceWei, setBalanceWei] = useState(0n);

  const { isReady, cashOut, getBalance } = useContext(RetailerContractContext);

  const handleBalance = useCallback(async () => {
    let priceWei = await getBalance();
    console.log("priceWei", priceWei)
    setBalanceWei(priceWei);
  }, [getBalance]);

  const handleCashOut = useCallback(async () => {
    await cashOut();
    handleBalance();
  }, [cashOut, handleBalance]);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    handleBalance();
  }, [isReady, handleBalance]);

  return (
    <Panel label="Block Explorer" {...props}>
      <InfoBox text="You can withdraw the ETH that you made selling your NFTs here!" />
      <div>
        Current balance:{" "}
        <span className={stylesForm.emphasize}>
          {formatEther(balanceWei)} ETH
        </span>
      </div>
      <OutlineButton
        style={{
          fontSize: "1.5rem",
          gap: "0.25rem",
          width: "auto",
        }}
        className="flexRow"
        disabled={balanceWei === 0n}
        onClick={handleCashOut}
      >
        <MoneyRegular />
        Cash out!
        <MoneyRegular />
      </OutlineButton>
    </Panel>
  );
}

export default function RetailerPanel({ className = "", ...props }) {
  return (
    <div className={`${styles.retailerPanel} ${className}`} {...props}>
      <AccountInfo className={`${styles.accountInfo} ${stylesForm.form}`} />
      <NftList
        className={`${styles.nftList} ${stylesForm.form} ${stylesForm.thin}`}
      />
      <CreateLaunch
        className={`${styles.newLaunch} ${stylesForm.form} ${stylesForm.center}`}
      />
      <WithdrawBox
        className={`${styles.blockExplorer} ${stylesForm.form} ${stylesForm.center}`}
      />
      <RecentTransactions
        className={`${styles.recentTransactions} ${stylesForm.form}  ${stylesForm.thin}`}
      />
    </div>
  );
}
