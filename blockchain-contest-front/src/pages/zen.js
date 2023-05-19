import { useEffect } from "react";
import NavBar from "../components/NavBar";
import styles from "../styles/Zen.module.css";
import { Unbounded } from "next/font/google";

const unbounded4 = Unbounded({ subsets: ["latin"], weight: "400" });
const unbounded6 = Unbounded({ subsets: ["latin"], weight: "600" });

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add(styles.scrollType);
    return () => {
      document.documentElement.classList.remove(styles.scrollType);
    };
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
            A{" "}
            <span className={`${unbounded6.className} ${styles.zenEmphasize}`}>
              Web 3.0 Platform
            </span>
          </div>
          <div>{" for "}</div>
          <div className={styles.scrollStop}>
            <span className={`${unbounded6.className} ${styles.zenEmphasize}`}>
              Unique Physical Collectibles Lovers
            </span>
          </div>
          <div>{" that "}</div>
          <div className={styles.scrollStop}>
            <span className={`${unbounded6.className} ${styles.zenEmphasize}`}>
              Facilitates Retailers to Launch Collections
            </span>
          </div>
          <div>{" enabling, "}</div>
          <div className={styles.scrollStop}>
            <span className={`${unbounded6.className} ${styles.zenEmphasize}`}>
              Secure pre-release Trading, assured Authenticity for Various
              Products
            </span>
          </div>
          <div>{" unlike "}</div>
          <div className={styles.scrollStop}>
            <span className={`${unbounded6.className} ${styles.zenEmphasize}`}>
              brand-specific RTFKT
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
