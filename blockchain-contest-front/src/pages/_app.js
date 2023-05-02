import "@/styles/globals.css";
import { MetaMaskProvider } from "metamask-react";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: true,
});

export default function App({ Component, pageProps }) {
  return (
    <MetaMaskProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </MetaMaskProvider>
  );
}
