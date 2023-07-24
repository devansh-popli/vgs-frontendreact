import React, { useEffect, useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { getCategories } from "../../services/CategoryService";
import { getCategoryImageUrl } from "../../services/HelperService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
export const UserCategoryView = ({imagepath}) => {
  const [categories,setCategories]=useState(null)
  useEffect(() => {
    loadCategories(0, 100);
  }, []);
  const loadCategories = (pageNumber, pageSize) => {
    getCategories(pageNumber, pageSize)
      .then((res) => {
        setCategories(res);
      })
      .catch((error) => {
        toast.error("error while loading categories");
      });
  };
  const categoryView = () => {
    return (
      categories && (
       
          <ListGroup variant="flush" style={{position:"sticky",zIndex:0,top:"140px"}}>
            <ListGroup.Item as={Link} to={"/store"}>
            <Container fluid>
                    <Row className="d-flex justify-content-center align-items-center">
                      <Col md={2}>
                        <img
                          height={40}
                          width={40}
                          className="rounded-circle"
                          style={{
                            objectFit: "cover",
                          }}
                          src={imagepath}
                          alt=""
                        />
                      </Col>
                      <Col md={10}>
                        <span className="ms-3">All Products</span>
                      </Col>
                    </Row>
                  </Container>
            </ListGroup.Item>
            {categories.content.map((category) => {
              return (
                <ListGroup.Item
                  key={category.categoryId}
                  as={Link}
                  to={`/store/category/products/${category.categoryId}/${category.title}`}
                >
                  <Container fluid>
                    <Row className="d-flex justify-content-center align-items-center">
                      <Col md={2}>
                        <img
                          height={40}
                          width={40}
                          className="rounded-circle"
                          style={{
                            objectFit: "cover",
                          }}
                          src={
                            category?.coverImage &&
                            getCategoryImageUrl(category.categoryId)
                          }
                          alt=""
                        />
                      </Col>
                      <Col md={10}>
                        <span className="ms-3">{category.title}</span>
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
      )
    );
  };
  return categoryView();
};
