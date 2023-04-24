import styles from "@styles/ConnectForm.module.css";
import { useMetaMask } from "metamask-react";
import { useState } from "react";
import { Fira_Mono, Roboto_Condensed } from "next/font/google";
import InfoBox from "./InfoBox";
import Link from "next/link";
const roboto = Roboto_Condensed({ subsets: ["latin"], weight: "400" });

export default function ConnectForm() {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className={`${styles.connectForm} ${roboto.className}`}>
      <div className={styles.title}>Connect your wallet</div>
      <FormContents />
    </div>
  );
}

function FormContents() {
  const { status, account, chainId, connect, switchChain } = useMetaMask();

  let testStatus = "unavailable";

  const handleRefreshClick = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  const handleSwitchClick = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await switchChain({ chainId: "0x1" });
    } finally {
      setIsProcessing(false);
    } 
  };

  switch (testStatus) {
    case "unavailable":
      return (
        <>
          <div className="side-margin">
            <InfoBox text="Our app requires you to install Metamask extension in your browser" />
          </div>
          <Link href="https://metamask.io/" target="_blank">
            <button className={styles.formBtn}>Install Metamask</button>
          </Link>
          <Link href="about:blank" onClick={handleRefreshClick}>
            Refresh page
          </Link>
        </>
      );
    case "connected":
      if (chainId !== 0x1) {
        return (
          <>
            <div className="side-margin">
              <InfoBox text="Our app uses Etherum mainnet" />
            </div>
            <button className={styles.formBtn} onClick={handleSwitchClick}>Switch to mainnet</button>
          </>
        );
      } else {
        return ( //TODO add avatar
          <>
          <div className="side-margin">
            <InfoBox text="You are all set!" />
          </div>
          <Link href="/" target="_blank">
            <button className={styles.formBtn}>Explore</button>
          </Link>
        </>
        )
      }
  }
}
