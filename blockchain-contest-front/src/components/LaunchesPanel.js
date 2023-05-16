import { Panel } from "@/components/Forms"
import { PulseLoader } from "react-spinners"

import styles from '../styles/Launches.module.css'
import stylesForm from '../styles/Form.module.css'


function ListingCard({ listing }) {

  const { symbol, name, imageIpfsUrl } = listing

  return (
    <Panel className={styles.card}>
      <div className={styles.cardContainer}>

      </div>
    </Panel>
  )
}

function CardGrid({ listings = [], placeholder = null}) {

}

export default function LaunchesPanel() {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.cardContainer}>

        </div>
      </div>
    )
}