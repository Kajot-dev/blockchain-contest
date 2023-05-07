import "@/styles/globals.css";
import "@/styles/react-datepicker.scss";
import { MetaMaskProvider } from "metamask-react";

export default function App({ Component, pageProps }) {
  return (
      <MetaMaskProvider>
        <Component {...pageProps} />
      </MetaMaskProvider>
  );
}
