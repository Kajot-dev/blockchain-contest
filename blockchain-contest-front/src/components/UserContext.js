import { createContext } from "react";

const userContext = createContext({
  userType: "consumer",
  setUserType: () => {},
});

export default userContext;


