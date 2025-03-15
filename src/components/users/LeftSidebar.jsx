import React, { useContext, useEffect, useState } from 'react';
import { Nav, Button, Accordion, Card } from 'react-bootstrap';
import { FaBox, FaUserFriends, FaTachometerAlt, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import './Sidebar.css';
import { getCategories } from '../../services/CategoryService';
import { toast } from 'react-toastify';
import { MdCategory } from "react-icons/md";
import { UserContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';
import { NavLink } from 'react-router-dom';
import { CategoryContext } from '../../context/CategoryContext';
function LeftSidebar({ toggleSidebar, isOpen }) {

    const [categories, setCategories] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const userContext = useContext(UserContext);
    const categoriesContext = useContext(CategoryContext);
    useEffect(() => {
        setCategories(categoriesContext?.categories?.content)
        // getCategories(0, 1000)
        //     .then((data) => setCategories(data.content))
        //     .catch(() => toast.error("Error while getting categories"));
    }, [categoriesContext]);
    const { showCartSideBar, showCart, setCart } = useContext(CartContext);
    const toggleCategory = () => {
        setExpandedCategory(expandedCategory === "Shop By Category" ? null : "Shop By Category");
    };
    const logOut = () => {
        userContext.doLogout();
        setCart({ items: [] });
    };
    return (
        <div className={`leftSidebar fullscreen-sidebar ${isOpen ? 'show' : ''}`}>
            <Button variant="link" className="close-btn text-dark" onClick={toggleSidebar}>
                <FaTimes size={24} />
            </Button>

            <div className="sidebar-content">
                <Nav variant="pills" className="flex-column sidebar-nav">
                    <Accordion flush className='m-0 p-0'>
                        <Card className="category-card m-0 p-0 mb-1">
                            <Accordion.Header onClick={toggleCategory} className="category-header m-0 p-0">
                                <MdCategory className="me-2" size={20} /> Shop By Category
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className={expandedCategory === "Shop By Category" ? "expanded" : "collapsed"}>
                                    {categories?.map((category) => (
                                        <Nav.Link onClick={ toggleSidebar} as={NavLink} to={`/store/category/products/${category.categoryId}/${category.title}`} className='customNavLink' key={category.categoryId} >
                                            {category.title}
                                        </Nav.Link>
                                    ))}
                                </div>
                            </Accordion.Body>
                        </Card>
                    </Accordion>
                    {userContext.isLogin && (
                        <>
                            <Nav.Item>
                                <Nav.Link onClick={ toggleSidebar} as={NavLink}  to={"/users/orders-details"} className=" customNavLink d-flex align-items-center">
                                    <FaBox className="me-2" /> Orders
                                </Nav.Link>
                            </Nav.Item>
                            {
 userContext.isBusinessUser &&
                                <Nav.Item>
                                <Nav.Link onClick={ toggleSidebar} as={NavLink}to={"/users/referral/order-details"}  className=" customNavLink d-flex align-items-center">
                                    <FaUserFriends className="me-2" /> Orders by Referral
                                </Nav.Link>
                            </Nav.Item>
                            }
                        </>
                    )}
                    {userContext.isLogin && userContext.isAdmin &&
                        <Nav.Item>
                            <Nav.Link to={"/admin/home"}onClick={ toggleSidebar} as={NavLink} className="customNavLink d-flex align-items-center">
                                <FaTachometerAlt className="me-2" /> Admin Dashboard
                            </Nav.Link>
                        </Nav.Item>
                    }   {userContext.isLogin && (
                        <Nav.Item>
                            
                            <Nav.Link onClick={() => {
                                logOut();
                                toggleSidebar()
                            }} className=" customNavLink d-flex align-items-center">
                                <FaSignOutAlt className="me-2" /> Logout
                            </Nav.Link>
                        </Nav.Item>
                    )}
                </Nav>
            </div>
        </div>
    );
}

export default LeftSidebar;
