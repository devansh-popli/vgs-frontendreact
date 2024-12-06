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
    <Navbar
      fixed="bottom"
      bg="light"
      className="zindex2 justify-content-around nav-bottom m-0 p-0 py-2 mobFooter"
    >
      <Nav.Item>
        <Nav.Link
          as={NavLink}
          to="/"
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <AiFillHome size={25} />
          <small className="text-capitalize">Home</small>
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
          style={{ position: "relative" }}
          className="d-flex flex-column align-items-center justify-content-center"
        >

          <div>
            <HiOutlineShoppingBag style={{ fontSize: "28px" }} />{" "}
            <span
              className="themebgColor text-white  position-absolute rounded-circle text-center d-flex align-items-center justify-content-center"
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
          </div>
          <small className="text-capitalize" >Cart</small>
        </Nav.Link>
      </Nav.Item>

      {isLogin ? (
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to={`/users/profile/${userData.userId}`}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <AiOutlineUser size={25} />
            <small className="text-capitalize">Profile</small>
          </Nav.Link>
        </Nav.Item>
      ) : (
        <React.Fragment>
          <Nav.Item>
            <Nav.Link
              as={NavLink}
              to="/login"
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <AiOutlineLogin size={25} />
              <small className="text-capitalize">Login</small>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={NavLink}
              to="/register"
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <AiOutlineUser size={25} />
              <small className="text-capitalize">Signup</small>
            </Nav.Link>
          </Nav.Item>
        </React.Fragment>
      )}

      {isLogin && (
        <Nav.Item>
          <Nav.Link
            onClick={handleLogout}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <AiOutlineLogout size={25} />
            <small className="text-capitalize">Logout</small>
          </Nav.Link>
        </Nav.Item>
      )}
    </Navbar>
  );
};
