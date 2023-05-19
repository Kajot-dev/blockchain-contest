import { useMetaMask } from "metamask-react";
import { useState, useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { InfoBox, ErrorBox } from "./Utils";
import { Panel } from "./Forms";
import {
  desiredChainId,
  networkName,
} from "@/scripts/contractInteraction/contractInfo";
import UserContext from "@/scripts/UserContext";
import JazzIcon, { jsNumberForAddress } from "react-jazzicon";
import Link from "next/link";

import styles from "@styles/Forms.module.css";
import { Roboto_Condensed } from "next/font/google";
const roboto = Roboto_Condensed({ subsets: ["latin"], weight: "400" });

const finalLocationRegex = /^\/(?:\w+\/)*(?:\w+\/?)?$/;

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
  const [destination, setDestination] = useState("/");
  const { status, account, chainId, connect, switchChain } = useMetaMask();
  const { userType } = useContext(UserContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let finalLocation = urlParams.get("redirect");
    // validate that final location is valid pathname
    if (finalLocation && finalLocationRegex.test(finalLocation)) {
      setDestination(finalLocation);
    }
  }, []);

  const handleRefreshClick = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  const handleSwitchClick = async (e) => {
    e.preventDefault();
    try {
      await switchChain(desiredChainId);
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
      if (chainId !== desiredChainId) {
        return (
          <>
            <div className={styles.subTitle}>Switch net</div>
            <div className="side-margin">
              <InfoBox text={`Our app uses ${networkName} Net`} />
            </div>
            <button className={styles.formBtn} onClick={handleSwitchClick}>
              Switch to {networkName} Net
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
              <Link href={destination}>
                <button className={styles.formBtn}>Explore</button>
              </Link>
            )}
          </>
        );
      }
  }
}
