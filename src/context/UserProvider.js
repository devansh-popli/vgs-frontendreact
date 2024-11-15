import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import {
  doLoginLocalStorage,
  doLogoutFromLocalStorage,
  getUserFromLocalStorage,
  isAdminUser,
  isBusinessUserRole,
  isLoggedIn,
} from "../auth/HelperAuth";

export const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBusinessUser, setIsBusinessUser] = useState(false);
  useEffect(() => {
    setIsLogin(isLoggedIn());
    setUserData(getUserFromLocalStorage());
    setIsAdmin(isAdminUser())
    setIsBusinessUser(isBusinessUserRole())
  },[]);

  const doLogin = (data) => {
    doLoginLocalStorage(data);
    setIsLogin(true);
    setUserData(getUserFromLocalStorage());
    setIsAdmin(isAdminUser())
    setIsBusinessUser(isBusinessUserRole())
  };
  const doLogout = () => {
    doLogoutFromLocalStorage();
    setIsLogin(false);
    setUserData(null);
    setIsAdmin(false)
    setIsBusinessUser(false)
  };
  return (
    <UserContext.Provider
      value={{
        userData: userData,
        isLogin: isLogin,
        doLogin: doLogin,
        isAdmin: isAdmin,
        isBusinessUser:isBusinessUser,
        doLogout: doLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
