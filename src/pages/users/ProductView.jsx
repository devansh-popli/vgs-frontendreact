import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct } from "../../services/ProductService";
import { toast } from "react-toastify";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ShowHtml } from "../../components/ShowHtml";
import { getProductImageUrl } from "../../services/HelperService";
import { ProductViewCss } from "./css/ProductView.css";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";

export const ProductView = () => {
  const { productId } = useParams();
  const navigate=useNavigate()
  const { addItem, showCart, setShowCart, cart } = useContext(CartContext);
  const { isLogin } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const loadProduct = (productId) => {
    getSingleProduct(productId)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        toast.error("loading product");
      });
  };
  useEffect(() => {
    if (productId) loadProduct(productId);
  }, []);
  const SingleProductView = () => {
    return (
      product && (
        <>
          <Container fluid>
            {/* <Row>
            <Col> */}
            {/* <Card className="mt-4 shadow-sm">
                <Card.Body> */}
            <Row className=" mt-5">
              <Col md={5}>
                <Container
                  fluid
                  style={{ position: "sticky", top: "110px" }}
                  className="d-flex justify-content-center "
                >
                  <img
                    className="productImage text-center"
                    src={getProductImageUrl(product?.productId)}
                    alt=""
                  />
                </Container>
              </Col>
              <Col md={7}>
                <h6 className="text-capitalize text-secondary">
                  {product?.categories[0]?.title.length < 20
                    ? product?.categories[0]?.title
                    : product?.categories[0]?.title.substring(0, 20) + "..."}
                </h6>
                <h3 className="text-capitalize text-gray">
                  <b> {product?.title}</b>
                </h3>
                <div className="mt-3">
                  <b>
                    <span className="h5 mt-2 text-muted">
                      M.R.P: <s>₹{product?.price}</s>
                    </span>
                  </b>
                  <b>
                    <div className=" h4 fw-bold">
                      Price: ₹{product?.discountedPrice}
                    </div>
                  </b>
                </div>
                <div className="mt-3">
                  <Button
                    variant="info"
                    onClick={() => {
                      if (
                        (cart.items.filter(
                          (prod) => prod.product.productId == product.productId
                        ).length == 0 &&
                          product?.quantity > 0) ||
                        cart?.items.filter(
                          (prod) => prod.product.productId == product.productId
                        )[0].quantity < product.quantity
                      ) {
                        addItem(product, 1);
                        if(!isLogin)
                        {
                          localStorage.setItem('redirectTo', '/users/orders');
                        }
                        navigate("/users/orders")
                      }
                    }}
                  >
                    Buy Now
                  </Button>
                  <Button
                    disabled={!product.stock}
                    variant="dark"
                    className="ms-2"
                    onClick={() => {
                      if (
                        (cart.items.filter(
                          (prod) => prod.product.productId == product.productId
                        ).length == 0 &&
                          product?.quantity > 0) ||
                        cart?.items.filter(
                          (prod) => prod.product.productId == product.productId
                        )[0].quantity < product.quantity
                      ) {
                        addItem(product, 1);
                        setShowCart(true);
                      } else {
                        toast.info("No more Quantity in Stock");
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
                <div className="mt-3 d-flex justify-content-center align-items-center">
                  <ShowHtml htmlText={product?.description} />
                </div>
              </Col>
            </Row>
            {/* </Card.Body> */}
            {/* </Card> */}
            {/* </Col>
          </Row> */}
          </Container>
        </>
      )
    );
  };
  return <div>{SingleProductView()}</div>;
};
