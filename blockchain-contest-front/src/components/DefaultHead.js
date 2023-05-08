import { Head } from "next/document";

export default function DefaultHead() {
  return (
    <Head>
      <title>Minted</title>
      <meta name="description" content="You best site for minting nfts!" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
