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
import { CategoryContext } from "./CategoryContext";

export const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);
//   useEffect(() => {
//     setIsLogin(isLoggedIn());
//     setUserData(getUserFromLocalStorage());
//     setIsAdmin(isAdminUser())
//     setIsBusinessUser(isBusinessUserRole())
//   },[]);

  const addCategories = (data) => {
    setCategories(data);
  };
  return (
    <CategoryContext.Provider
      value={{
        categories: categories,
        addCategories: addCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
