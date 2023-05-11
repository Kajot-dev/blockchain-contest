import styles from "@styles/NavBar.module.css";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";
import ShiningImage from "./ShiningImage";
import { useContext, useState, useEffect } from "react";
import UserContext from "../scripts/UserContext";
import { Roboto_Condensed } from "next/font/google";
const roboto = Roboto_Condensed({ subsets: ["latin"], weight: "400" });
const navbarTransparentThreshold = 40; // px

// button = "wallet" | "panel" | "profile" | "none"
export default function NavBar({
  overrideTransparent = null,
  displayConnectButton = true,
}) {
  const { userType, setUserType } = useContext(UserContext);
  const [isTransparent, setIsTransparent] = useState(
    overrideTransparent ?? true
  );

  function handleScroll() {
    if (window.scrollY > navbarTransparentThreshold) {
      setIsTransparent(false);
    } else {
      setIsTransparent(true);
    }
  }

  //add event listener for scroll to window
  useEffect(() => {
    if (overrideTransparent !== null) {
      setIsTransparent(overrideTransparent);
      return;
    } else {
      setIsTransparent(window.scrollY <= navbarTransparentThreshold);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleSwitchUser = (e) => {
    e.preventDefault();
    if (userType === "consumer") {
      setUserType("retailer");
    } else {
      setUserType("consumer");
    }
  };

  return (
    <header
      className={`${styles.header} ${isTransparent ? styles.transparent : ""} ${
        roboto.className
      }`}
    >
      <div className={styles.logoSection}>
        <Link
          href="/"
          className={styles.logoLink}
          style={{
            width: "100px",
          }}
        >
          <ShiningImage width="auto" height="100%" dataMask="/logo.svg" />
        </Link>
        <Link
          href="about:blank"
          className={styles.navLink}
          onClick={handleSwitchUser}
        >
          Switch user
        </Link>
        <div className={styles.userText}>
          User type:{" "}
          <span className={styles.userType}>{userType ? userType : "-"}</span>
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
