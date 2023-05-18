import NavBar from "@/components/NavBar";
import { Unbounded, Roboto_Condensed } from "next/font/google";
import LaunchesPanel from "@/components/LaunchesPanel";
import { AnonymousContractProvider } from "@/scripts/contractInteraction/AnonymousContractContext";
import { useRouter } from "next/router";
import { desiredChainId } from "@/scripts/contractInteraction/contractInfo";
import { useMetaMask } from "metamask-react";
import { useEffect } from "react";

const roboto4 = Roboto_Condensed({ subsets: ["latin"], weight: "400" });

export default function Launches() {
  const { status, chainId } = useMetaMask();
  const router = useRouter();

  // Redirect to connect page if not connected or wrong network
  useEffect(() => {
    if (
      ["unavailable", "notConnected"].includes(status) ||
      (status === "connected" && chainId !== desiredChainId)
    ) {
      router.push(`/connect?redirect=${encodeURIComponent(router.asPath)}`);
    }
  }, [status, chainId, router]);
  return (
    <>
      <NavBar />
      <main>
        <div className="fill-bg">
          <div className="fill magic-bg" />
        </div>
        <AnonymousContractProvider>
          <LaunchesPanel className={roboto4.className} />
        </AnonymousContractProvider>
      </main>
    </>
  );
}
