import styles from "@/styles/Utils.module.css";
import { Info24Regular, ErrorCircle24Regular } from "@fluentui/react-icons";

export function InfoBox({ text = "" }) {
  if (text === "") return null;
  return (
    <div className={styles.infoBox}>
      <Info24Regular />
      <div>{text}</div>
    </div>
  );
}

export function ErrorBox({ text = "" }) {
  if (text === "") return null;
  return (
    <div className={styles.errorBox}>
      <ErrorCircle24Regular />
      <div>{text}</div>
    </div>
  );
}

export function Button({ interior, onClick }) {
  if (interior == "" || interior == undefined || interior == null) return null;
  return (
    <button className={styles.formBtn} onClick={onClick}>
      <div>{interior}</div>
    </button>
  );
}
