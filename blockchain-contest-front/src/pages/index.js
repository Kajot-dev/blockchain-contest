import Head from 'next/head'
import NavBar from '../components/NavBar'

export default function Home() {
  return (
    <>
      <Head>
        <title>Couply</title>
        <meta name="description" content="You best site for coupons!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>

      </main>
    </>
  )
}
