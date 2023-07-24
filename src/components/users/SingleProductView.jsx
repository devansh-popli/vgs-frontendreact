import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { getProductImageUrl } from "../../services/HelperService";
import { Link, NavLink, useNavigate } from "react-router-dom";

const SingleProductView = ({ product,width }) => {
  const navigate = useNavigate();
  const navigateToProductsView = () => {
    navigate(`/products/${product.productId}`);
  };
  return (
    <Card
      onClick={navigateToProductsView}
      className="shadow border-1 mb-2 singleProd"
      style={{ cursor: "pointer" }}
    >
      <Card.Body>
        <Container className="text-center mb-3 d-flex justify-content-center align-items-center">
          <img
            style={{ objectFit: "contain" }}
            width={"180px"}
            height={"170px"}
            src={getProductImageUrl(product.productId)}
            alt=""
          />
        </Container>
        <h6 className="ms-2 text-capitalize text-secondary">
          {product?.categories[0].title.length < 20
            ? product?.categories[0].title
            : product?.categories[0].title.substring(0, 20) + "..."}
        </h6>
        <h6 className="ms-2 text-capitalize text-gray">
          {product.title.length < 20
            ? product.title
            : product.title.substring(0, 20) + "..."}
        </h6>
        <Container className="text-start">
          <b>
            <span className="h6 text-muted">
              <s>₹{product.price}</s>
            </span>
          </b>
          <b>
            <span className=" h6 ms-2">₹{product.discountedPrice}</span>
          </b>
        </Container>
        <Container className="d-grid mt-2">
          {/* <Button size='sm' className='' variant={'success'}>View Product</Button> */}
        </Container>
      </Card.Body>
    </Card>
  );
};

export default SingleProductView;
