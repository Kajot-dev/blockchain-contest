import ConsumerPanel from "@/components/ConsumerPanel";
import NavBar from "@/components/NavBar";
import UserContext from "@/scripts/UserContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Roboto_Condensed } from "next/font/google";
const roboto = Roboto_Condensed({ subsets: ["latin"], weight: "400" });

export default function CreateLaunch() {
  const { userType } = useContext(UserContext);
  const router = useRouter();
  if (userType !== "consumer" && userType !== null) {
    router.push(`/panel/${userType}`);
  }
  return (
    <>
      <NavBar displayConnectButton={false} />
      <main className="">
        <div className="fill-bg">
          <div className="fill magic-bg" />
        </div>
        <ConsumerPanel className={roboto.className} />
      </main>
    </>
  );
}
