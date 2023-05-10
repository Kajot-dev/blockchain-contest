import styles from "@/styles/Table.module.css";
import stylesForm from "@/styles/Forms.module.css";

export default function Table({
  headers = [],
  data = [],
  noElements = null,
  noElementsClassName = "",
  noElementsStyle = {},
  ...props
}) {
  return (
    <>
      <div className={`flexCol ${styles.listContainer}`} {...props}>
        <div className={styles.listTable}>
          <div className={styles.listHeader}>
            {headers.map((header) => (
              <div
                key={header}
                className={`${styles.listHeaderCell} ${styles.listCell}`}
              >
                {header}
              </div>
            ))}
          </div>
          {data.map((elem) => (
            <div className={styles.listRow} key={elem}>
              {elem.map((item) => (
                <div key={item} className={styles.listCell}>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {data.length === 0 && <div
            className={stylesForm.subtle + " " + noElementsClassName}
            style={noElementsStyle}
          >
            {noElements}
          </div>}
    </>
  );
}
