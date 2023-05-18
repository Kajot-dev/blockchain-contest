import { createContext, useState, useCallback, useMemo } from "react";

const PopupContext = createContext({});


function PopupRenderer({ jsxContent, footerElements }) {
  
}

export function PopupContextProvider({ children }) {
  const [popup, setPopup] = useState(null);
  const createPopup = useCallback((jsxContent, footerElements) => {
    setPopup(<PopupRenderer jsxContent={jsxContent} footerElements={footerElements} />);
  }, []);

  const contextValue = useMemo(() => {
    return {
      createPopup,
    }
  }, [createPopup]);

  return (
    <PopupContext.Provider value={contextValue}>
      {children}
      {popup}
    </PopupContext.Provider>
  )
}
