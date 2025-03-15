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
import { SearchField } from "./SearchField";
import { BsFillPersonFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Dropdown } from "react-bootstrap";
import { HiMiniBars3 } from "react-icons/hi2";
import { CategoryContext } from "../../context/CategoryContext";
const CustomNavbar = ({toggleSidebar}) => {
  const userContext = useContext(UserContext);
  const { showCartSideBar, showCart, setCart } = useContext(CartContext);

  const [expanded, setExpanded] = useState(false);

  const logOut = () => {
    userContext.doLogout();
    setCart({ items: [] });
  };
  const [categories, setCategories] = useState([]);
  const categoriesContext=useContext(CategoryContext);
  useEffect(() => {
    getCategories(0, 1000)
      .then((data) => {
        // console.log(data,"cat")
        setCategories(data.content);
        categoriesContext.addCategories(data)
      })
      .catch((error) => {
        toast.error("error while getting categories");
      });
  }, []);

  const { cart } = useContext(CartContext);
  return (
    <>
    <Navbar
      expanded={expanded}
      collapseOnSelect
      expand="lg"
      bg="white"
      variant="light"
      className="  navbar12"
    >
      <Container fluid>
        <HiMiniBars3 size={30} className="me-2"onClick={toggleSidebar}/>
        <div className="brand">
        <Navbar.Brand onClick={() => setExpanded(false)}
          as={NavLink}
          to={"/"}
          className="d-flex justify-content-center align-items-center"
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/marketmixlogo.png`}
            alt="logo"
            height={75}
            width={125}
          />
          {/* <span className="ms-2">JIVU</span> */}
        </Navbar.Brand>
        </div>
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
                <HiOutlineShoppingBag className="text-white" style={{ fontSize: "28px" }} />{" "}
                <span
                  className="themebgColor text-white  position-absolute rounded-circle text-center d-flex align-items-center justify-content-center"
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
          {/* <Navbar.Toggle
            className="ms-3"
            onClick={() => setExpanded(expanded ? false : true)}
            aria-controls=" responsive-navbar-nav "
          /> */}
        </div>
        {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
          <Nav className="m-auto navv2">
            <div className="displayHiddenOnMobile">
              <SearchField />
            </div>
            {/* <Nav.Link
              onClick={() => setExpanded(false)}
              as={NavLink}
              to={"/services"}
            >
              Features
            </Nav.Link> */}

            {/* <Nav.Link
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
            > */}
            {/* ContactUs
            </Nav.Link> */}

            {/* <NavDropdown title="Categories" id="collasible-nav-dropdown " className="dropdownNav1">
               {JSON.stringify(categories)} 
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
            </NavDropdown> */}
            {/* <Nav.Link as={NavLink} to={"/store"} className="dropdownNav2"  onClick={() => setExpanded(false)}>
                All Products
              </Nav.Link> */}

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
                <div className="d-flex flex-column align-items-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2px" }}>
                  <HiOutlineShoppingBag style={{ fontSize: "28px" }} />{" "}
                  <span>Cart</span>
                </div>
                <span
                  className="themebgColor text-white  position-absolute rounded-circle text-center d-flex align-items-center justify-content-center"
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


            {userContext.isLogin && (
              <>
                <Nav.Link
                  className="d-flex align-items-center displayHiddenOnMobile nav-dn2"
                  as={NavLink}
                >
                  <Dropdown align="end" className=" flex-column custom-dropdown nav-dn2">
                    <Dropdown.Toggle as="a" className="nav-link m-0 p-0 d-flex flex-column align-items-center" style={{ cursor: 'pointer' }}>
                      <BsFillPersonFill size={30} className="me-2 text-dark" />
                      <span>Account</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Header as={NavLink} to={`users/profile/${userContext.userData.userId}`}>{userContext?.userData?.name}</Dropdown.Header>
                      <Dropdown.Item as={NavLink} to={"/users/orders-details"}>Orders</Dropdown.Item>
                      { userContext.isBusinessUser && <Dropdown.Item href="#/orders-by-referral">Orders by Referral</Dropdown.Item>}
                      {userContext.isLogin && userContext.isAdmin && (<Dropdown.Item onClick={() => setExpanded(false)}
                        as={NavLink}
                        to={"/admin/home"}>
                        Admin Dashboard
                      </Dropdown.Item>)}
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={() => {
                        logOut();
                        setExpanded(false);
                      }} >Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

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
                  className="displayHiddenOnMobile"
                >
                  <div className="d-flex flex-column align-items-center nav-dn2">
                    <BsFillPersonFill style={{ fontSize: "30px" }} />
                    <span> Login</span>
                  </div>

                </Nav.Link>
                {/* <Nav.Link
                  onClick={() => setExpanded(false)}
                  as={NavLink}
                  to={"/register"}
                >
                  Signup
                </Nav.Link>{" "} */}
              </>
            )}
          </Nav>
        {/* </Navbar.Collapse> */}
        {<CartSideBar showCart={showCart} showCartSideBar={showCartSideBar} />}
        {/* </span> */}
      </Container>
    </Navbar>
    
    </>
  );
};

export default CustomNavbar;
