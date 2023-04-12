import styles from "@styles/ConnectWallet.module.css";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import { useState, useEffect, useTransition } from "react";
import { useMetaMask } from "metamask-react";
import MetaMaskAvatar from "./MetaMaskAvatar";

export default function ConnectWallet({ connectLocation }) {

  const [destination, setDestination] = useState(connectLocation);

  const [startTransition, isPending] = useTransition();

  const { status, account, chainId, ethereum } = useMetaMask();

  useEffect(() => {
    connectLocation += "?redirect=" + encodeURIComponent(window.location.pathname);
    setDestination(connectLocation)
  })

  switch (status) {
    case "unavailable":
      return (
        <div>
          <Link href="https://metamask.io/" target="_blank">
            <button className={styles.walletBtn}>
              Install Metamask
            </button>
          </Link>
        </div>
      )
    case "notConnected":
      return (
        <div>
          <Link href={destination}>
            <button className={styles.walletBtn}>
              Connect wallet
            </button>
          </Link>
        </div>
      )
    case "connected":
      return (
        // TODO check for proper chain id
        <div>
          <MetaMaskAvatar address={account} size={30} />
        </div>
      )
    default:
      return (
        <div>
          <PulseLoader color="var(--accent-color)" size={10} />
        </div>
      )
  }
}