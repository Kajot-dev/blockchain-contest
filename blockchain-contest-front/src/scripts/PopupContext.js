import { createContext, useState, useCallback, useMemo } from "react";

import { Unbounded, Roboto_Condensed } from "next/font/google";
import { DismissFilled } from "@fluentui/react-icons";
import styles from "@styles/Popup.module.css";

const roboto4 = Roboto_Condensed({ subsets: ["latin"], weight: "400" });
const unbounded6 = Unbounded({ subsets: ["latin"], weight: "600" });

export const PopupContext = createContext({});

function PopupRenderer({
  headerText,
  jsxContent,
  footerElements,
  closeCallback,
}) {
  return (
    <div className={styles.container}>
      <div className={`${styles.popup} ${roboto4.className}`}>
        <div className={`${styles.header} ${unbounded6.className}`}>
          <div className={styles.headerText}>{headerText}</div>
          <button className={styles.closeButton} onClick={closeCallback}>
            <DismissFilled />
          </button>
        </div>
        <div className={styles.content}>{jsxContent}</div>
        <div className={styles.footer}>{footerElements}</div>
      </div>
    </div>
  );
}

export function PopupContextProvider({ children }) {
  const [popup, setPopup] = useState(null);

  const closePopup = useCallback(() => {
    setPopup(null);
  }, []);

  

  const createPopup = useCallback((headerText, jsxContent, footerElements) => {
    setPopup(
      <PopupRenderer
        headerText={headerText}
        jsxContent={jsxContent}
        footerElements={footerElements}
        closeCallback={closePopup}
      />
    );
  }, []);

  const contextValue = useMemo(() => {
    return {
      createPopup,
      closePopup,
    };
  }, [createPopup, closePopup]);

  return (
    <PopupContext.Provider value={contextValue}>
      {children}
      {popup}
    </PopupContext.Provider>
  );
}
