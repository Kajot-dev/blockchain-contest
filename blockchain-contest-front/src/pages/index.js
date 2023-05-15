import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";
import { Unbounded } from "next/font/google";
import { Roboto_Condensed } from "next/font/google";
import Image from "next/image";
import ShiningImage from "@/components/ShiningImage";

const roboto4 = Roboto_Condensed({ subsets: ["latin"], weight: "400" });
const unbounded6 = Unbounded({ subsets: ["latin"], weight: "600" });

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
            {partnerSvgs
              ? partnerSvgs.map((svgName) => (
                  <ShiningImage
                    key={svgName}
                    dataMask={`/partners/${svgName}`}
                    width="50px"
                    height="50px"
                  />
                ))
              : null}
          </div>
        </section>
      </main>
    </>
  );
}
