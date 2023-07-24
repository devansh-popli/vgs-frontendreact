import { isJwtExpired } from "jwt-check-expiration";
import { getTokenFromLocalStorage } from "../auth/HelperAuth";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

export const useJwtExpiration = () => {
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const { doLogout } = useContext(UserContext);
  const { setCart } = useContext(CartContext);
  useEffect(() => {
    const token = getTokenFromLocalStorage();
    try {
      if (token) {
        if (isJwtExpired(token)) {
          console.log("token is expired");
          Swal.fire({
            title: "Session expired Please Login Again",
            icon: "info",
          });
          doLogout();
          setCart({ items: [] });
          navigate("/login");
          setFlag(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, []);
  return flag;
};
