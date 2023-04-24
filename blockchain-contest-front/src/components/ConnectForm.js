import styles from "@styles/ConnectForm.module.css";
import { useMetaMask } from "metamask-react";
import { useState } from "react";
import { Roboto_Condensed } from "next/font/google";
import { PulseLoader } from "react-spinners";
import { InfoBox, ErrorBox } from "./Boxes";
import MetaMaskAvatar from "./MetaMaskAvatar";
import Link from "next/link";
const roboto = Roboto_Condensed({ subsets: ["latin"], weight: "400" });

export default function ConnectForm() {
  return (
    <div className={`${styles.connectForm} ${roboto.className}`}>
      <div className={styles.title}>Connect your wallet</div>
      <FormContents />
    </div>
  );
}

function FormContents() {

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { status, account, chainId, connect, switchChain } = useMetaMask();

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

  const handleConnectClick = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await connect();
      setErrorMsg("");
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setIsProcessing(false);
    }
  }

  switch (status) {
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
    case "initializing":
      return (
        <div>
          <PulseLoader color="var(--accent-color)" size={10} />
        </div>
      );
    case "notConnected":
      return (
        <>
          <div className="side-margin">
            <InfoBox text="Please connect yout wallet using metamask" />
          </div>
          <div className="side-margin">
            <ErrorBox text={errorMsg} />
          </div>
          <button className={styles.formBtn} onClick={handleConnectClick}>
            {isProcessing ? (<PulseLoader color="currentColor" size={7} />) : ("Connect")}
          </button>
        </>
      );
    case "connected":
      if (chainId !== "0x1") {
        return (
          <>
            <div className="side-margin">
              <InfoBox text="Our app uses Etherum mainnet" />
            </div>
            <button className={styles.formBtn} onClick={handleSwitchClick}>Switch to mainnet</button>
          </>
        );
      } else {
        return ( 
          <>
          <div className="side-margin">
            <InfoBox text="You are all set!" />
          </div>
          <MetaMaskAvatar address={account} size={75} />
          <Link href="/">
            <button className={styles.formBtn}>Explore</button>
          </Link>
        </>
        )
      }
  }
}