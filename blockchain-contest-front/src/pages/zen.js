import { useEffect } from "react";
import NavBar from "../components/NavBar";
import styles from "../styles/Zen.module.css";
import { Unbounded } from "next/font/google";

const unbounded4 = Unbounded({ subsets: ["latin"], weight: "400" });
const unbounded6 = Unbounded({ subsets: ["latin"], weight: "600" });

export default function Home() {

  useEffect(() => {
    console.log(document.documentElement)
    document.documentElement.classList.add(styles.scrollType)
    return () => {
      document.documentElement.classList.remove(styles.scrollType)
    }
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <div className="fill-bg">
          <div className={`fill ${styles.gradientBg}`} />
        </div>
        <div className={`${styles.zenText} ${unbounded4.className}`}>
          <div className={styles.scrollStop}>
            A <span className={`${unbounded6.className} ${styles.zenEmphasize}`}>Platform with NFTs Launches</span>
          </div>
          <div>
            {" for "}
          </div>
          <div className={styles.scrollStop}>
            <span className={`${unbounded6.className} ${styles.zenEmphasize}`}>Unique Physical Collectibles Enthusiasts, Traders and Investors</span>
          </div>
          <div>
            {" that "}
          </div>
          <div className={styles.scrollStop}>
            <span className={`${unbounded6.className} ${styles.zenEmphasize}`}>Undertakes Partnerships with Stores and Retailers assuring Authenticity</span>
          </div>
          <div>
            {" enabling, "}
          </div>
          <div className={styles.scrollStop}>
            <span className={`${unbounded6.className} ${styles.zenEmphasize}`}>Pre-release trading, and providing broader B2B Services</span>
          </div>
          <div className={styles.scrollStop}>
            {" unlike "} <span className={`${unbounded6.className} ${styles.zenEmphasize}`}>RTFKT</span>
          </div>
        </div>
      </main>
    </>
  );
}
