import styles from "@styles/ShiningImage.module.css";
import Link from "next/link";

export default function ShiningImage({ width, height, dataMask }) {
  return (
    <div
      className={styles.image}
      style={{
        width: width,
        height: height,
        maskImage: `url(${dataMask})`,
        WebkitMaskImage: `url(${dataMask})`,
      }}
    />
  );
}
