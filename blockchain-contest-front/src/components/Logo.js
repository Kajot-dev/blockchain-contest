import styles from "@styles/Logo.module.css";
import Link from "next/link";

export default function Logo({ width, height }) {
  return (
    <Link
      href="/"
      className={styles.logoLink}
      style={{
        width: width || "100px",
      }}
    >
      <div
        className={styles.logo}
        style={{
          width: width || "auto",
          height: height || "100%",
        }}
      />
    </Link>
  );
}
