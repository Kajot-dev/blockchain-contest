import styles from "@styles/Logo.module.scss";
import Link from "next/link";

export default function Logo({ width, height }) {
    return (
        <Link href="/">
            <div className={styles.logo} style={{
                width: width || "auto",
                height: height || "100%`",
            }}/>
        </Link>
        
    )
}