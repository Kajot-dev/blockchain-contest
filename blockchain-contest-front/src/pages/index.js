import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <NavBar transparent={true} />
      <main className={`${styles.home}`}>
        <div className="fill-bg">
          <div className="fill magic-bg" />
        </div>
        <section className={`${styles.heroSection}`}>
          <div className="container">
            <h1>Blockchain Contest</h1>
          </div>
        </section>
      </main>
    </>
  );
}
