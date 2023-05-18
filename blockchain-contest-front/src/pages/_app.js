import "@/styles/globals.css";
import "@/styles/scrollbar.css";
import "@/styles/react-datepicker.scss";
import Head from "next/head";
import { MetaMaskProvider } from "metamask-react";
import { useState, useEffect, useMemo } from "react";
import UserContext from "@/scripts/UserContext";
import { PopupContextProvider } from "@/scripts/PopupContext";

export default function App({ Component, pageProps }) {
  const [userType, setUserType] = useState(null);
  const userContextData = useMemo(
    () => ({ userType, setUserType }),
    [userType]
  );
  //update local storage when user type changes

  //get user type from local storage on page load
  //this useEffect must be run before the one which updates local storage
  useEffect(() => {
    let localUserType = localStorage.getItem("userType");
    if (
      localUserType &&
      (localUserType === "retailer" || localUserType === "consumer")
    ) {
      setUserType(localUserType);
    } else {
      setUserType("consumer");
    }
  }, []);

  useEffect(() => {
    if (!userType) return;
    localStorage.setItem("userType", userType);
  }, [userType]);
  return (
    <>
      <Head>
        <title>2Forge</title>
        <meta name="description" content="You best site for minting nfts!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MetaMaskProvider>
        <UserContext.Provider value={userContextData}>
          <PopupContextProvider>
            <Component {...pageProps} />
          </PopupContextProvider>
        </UserContext.Provider>
      </MetaMaskProvider>
    </>
  );
}
