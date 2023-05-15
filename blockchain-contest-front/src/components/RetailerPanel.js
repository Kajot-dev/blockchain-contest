import { Panel, OutlineButton } from "./Forms";
import Table from "./Table";
import Link from "next/link";
import { InfoBox } from "./Utils";
import { FormContents as AccountFormContents } from "./ConnectForm";

import { RocketRegular, SearchRegular } from "@fluentui/react-icons";
import styles from "@styles/Retailer.module.css";
import stylesForm from "@styles/Forms.module.css";

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
  return (
    <Panel label="NFT List" {...props}>
      <Table
        headers={["Symbol", "Name", "Number of items", "Status"]}
        noElements={
          "It seems like you don't have any more NFTs to sell... But you can always create a new launch!"
        }
      />
    </Panel>
  );
}

function BlockExplorer({ ...props }) {
  return (
    <Panel label="Block Explorer" {...props}>
      <InfoBox text="Go to block explorer to see the details about transactions!" />
      <Link href="https://etherscan.io/">
        <OutlineButton
          style={{
            fontSize: "1.5rem",
            gap: "0.25rem",
          }}
          className="flexRow"
        >
          <SearchRegular />
          Go to Block Explorer
          <SearchRegular />
        </OutlineButton>
      </Link>
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
      <BlockExplorer
        className={`${styles.blockExplorer} ${stylesForm.form} ${stylesForm.center}`}
      />
      <RecentTransactions
        className={`${styles.recentTransactions} ${stylesForm.form}  ${stylesForm.thin}`}
      />
    </div>
  );
}
