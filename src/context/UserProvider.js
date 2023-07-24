import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import {
  doLoginLocalStorage,
  doLogoutFromLocalStorage,
  getUserFromLocalStorage,
  isAdminUser,
  isLoggedIn,
} from "../auth/HelperAuth";

export const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsLogin(isLoggedIn());
    setUserData(getUserFromLocalStorage());
    setIsAdmin(isAdminUser())
  },[]);

  const doLogin = (data) => {
    doLoginLocalStorage(data);
    setIsLogin(true);
    setUserData(getUserFromLocalStorage());
    setIsAdmin(isAdminUser())
  };
  const doLogout = () => {
    doLogoutFromLocalStorage();
    setIsLogin(false);
    setUserData(null);
    setIsAdmin(false)
  };
  return (
    <UserContext.Provider
      value={{
        userData: userData,
        isLogin: isLogin,
        doLogin: doLogin,
        isAdmin: isAdmin,
        doLogout: doLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
