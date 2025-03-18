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
import { FaStore } from "react-icons/fa";
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
      style={{borderTopRightRadius:"14px",borderTopLeftRadius:"14px"}}
      className="zindex2 justify-content-around nav-bottom m-0 p-0  mobFooter"
    >
      <Nav.Item className="itemFooter m-0 -0">
        <Nav.Link
          as={NavLink}
          to="/"
          className="d-flex flex-column align-items-center mt-x"
        >
          <AiFillHome size={25} className="m-0 p-0" />
          <small className="text-capitalize m-0 p-0">Home</small>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="itemFooter">
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
          className="d-flex flex-column align-items-center mt-x"
        >

          <div>
            <HiOutlineShoppingBag style={{ fontSize: "28px" }} />{" "}
            <span
              className="themebgColor text-white  position-absolute rounded-circle text-center d-flex align-items-center justify-content-center"
              style={{
                top: "-8px",
                right: "22px",
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
      <Nav.Item className="itemFooter" style={{position:"relative"}}>
        <Nav.Link
          style={{ borderRadius:"15px",position: "absolute",top:"-10%",left:"50%",  transform: "translate(-50%, -68%)",backgroundColor:"#142449"}}
          as={NavLink}
          
          to={`/store`}
          className="d-flex flex-column align-items-center shadow shadow-lg px-4 py-3"
        >
          <FaStore className="text-white" size={25} />
          <small className="text-capitalize text-white">Store</small>
        </Nav.Link>
      </Nav.Item>
      {isLogin ? (
        <Nav.Item className="itemFooter">
          <Nav.Link
            as={NavLink}
            to={`/users/profile/${userData.userId}`}
            className="d-flex flex-column align-items-center mt-x"
          >
            <AiOutlineUser size={25} />
            <small className="text-capitalize">Profile</small>
          </Nav.Link>
        </Nav.Item>
      ) : (
        <React.Fragment>
          <Nav.Item className="itemFooter">
            <Nav.Link
              as={NavLink}
              to="/login"
              className="d-flex flex-column align-items-center mt-x"
            >
              <AiOutlineLogin size={25} />
              <small className="text-capitalize">Login</small>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="itemFooter">
            <Nav.Link
              as={NavLink}
              to="/register"
              className="d-flex flex-column align-items-center mt-x"
            >
              <AiOutlineUser size={25} />
              <small className="text-capitalize">Signup</small>
            </Nav.Link>
          </Nav.Item>
        </React.Fragment>
      )}

      {isLogin && (
        <Nav.Item className="itemFooter">
          <Nav.Link
            onClick={handleLogout}
            className="d-flex flex-column align-items-center mt-x"
          >
            <AiOutlineLogout size={25} />
            <small className="text-capitalize">Logout</small>
          </Nav.Link>
        </Nav.Item>
      )}
    </Navbar>
  );
};
