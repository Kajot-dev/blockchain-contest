import styles from '@/styles/Boxes.module.css'
import { Info24Regular, ErrorCircle24Regular } from '@fluentui/react-icons'

export function InfoBox({ text = "" }) {
    if (text === "") return null;
    return (
        <div className={styles.infoBox}>
            <Info24Regular/>
            <div>
                {text}
            </div>
        </div>
    )
}

export function ErrorBox({ text = "" }) {
    if (text === "") return null;
    return (
        <div className={styles.errorBox}>
            <ErrorCircle24Regular/>
            <div>
                {text}
            </div>
        </div>
    )
}