import NavBar from "../components/NavBar";
import { Unbounded, Roboto_Condensed } from "next/font/google";

const roboto4 = Roboto_Condensed({ subsets: ["latin"], weight: "400" });
const unbounded6 = Unbounded({ subsets: ["latin"], weight: "600" });

export default function launches() {
  return (
    <>
      <NavBar />
      <main>
        <div className="fill-bg">
          <div className="fill magic-bg" />
        </div>
      </main>
    </>
  );
}
