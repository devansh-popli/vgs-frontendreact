import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { CartContextProvider } from "../../context/CartContextProvider";
import { CartContext } from "../../context/CartContext";
import { CartSideBar } from "../../pages/CartSideBar";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { getCategories } from "../../services/CategoryService";
import { toast } from "react-toastify";
const CustomNavbar = () => {
  const userContext = useContext(UserContext);
  const { showCartSideBar, showCart, setCart } = useContext(CartContext);

  const [expanded, setExpanded] = useState(false);

  const logOut = () => {
    userContext.doLogout();
    setCart({ items: [] });
  };
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories(0,1000)
      .then((data) => {
        // console.log(data,"cat")
        setCategories(data.content);
      })
      .catch((error) => {
        toast.error("error while getting categories");
      });
  }, []);
  const { cart } = useContext(CartContext);
  return (
    <Navbar
      expanded={expanded}
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="sticky-top"
    >
      <Container >
        <Navbar.Brand  onClick={() => setExpanded(false)}
          as={NavLink}
          to={"/"}
          className="d-flex justify-content-center align-items-center"
        >
          <img
            src="../../assets/logo.png"
            alt="logo"
            height={25}
            width={25}
          />
          <span  className="ms-2">ElectroStore</span>
        </Navbar.Brand>
        {/* <span fluid className="d-flex"> */}
        <div className="d-flex">
          <div className="nav-dn1">
            <div className=" d-flex flex-column justify-content-center align-items-center">
              <Nav.Link
                onClick={() => {
                  showCartSideBar();
                  setExpanded(false);
                }}
                as={NavLink}
                style={{ height: "30px", position: "relative" }}
              >
                <HiOutlineShoppingBag className="text-white" style={{fontSize:"28px"}} />{" "}
                <span
                  className="bg-success text-white  position-absolute rounded-circle text-center d-flex align-items-center justify-content-center"
                  style={{
                    top: "-7px",
                    right: "0.5px",
                    width: "20px",
                    height: "20px",
                  }}
                >
                  {" "}
                  {cart.items?.length}
                </span>
              </Nav.Link>
            </div>
          </div>
          <Navbar.Toggle
          className="ms-3"
            onClick={() => setExpanded(expanded ? false : true)}
            aria-controls=" responsive-navbar-nav "
          />
        </div>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto navv2">
            {/* <Nav.Link
              onClick={() => setExpanded(false)}
              as={NavLink}
              to={"/services"}
            >
              Features
            </Nav.Link> */}
            
            <Nav.Link
              onClick={() => setExpanded(false)}
              as={NavLink}
              to={"/about"}
            >
              About
            </Nav.Link>
            <Nav.Link
              onClick={() => setExpanded(false)}
              as={NavLink}
              to={"/contact"}
            >
              ContactUs
            </Nav.Link>
            <Nav.Link
              onClick={() => setExpanded(false)}
              as={NavLink}
              to={"/store"}
            >
              Store
            </Nav.Link>
            <NavDropdown title="Categories" id="collasible-nav-dropdown " className="dropdownNav1">
              {/* {JSON.stringify(categories)} */}
              {categories.map((category) => {
                return (
                  <NavDropdown.Item onClick={() => setExpanded(false)}
                    key={category.categoryId}
                    as={NavLink}
                    to={`/store/category/products/${category.categoryId}/${category.title}`}
                  >
                    {category.title}
                  </NavDropdown.Item>
                );
              })}
              <NavDropdown.Divider /> 
               <NavDropdown.Item as={NavLink} to={"/store"}  onClick={() => setExpanded(false)}>
                More
              </NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link as={NavLink} to={"/store"} className="dropdownNav2"  onClick={() => setExpanded(false)}>
                All Products
              </Nav.Link> */}
            {categories.map((category) => {
                return (
                  <Nav.Link className="dropdownNav2" onClick={() => setExpanded(false)}
                    key={category.categoryId}
                    as={NavLink}
                    to={`/store/category/products/${category.categoryId}/${category.title}`}
                  >
                    {category.title}
                  </Nav.Link>
                );
              })}
          </Nav>
          <Nav className="navv2">
         
            <div className="nav-dn2">
              <Nav.Link
                onClick={() => {
                  showCartSideBar();
                  setExpanded(false);
                }}
                as={NavLink}
                style={{ height: "50px", position: "relative" }}
              >
                <HiOutlineShoppingBag style={{fontSize:"28px"}} />{" "}
                <span
                  className="bg-success text-white  position-absolute rounded-circle text-center d-flex align-items-center justify-content-center"
                  style={{
                    top: "2px",
                    right: "5px",
                    width: "20px",
                    height: "20px",
                  }}
                >
                  {" "}
                  {cart.items?.length}
                </span>
              </Nav.Link>
            </div>

            {userContext.isLogin && userContext.isAdmin && (
              <>
                <Nav.Link
                  onClick={() => setExpanded(false)}
                  as={NavLink}
                  to={"/admin/home"}
                >
                  AdminDashboard
                </Nav.Link>
              </>
            )}
            {userContext.isLogin && (
              <>
                {" "}
                <Nav.Link
                  onClick={() => setExpanded(false)}
                  as={NavLink}
                  to={`users/profile/${userContext.userData.userId}`}
                >
                  {userContext?.userData?.email}
                </Nav.Link>
                {
                  <Nav.Link
                    onClick={() => setExpanded(false)}
                    as={NavLink}
                    to={"/users/orders-details"}
                  >
                    Orders
                  </Nav.Link>
                }
                <Nav.Link
                  onClick={() => {
                    logOut();
                    setExpanded(false);
                  }}
                  as={NavLink}
                >
                  Logout
                </Nav.Link>{" "}
              </>
            )}

            {!userContext.isLogin && (
              <>
                {" "}
                <Nav.Link
                  onClick={() => setExpanded(false)}
                  as={NavLink}
                  to={"/login"}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  onClick={() => setExpanded(false)}
                  as={NavLink}
                  to={"/register"}
                >
                  Signup
                </Nav.Link>{" "}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        {<CartSideBar showCart={showCart} showCartSideBar={showCartSideBar} />}
        {/* </span> */}
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
