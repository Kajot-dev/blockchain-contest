import styles from "@styles/NavBar.module.scss";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";
import Logo from "./Logo";
import { Roboto_Condensed } from "next/font/google";
const roboto = Roboto_Condensed({ subsets: ["latin"], weight: "400" });

export default function NavBar() {
  return (
    <header className={`${styles.header} ${roboto.className}`}>
      <Logo width={'100px'}/>
      <div className={styles.navbarRight}>
        <Link href="/launches">Launches</Link>
        <Link href="/partners">Partners</Link>
        <Link href="/about">About Us</Link>
        <ConnectWallet />
      </div>
    </header>
  );
}
