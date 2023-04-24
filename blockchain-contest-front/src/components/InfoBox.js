import styles from '@/styles/InfoBox.module.css'
import { Info24Regular } from '@fluentui/react-icons'

export default function InfoBox({ text = "" }) {
    return (
        <div className={styles.infoBox}>
            <Info24Regular/>
            <div>
                {text}
            </div>
        </div>
    )
}