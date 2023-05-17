import { Panel, OutlineButton } from "./Forms";
import Table from "./Table";
import Link from "next/link";
import { InfoBox } from "./Utils";
import { FormContents as AccountFormContents } from "./ConnectForm";
import { useCallback, useContext, useState, useEffect } from "react";
import { RetailerContractContext } from "@/scripts/contractInteraction/RetailerContractContext";

import { RocketRegular, MoneyRegular } from "@fluentui/react-icons";
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

function WithdrawBox({ ...props }) {
  const [balanceETH, setBalanceETH] = useState(0n);

  const { isReady, cashOut, getBalance } = useContext(RetailerContractContext);

  const handleBalance = useCallback(async () => {
    let priceWei = await getBalance();
    let priceETH = priceWei / 10n ** 18n;
    setBalanceETH(priceETH);
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
          {balanceETH.toString()} ETH
        </span>
      </div>
      <OutlineButton
        style={{
          fontSize: "1.5rem",
          gap: "0.25rem",
          width: "auto",
        }}
        className="flexRow"
        disabled={balanceETH === 0n}
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
