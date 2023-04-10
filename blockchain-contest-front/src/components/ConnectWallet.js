import styles from "../styles/ConnectWallet.module.scss";
import Link from "next/link";

export default function ConnectWallet() {
    return (
      <div>
        <Link href="/connect">
          <button className={styles.walletBtn}>
          Connect wallet
          </button>
        </Link>
      </div>
    )
}