import { createContext } from "react";

const UserContext = createContext({
  userType: "consumer",
  setUserType: () => {},
});

export default UserContext;


