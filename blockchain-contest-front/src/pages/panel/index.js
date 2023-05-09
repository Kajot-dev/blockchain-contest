import NavBar from "@/components/NavBar";
import UserContext from "@/scripts/UserContext";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Panel() {
  const { userType } = useContext(UserContext);
  const router = useRouter();
  if (userType !== null) {
    router.push(`/panel/${userType}`);
  }
  return (
    <>
      <NavBar displayConnectButton={false} />
      <main className="">
        <div className="fill-bg">
          <div className="fill magic-bg" />
        </div>
      </main>
    </>
  );
}
