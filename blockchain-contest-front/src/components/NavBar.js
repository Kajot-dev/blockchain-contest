import styles from "@styles/NavBar.module.css";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";
import Logo from "./Logo";
import { useState } from "react";
import { Roboto_Condensed } from "next/font/google";
const roboto = Roboto_Condensed({ subsets: ["latin"], weight: "400" });

export default function NavBar({ displayWalletButton = true, displayRetailerPanelLink = true}) {

  //TODO: Move retailer panel link to a separate component

  return (
    <header className={`${styles.header} ${roboto.className}`}>
      <Logo width={'100px'}/>
      <div className={styles.navbarRight}>
        {displayRetailerPanelLink && <button className={styles.colorful}><Link href="/retailer">Login as retailer</Link></button>}
        <Link href="/launches">Launches</Link>
        <Link href="/partners">Partners</Link>
        <Link href="/about">About Us</Link>
        {displayWalletButton && <ConnectWallet connectLocation="/connect" />}
      </div>
    </header>
  );
}