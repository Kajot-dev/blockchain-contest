import { Panel, OutlineButton } from "./Forms";
import Table from "./Table";
import Link from "next/link";
import { InfoBox } from "./Utils";
import { FormContents as AccountFormContents } from "./ConnectForm";

import { CartRegular } from "@fluentui/react-icons";
import styles from "@styles/Consumer.module.css";
import stylesForm from "@styles/Forms.module.css";


function NftList({ ...props }) {
  return (
    <Panel label="NFT List" {...props}>
      <Table 
        headers={["Symbol", "Name", "Image url"]}
        noElements={"It seems like you don't own any NFTs... But you can always buy some!"}
      />
    </Panel>
  );
}

function AccountInfo({ ...props }) {
  return (
    <Panel label="Account Info" {...props}>
      <AccountFormContents
        displayConnectedGreetings={false}
        displayExploreButton={false}
      />
    </Panel>
  );
}

function LaunchesLink({ ...props }) {
  return (
    <Panel label="Launches" {...props}>
      <InfoBox text="Go to launches to buy some NFTs!"/>
        <Link href="/launches">
          <OutlineButton style={{
            "font-size": "1.5rem",
            "gap": "0.25rem"
          }}
            className="flexRow"  
            >
            <CartRegular/>
            Let&apos;s buy!
            <CartRegular/>
          </OutlineButton>
        </Link>
    </Panel>
  );
}

export default function ConsumerPanel({ className, ...props }) {
  return (
    <div className={`${styles.consumerPanel} ${className}`} {...props}>
      <NftList className={`${styles.nftList} ${stylesForm.form} ${stylesForm.thin}`}/>
      <AccountInfo className={`${styles.accountInfo} ${stylesForm.form}`}/>
      <LaunchesLink className={`${styles.launchesLink} ${stylesForm.form}`}/>
    </div>
  )
}