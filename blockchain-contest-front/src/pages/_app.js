import "@/styles/globals.css";
import { MetaMaskProvider } from "metamask-react";
import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Unbounded",
      textTransform: "none",
      fontSize: 16,
    },
  },
  palette: {
    mode: "dark",
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <MetaMaskProvider>
        <Component {...pageProps} />
      </MetaMaskProvider>
    </ThemeProvider>
  );
}
