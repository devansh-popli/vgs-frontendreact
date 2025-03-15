import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllProductImages, getSingleProduct } from "../../services/ProductService";
import { toast } from "react-toastify";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { ShowHtml } from "../../components/ShowHtml";
import { getProductImageUrl } from "../../services/HelperService";
import { ProductViewCss } from "./css/ProductView.css";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";

export const ProductView = () => {
  const { productId, referralId } = useParams();
  if (referralId) {
    localStorage.setItem("referralId", referralId)
  }
  const navigate = useNavigate()
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
  const [images, setImages] = useState([])
  useEffect(() => {
    if (productId) loadProduct(productId);
    getAllProductImages(productId).then(data => {
      setImages(data)
    }).catch(err => {
      toast.error("error while fetching product images")
    })
  }, [productId]);


  const SingleProductView = () => {
    const [activeIndex, setActiveIndex] = useState(0);
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
                <div className="desktop">

                  <Container
                    fluid
                    style={{ position: "sticky", top: "110px" }}
                    className="d-flex justify-content-center "
                  >
                    <div
                      className="d-flex justify-content-center align-items-center"
                    >
                      <img
                        style={{ objectFit: "cover", cursor: "pointer" }}
                        className="w-100 productImage"
                        src={images[activeIndex]}
                      />
                    </div>
                  </Container>
                  <Container className="d-flex justify-content-center align-items-center mt-3">
                    {images?.map((imageUrl, index) => (
                      <div
                        className="d-flex justify-content-center align-items-center"

                        key={index}
                      >
                        <img
                          style={{ objectFit: "cover", cursor: "pointer", height: "100px", width: "100px" }}
                          className="mx-2 rounded"
                          src={imageUrl}
                          alt={`Product Image ${index + 1}`}
                          onClick={() => setActiveIndex(index)}
                          onMouseEnter={() => setActiveIndex(index)}
                        />
                      </div>
                    ))}
                  </Container>
                </div>
                <div className="mobile">
                <h3 className="text-capitalize text-gray">
                  <b> {product?.title}</b>
                </h3>
                <h6 className="text-capitalize text-secondary mb-3">
                  {product?.categories[0]?.title.length < 20
                    ? product?.categories[0]?.title
                    : product?.categories[0]?.title.substring(0, 20) + "..."}
                </h6>
                  <Carousel controls={false}>
                    {images?.map((imageUrl, index) => (
                      <Carousel.Item key={index}>
                        <div
                          className="d-flex justify-content-center align-items-center"
                        >
                          <img
                            style={{ objectFit: "cover", cursor: "pointer" }}
                            className="w-100 productImage"
                            src={imageUrl}
                            alt={`Product Image ${index + 1}`}
                          />
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              </Col>
              <Col md={7}>
                <h6 className="text-capitalize text-secondary desktop">
                  {product?.categories[0]?.title.length < 20
                    ? product?.categories[0]?.title
                    : product?.categories[0]?.title.substring(0, 20) + "..."}
                </h6>
                <h3 className="text-capitalize text-gray desktop">
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
                    className="themebgColor"
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
                        if (!isLogin) {
                          localStorage.setItem('redirectTo', '/users/orders');
                        }
                        if (referralId) {
                          navigate(`/users/orders/${referralId}`)
                        }
                        else {
                          navigate(`/users/orders`)
                        }
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
