import React from "react";
import { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FaUser, FaUserFriends } from "react-icons/fa";
import {
  MdOutlineCardGiftcard,
  MdOutlineCategory,
  MdOutlineProductionQuantityLimits,
  MdOutlineVerifiedUser,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../services/ProductService";
import { useState } from "react";
import { toast } from "react-toastify";
import { getCategories } from "../../services/CategoryService";
import { getOrders } from "../../services/OrderService";
import { getAllUsers } from "../../services/UserService";

export const AdminHome = () => {
  const [countCategoriesState, setCategoriesCountState] = useState(0)
  const [countProductsState, setProductsCountState] = useState(0)
  const [countOrdersState, setOrdersCountState] = useState(0)
  const [countUsersState, setUsersCountState] = useState(0)
  useEffect(() => {
    getAllProducts(0,10000)
      .then((data) => {
        setCategoriesCountState(data.content.length);
      })
      .catch((error) => {
        toast.error("Error while fetching products")
      });
      getCategories(0,10000)
      .then((data) => {
        setProductsCountState(data.content.length );
      })
      .catch((error) => {
        toast.error("Error while fetching categories")
      });
      getOrders(0,10000,"orderedDate","asc")
      .then((data) => {
        setOrdersCountState( data.content.length);
      })
      .catch((error) => {
        toast.error("Error while fetching orders")
      });
      getAllUsers(0,10000,"name","asc")
      .then((data) => {
        setUsersCountState(data.content.length);
      })
      .catch((error) => {
        toast.error("Error while fetching users")
      });
  },[]);
  return (
    <Container>
      <Row>
        <Col>
          <Card className="mt-4">
            <Card.Body className="shadow text-center">
              <h3 className="text-center">Welcome to Admin Dashboard</h3>
              <p className="text-center text-muted">
                Customise Dasboard for Admin, to add categories, to add
                products, to view categories, products, orders, manage orders
                and many more{" "}
              </p>
              <Container className="d-grid gap-3">
                <Button
                  as={Link}
                  className=""
                  variant="outline-secondary"
                  to={"/admin/categories"}
                >
                  Start Managing Categories
                </Button>
                <Button
                  as={Link}
                  variant="outline-secondary"
                  to={"/admin/products"}
                >
                  Start Managing Products
                </Button>
                <Button
                  as={Link}
                  variant="outline-secondary"
                  to={"/admin/orders"}
                >
                  Start Managing Orders
                </Button>
                <Button
                  as={Link}
                  variant="outline-secondary"
                  to={"/admin/users"}
                >
                  Start Managing Users
                </Button>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="m-4">
            <Card.Body className="text-center">
              <MdOutlineProductionQuantityLimits size={70} />
              <h3>({countProductsState})</h3>
              <h3>Number of Products</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="m-4">
            <Card.Body className="text-center">
              <MdOutlineCategory size={70} />
              <h3>({countCategoriesState})</h3>
              <h3>Number of Categories</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="m-4">
            <Card.Body className="text-center">
              <MdOutlineCardGiftcard size={70} />
              <h3>({countOrdersState})</h3>
              <h3>Number of Orders</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="m-4">
            <Card.Body className="text-center">
              <FaUserFriends size={70} />
              <h3>({countUsersState})</h3>
              <h3>Number of Users</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
