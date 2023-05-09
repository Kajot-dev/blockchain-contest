import { InfoFilled, ErrorCircleFilled } from "@fluentui/react-icons";

import styles from "@styles/Utils.module.css";

export function InfoBox({ text = "" }) {
  if (text === "") return null;
  return (
    <div className={styles.infoBox}>
      <InfoFilled className={styles.icon} />
      <div>{text}</div>
    </div>
  );
}

export function ErrorBox({ text = "" }) {
  if (text === "") return null;
  return (
    <div className={styles.errorBox}>
      <ErrorCircleFilled className={styles.icon} />
      <div>{text}</div>
    </div>
  );
}