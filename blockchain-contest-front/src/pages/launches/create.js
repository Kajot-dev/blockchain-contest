import CreateLaunchPanel from "@/components/CreateLaunchPanel";
import NavBar from "@/components/NavBar";
import { Roboto_Condensed } from "next/font/google";
import { RetailerContractProvider } from "@/scripts/contractInteraction/RetailerContractContext";
const roboto = Roboto_Condensed({ subsets: ["latin"], weight: "400" });

export default function CreateLaunch() {
  return (
    <>
      <NavBar displayWalletButton={false} />
      <main className="">
        <div className="fill-bg">
          <div className="fill magic-bg" />
        </div>
        <RetailerContractProvider>
          <CreateLaunchPanel className={roboto.className} />
        </RetailerContractProvider>
      </main>
    </>
  );
}
