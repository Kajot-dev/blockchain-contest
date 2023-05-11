import styles from "@styles/ShiningImage.module.css";
import Link from "next/link";

export default function ShiningImage({ width, height, dataMask }) {
    return (
        <div data-mask={dataMask} className={styles.image} style={{
            width: width,
            height: height,
        }}/>
    )
}