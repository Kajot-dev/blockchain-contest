import { useMetaMask } from "metamask-react";
import { useState, useContext } from "react";
import { PulseLoader } from "react-spinners";
import { InfoBox, ErrorBox } from "./Utils";
import { Panel } from "./Forms";
import UserContext from "@/scripts/UserContext";
import JazzIcon, { jsNumberForAddress } from "react-jazzicon";
import Link from "next/link";

import styles from "@styles/Forms.module.css";
import { Roboto_Condensed } from "next/font/google";
const roboto = Roboto_Condensed({ subsets: ["latin"], weight: "400" });

export default function ConnectForm() {
  return (
    <Panel
      className={`${roboto.className} ${styles.formBox}`}
      label="Connect your wallet"
    >
      <FormContents />
    </Panel>
  );
}

export function FormContents({
  displayExploreButton = true,
  displayConnectedGreetings = true,
}) {
  const [errorMsg, setErrorMsg] = useState("");
  const { status, account, chainId, connect, switchChain } = useMetaMask();
  const { userType } = useContext(UserContext);

  const handleRefreshClick = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  const handleSwitchClick = async (e) => {
    e.preventDefault();
    try {
      await switchChain({ chainId: "0x1" });
    } catch (e) {
      setErrorMsg(e.message);
    }
  };

  const handleConnectClick = async (e) => {
    e.preventDefault();
    try {
      await connect();
      setErrorMsg("");
    } catch (e) {
      setErrorMsg(e.message);
    }
  };

  switch (status) {
    case "unavailable":
      return (
        <>
          <div className={styles.subTitle}>Install metamask</div>
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
    case "connecting":
    case "notConnected":
      return (
        <>
          <div className={styles.subTitle}>Connect</div>
          <div className="side-margin">
            <InfoBox text="Please connect your wallet using metamask" />
          </div>
          <div className="side-margin">
            <ErrorBox text={errorMsg} />
          </div>
          <button className={styles.formBtn} onClick={handleConnectClick}>
            {status === "connecting" ? (
              <PulseLoader color="currentColor" size={7} />
            ) : (
              "Connect"
            )}
          </button>
        </>
      );

    case "connected":
      if (chainId !== "0x1") {
        return (
          <>
            <div className={styles.subTitle}>Switch net</div>
            <div className="side-margin">
              <InfoBox text="Our app uses Etherum mainnet" />
            </div>
            <button className={styles.formBtn} onClick={handleSwitchClick}>
              Switch to mainnet
            </button>
          </>
        );
      } else {
        return (
          <>
            {displayConnectedGreetings && (
              <div className={styles.subTitle}>You&apos;re all set!</div>
            )}
            <JazzIcon diameter={75} seed={jsNumberForAddress(account)} />
            <div className={styles.subtle}>Welcome</div>
            <div className={styles.account}>{account}</div>
            <div>
              User type:{" "}
              <span
                className={styles.account}
                style={{
                  textTransform: "capitalize",
                }}
              >
                {userType}
              </span>
            </div>
            {displayExploreButton && (
              <Link href="/">
                <button className={styles.formBtn}>Explore</button>
              </Link>
            )}
          </>
        );
      }
  }
}
