import styles from "@styles/NavBar.module.css";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";
import Image from "next/image";
import Logo from "./Logo";
import { Roboto_Condensed } from "next/font/google";
const roboto = Roboto_Condensed({ subsets: ["latin"], weight: "400" });

// button = "wallet" | "panel" | "profile" | "none"
export default function NavBar({ displayConnectButton = true }) {
  return (
    <header className={`${styles.header} ${roboto.className}`}>
      <div className={styles.logoSection}>
        <Logo />
        <Link href="/zen" className={styles.navLink}>
          Switch user
        </Link>
      </div>
      <div className={styles.navSection}>
        <Link href="/launches" className={styles.navLink}>
          Launches
        </Link>
        <Link href="/zen" className={styles.navLink}>
          ZEN
        </Link>
        {displayConnectButton && <ConnectWallet connectLocation="/connect" />}
      </div>
    </header>
  );
}
