import '@/styles/globals.css'
import { MetaMaskProvider } from "metamask-react"

export default function App({ Component, pageProps }) {
  return (
    <MetaMaskProvider>
      <Component {...pageProps} />
    </MetaMaskProvider>
  )
}
