import Link from "next/link";
import { PulseLoader } from "react-spinners";
import { useState, useEffect, useContext } from "react";
import { useMetaMask } from "metamask-react";
import JazzIcon, { jsNumberForAddress } from 'react-jazzicon'
import UserContext from "./UserContext";

import styles from "@styles/Forms.module.css";
import stylesNavBar from "@styles/NavBar.module.css";

export default function ConnectWallet({ connectLocation }) {

  const [destination, setDestination] = useState(connectLocation);

  const { userType, setUserType } = useContext(UserContext);


  const { status, account, chainId } = useMetaMask();

  useEffect(() => {
    let finalLocation = connectLocation + "?redirect=" + encodeURIComponent(window.location.pathname);
    setDestination(finalLocation);
  }, [connectLocation])

  const getConnect = (text) => {
    return (
      <div>
        <Link href={destination}>
          <button className={styles.outlineBtn}>
            {text}
          </button>
        </Link>
      </div>
      
    )
  }

  if (status === "connected") {
    if (chainId !== "0x1") {
      return getConnect("Switch to mainnet")
    } else { //TODO Add link to account page (for switching wallets)
      return (
        <div >
          <Link 
            href={userType === "retailer" ? "/panel/retailer" : "/panel/consumer"}
            className={`${stylesNavBar.accountContainer} ${stylesNavBar.navLink}`}
          >
            <JazzIcon diameter={35} seed={jsNumberForAddress(account)} />
            <div className={stylesNavBar.accountDesc}>
            {userType === "retailer" ? "Retailer panel" : "User Profile"}
            </div>
          </Link>
        </div>
      )
    }
  } else if (status === "initializing") {
    return (
      <div>
        <PulseLoader color="var(--accent-color)" size={10} />
      </div>
    )
  } else return getConnect("Connect wallet")
}