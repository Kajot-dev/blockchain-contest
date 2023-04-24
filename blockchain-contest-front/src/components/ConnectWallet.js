import styles from "@styles/ConnectWallet.module.css";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import { useState, useEffect, useTransition } from "react";
import { useMetaMask } from "metamask-react";
import MetaMaskAvatar from "./MetaMaskAvatar";

export default function ConnectWallet({ connectLocation }) {

  const [destination, setDestination] = useState(connectLocation);


  const { status, account, chainId } = useMetaMask();

  useEffect(() => {
    let finalLocation = connectLocation + "?redirect=" + encodeURIComponent(window.location.pathname);
    setDestination(finalLocation);
  }, [connectLocation])

  const getConnect = (text) => {
    return (
      <div>
        <Link href={destination}>
          <button className={styles.walletBtn}>
            {text}
          </button>
        </Link>
      </div>
      
    )
  }

  if (status === "connected") {
    if (chainId !== "0x1") {
      return getConnect("Switch to mainnet")
    } else { //TODO Add link to account page (for switching wallets)
      return (
        <div>
          <MetaMaskAvatar address={account} size={30} />
        </div>
      )
    }
  } else if (status === "initializing") {
    return (
      <div>
        <PulseLoader color="var(--accent-color)" size={10} />
      </div>
    )
  } else return getConnect("Connect wallet")
}