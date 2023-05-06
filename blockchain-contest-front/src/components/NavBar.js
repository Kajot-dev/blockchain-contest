import styles from "@styles/NavBar.module.css";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";
import Image from "next/image";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Image src="/logo.svg" height={32} width={100} color="white" />
    </div>
  );
};

// button = "wallet" | "panel" | "profile" | "none"
export default function NavBar() {
  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <Logo />
        <div className={styles.switchUser}>SWITCH USER</div>
      </div>
      <div className={styles.navSection}>
        <Link className={styles.launches} href="/launches">
          Launches
        </Link>
        <Link className={styles.zen} href="/zen">
          ZEN
        </Link>
        <div className={styles.navBarButton}>
          <div className={styles.navBarButtonContent}>CONNECT WALLET</div>
        </div>
      </div>
    </header>
  );
}
