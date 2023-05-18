import ConsumerPanel from "@/components/ConsumerPanel";
import NavBar from "@/components/NavBar";
import UserContext from "@/scripts/UserContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useMetaMask } from "metamask-react";
import { desiredChainId } from "@/scripts/contractInteraction/contractInfo";
import { ConsumerContractProvider } from "@/scripts/contractInteraction/ConsumerContractContext";
import { Roboto_Condensed } from "next/font/google";
const roboto = Roboto_Condensed({ subsets: ["latin"], weight: "400" });

export default function CreateLaunch() {
  const { userType } = useContext(UserContext);
  const { status, chainId } = useMetaMask();
  const router = useRouter();
  useEffect(() => {
    if (
      ["unavailable", "notConnected"].includes(status) ||
      (status === "connected" && chainId !== desiredChainId)
    ) {
      router.push(`/connect?redirect=${encodeURIComponent(router.asPath)}`);
    } else if (userType !== "consumer" && userType !== null) {
      router.push(`/panel/${userType}`);
    }
  }, [userType, status, chainId, router]);

  return (
    <>
      <NavBar displayConnectButton={false} />
      <main>
        <div className="fill-bg">
          <div className="fill magic-bg" />
        </div>
        <ConsumerContractProvider>
          <ConsumerPanel className={roboto.className} />
        </ConsumerContractProvider>
      </main>
    </>
  );
}
