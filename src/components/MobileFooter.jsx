import React, { useState } from "react";
import { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import {
  AiFillHome,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineLogin,
  AiOutlineLogout,
} from "react-icons/ai";
import { UserContext } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { HiOutlineShoppingBag } from "react-icons/hi";

export const MobileFooter = () => {
  // Assuming you have a state to track the user's login status
  const { isLogin, doLogout, userData } = useContext(UserContext);
  const { showCartSideBar, showCart, setCart, cart } = useContext(CartContext);
  // Function to handle the logout action
  const handleLogout = () => {
    // Perform logout logic here
    // setIsLoggedIn(false);
    doLogout();
  };

  return (
    <Navbar fixed="bottom" bg="light" className="justify-content-around nav-bottom m-0 p-0 py-2 mobFooter">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/">
          <AiFillHome size={25} />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        {/* <Nav.Link as={NavLink}  onClick={() => {
                  showCartSideBar();
                }}>
          {/* <AiOutlineShoppingCart size={25} />
           
        </Nav.Link> */}
        <Nav.Link
          onClick={() => {
            showCartSideBar();
          }}
          as={NavLink}
          style={{  position: "relative" }}
        >
          <HiOutlineShoppingBag style={{ fontSize: "28px" }} />{" "}
          <span
            className="bg-success text-white  position-absolute rounded-circle text-center d-flex align-items-center justify-content-center"
            style={{
              top: "-8px",
              right: "-2px",
              width: "20px",
              height: "20px",
            }}
          >
            {" "}
            {cart.items?.length}
          </span>
        </Nav.Link>
      </Nav.Item>

      {isLogin ? (
        <Nav.Item>
          <Nav.Link as={NavLink} to={`/users/profile/${userData.userId}`}>
            <AiOutlineUser size={25} />
          </Nav.Link>
        </Nav.Item>
      ) : (
        <React.Fragment>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/login">
              <AiOutlineLogin size={25} />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/register">
              <AiOutlineUser size={25} />
            </Nav.Link>
          </Nav.Item>
        </React.Fragment>
      )}

      {isLogin && (
        <Nav.Item>
          <Nav.Link onClick={handleLogout}>
            <AiOutlineLogout size={25} />
          </Nav.Link>
        </Nav.Item>
      )}
    </Navbar>
  );
};
