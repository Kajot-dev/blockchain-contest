import { Info24Filled, ErrorCircle24Filled } from "@fluentui/react-icons";

import styles from "@styles/Utils.module.css";

export function InfoBox({ text = "" }) {
  if (text === "") return null;
  return (
    <div className={styles.infoBox}>
      <Info24Filled />
      <div>{text}</div>
    </div>
  );
}

export function ErrorBox({ text = "" }) {
  if (text === "") return null;
  return (
    <div className={styles.errorBox}>
      <ErrorCircle24Filled />
      <div>{text}</div>
    </div>
  );
}