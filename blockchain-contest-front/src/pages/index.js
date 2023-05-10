import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";
import { Unbounded } from "next/font/google";
import { Roboto_Condensed } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";

const roboto4 = Roboto_Condensed({ subsets: ["latin"], weight: "400" });
const unbounded6 = Unbounded({ subsets: ["latin"], weight: "600" });

export default function Home() {
  const [partnerSvgs, setPartnerSvgs] = useState([]);

  useEffect(() => {
    async function fetchPartnerSvgs() {
      const res = await fetch("/api/partnerSvgs");
      const data = await res.json();
      setPartnerSvgs(data.partnerSvgs);
    }

    fetchPartnerSvgs();
  }, []);

  return (
    <>
      <NavBar transparent={true} />
      <main className={`${styles.home}`}>
        <div className="fill-bg">
          <div className="fill magic-bg" />
        </div>
        <section className={`${styles.heroSection} ${unbounded6.className}`}>
          <div className={`${styles.heroContainer}`}>
            <span>We launch NFTs that are meant</span>
            <span> to be forged</span>
          </div>
        </section>
        <section className={`${styles.partners}`}>
          <div className={`${styles.partnersContainer}`}>
            {partnerSvgs.map((svgName) => (
              <Image className={`${styles.logo}`} key={svgName} src={`/partners/${svgName}`} width={50} height={50} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
