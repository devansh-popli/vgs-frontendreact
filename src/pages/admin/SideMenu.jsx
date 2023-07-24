import React, { useContext } from "react";
import { Badge, Container, ListGroup } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { GrHome } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { TfiShoppingCart } from "react-icons/tfi";
import { CiViewList } from "react-icons/ci";
import { FaUserSecret } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiOutlineLogout } from "react-icons/hi";
import { UserContext } from "../../context/UserContext";
export const SideMenu = () => {
  const userContext = useContext(UserContext);
  return (
      <ListGroup className="" style={{position:"sticky",top:"80px"}} variant="flush">
        <ListGroup.Item as={NavLink} to={"/admin/home"} action>
          <GrHome size={20} /> <span className="ms-2">Home</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to={"/admin/add-category"} action>
          <BiCategory size={20} />
          <span className="ms-2"> Add Category</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to={"/admin/categories"} action>
          <MdOutlineCategory size={20} />
          <span className="ms-2"> View Categories</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to={"/admin/add-product"} action>
          <MdAddBox size={20} /> <span className="ms-2"> Add Products</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to={"/admin/products"} action>
          <CiViewList size={20} />
          <span className="ms-2"> View Products</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to={"/admin/orders"} action>
          <TfiShoppingCart /> <span className="ms-2"> Orders</span>
        </ListGroup.Item>
        <ListGroup.Item
          className="d-flex justify-content-between align-items-start"
          as={NavLink}
          to={"/admin/users"}
          action
        >
          <div>
            <FaUserSecret size={20} />
            <span className="ms-2"> Users</span>
          </div>
          <Badge bg="danger">New</Badge>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to={"/admin/home"} action>
          <LuLayoutDashboard size={20} />{" "}
          <span className="ms-2">Dashboard</span>
        </ListGroup.Item>
        <ListGroup.Item onClick={() => userContext.doLogout()} action>
          <HiOutlineLogout size={20} />
          <span className="ms-2">Logout</span>
        </ListGroup.Item>
      </ListGroup>
  );
};
