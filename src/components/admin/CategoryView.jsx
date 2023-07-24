import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../services/HelperService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const CategoryView = ({handleUpdateOfCategory, category ,deleteCategoryFromParent,handleViewOfCategory,}) => {
  const deleteCategory = (categoryId) =>{
    deleteCategoryFromParent(categoryId)
  };
  return (
    <>
      <Card className="mt-3 border-0 shadow">
        <Card.Body>
          <Row className="align-items-center">
            <Col
              md={2}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                className="rounded-circle"
                style={{ objectFit: "cover" }}
                src={
                  category.coverImage && category.coverImage.trim() != ""
                    ? `${BASE_URL}/categories/image/${category.categoryId}?${new Date().getTime()}`
                    : `../assets/logo.png`
                }
                height={100}
                width={100}
                alt=""
              />
            </Col>
            <Col md={10}>
              <h5>{category.title}</h5>
              <p>{category.description}</p>
              <Container>
                <Button
                  className="mx-1"
                  size="sm"
                  variant="outline-danger"
                  onClick={() => deleteCategory(category.categoryId)}
                >
                  Delete
                </Button>
                <Button onClick={()=>handleUpdateOfCategory(category)} className="mx-1" size="sm" variant="outline-warning">
                  Update
                </Button>
                <Button onClick={()=>handleViewOfCategory(category)} className="mx-1" size="sm" variant="outline-info">
                  View
                </Button>
              </Container>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
