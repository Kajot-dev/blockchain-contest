import "@/styles/globals.css";
import { MetaMaskProvider } from "metamask-react";
import * as React from "react";

export default function App({ Component, pageProps }) {
  return (
    <MetaMaskProvider>
      <Component {...pageProps} />
    </MetaMaskProvider>
  );
}
