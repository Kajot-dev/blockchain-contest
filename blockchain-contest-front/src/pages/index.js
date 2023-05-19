import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";
import { Unbounded, Roboto_Condensed } from "next/font/google";
import ShiningImage from "@/components/ShiningImage";

const roboto4 = Roboto_Condensed({ subsets: ["latin"], weight: "400" });
const unbounded6 = Unbounded({ subsets: ["latin"], weight: "600" });
const unbounded5 = Unbounded({ subsets: ["latin"], weight: "500" });

export async function getStaticProps() {
  const fs = require("fs");
  const path = require("path");
  const partnerSvgs = fs.readdirSync(
    path.join(process.cwd(), "public", "partners")
  );
  return {
    props: {
      partnerSvgs,
    },
  };
}

export default function Home({ partnerSvgs }) {
  return (
    <>
      <NavBar />
      <main className={styles.home}>
        <div className="fill-bg">
          <div className="fill magic-bg" />
        </div>
        <div className={styles.container}>
          <section className={`${styles.heroSection} ${unbounded6.className}`}>
            <div>
              <h1>
                Digitally Minted
                <br />
                Physically Forged
              </h1>
              <span className={`${unbounded5.className}`}>
                Launching unique collectibles ahead of time.
                <br />
                Seamlessly blending the digital and physical worlds.
              </span>
            </div>
            <div className={styles.logoBg} />
          </section>
          <section className={styles.partnersSection}>
            <h2 className={unbounded5.className}>We are partnered with</h2>
            <div className={styles.partnersContainer}>
              {partnerSvgs
                ? partnerSvgs.map((svgName) => (
                    <ShiningImage
                      key={svgName}
                      dataMask={`/partners/${svgName}`}
                      width="64px"
                      height="64px"
                    />
                  ))
                : null}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
