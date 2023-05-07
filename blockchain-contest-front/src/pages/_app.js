import "@/styles/globals.css";
import "@/styles/react-datepicker.scss";
import { MetaMaskProvider } from "metamask-react";
import { useState, useEffect, useMemo } from "react";
import UserContext from "@/components/UserContext";

export default function App({ Component, pageProps }) {

  const [userType, setUserType] = useState("consumer");
  const userContextData = useMemo(() => ({ userType, setUserType }), [userType]);
  //update local storage when user type changes
  
  //get user type from local storage on page load
  //this useEffect must be run before the one which updates local storage
  useEffect(() => {
    let localUserType = localStorage.getItem("userType");
    if (localUserType) {
      setUserType(localUserType);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userType", userType);
  }, [userType]);
  return (
    <MetaMaskProvider>
      <UserContext.Provider value={userContextData}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </MetaMaskProvider>
  );
}
