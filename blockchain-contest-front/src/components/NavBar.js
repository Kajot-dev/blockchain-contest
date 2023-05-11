import styles from "@styles/NavBar.module.css";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";
import Logo from "./Logo";
import { useContext } from "react";
import UserContext from "../scripts/UserContext";
import { Roboto_Condensed } from "next/font/google";
const roboto = Roboto_Condensed({ subsets: ["latin"], weight: "400" });

// button = "wallet" | "panel" | "profile" | "none"
export default function NavBar({ transparent = false, displayConnectButton = true }) {
  const { userType, setUserType } = useContext(UserContext);

  const handleSwitchUser = (e) => {
    e.preventDefault();
    if (userType === "consumer") {
      setUserType("retailer");
    } else {
      setUserType("consumer");
    }
  };

  return (
    <header className={`${styles.header} ${transparent ? styles.transparent : ""} ${roboto.className}`}>
      <div className={styles.logoSection}>
        <Logo />
        <Link href="about:blank" className={styles.navLink} onClick={handleSwitchUser}>
          Switch user
        </Link>
        <div className={styles.userText}>
          User type: <span className={styles.userType}>{userType ? userType : "-"}</span>
        </div>
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
