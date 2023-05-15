import NavBar from "../components/NavBar";
import styles from "../styles/Zen.module.css";
import { Unbounded } from "next/font/google";

const unbounded4 = Unbounded({ subsets: ["latin"], weight: "400" });
const unbounded6 = Unbounded({ subsets: ["latin"], weight: "600" });

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <div className="fill-bg">
          <div className={`fill ${styles.gradientBg}`} />
        </div>
        <div className={`${styles.zenText} ${unbounded4.className}`}>
          A <span className={`${unbounded6.className} ${styles.zenEmphasize}`}>Product</span>
          {" for "} <span className={`${unbounded6.className} ${styles.zenEmphasize}`}>Target Customer</span>
          {" that "} <span className={`${unbounded6.className} ${styles.zenEmphasize}`}>Key Value</span>
          {" enabling "} <span className={`${unbounded6.className} ${styles.zenEmphasize}`}>Primary Benefits</span>
          {" unlike "} <span className={`${unbounded6.className} ${styles.zenEmphasize}`}>Alternatives</span>
        </div>
      </main>
    </>
  );
}
