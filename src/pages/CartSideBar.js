import React, { useContext, useRef } from "react";
import { CartContext } from "../context/CartContext";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { AiFillMinusCircle } from "react-icons/ai";
import { Button, Col, Container, Row } from "react-bootstrap";
import { getProductImageUrl } from "../services/HelperService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

export const CartSideBar = ({ showCartSideBar, showCart }) => {
  const { cart, setCart, addItem, removeItemFromCart, clearCart } =
    useContext(CartContext);
    const {isLogin}=useContext(UserContext)
  const ref = useRef();
  const navigate = useNavigate();
  const toggleCart = () => {
    showCartSideBar(false);
  };
  const navigateToOrders = () => {
    toggleCart();
    navigate("/users/orders");
  };
  return (
    <div
      ref={ref}
      className="py-5  bg-secondary sidebar"
      style={
        !showCart
          ? {
              background: "RGB(55, 65, 81)",
              position: "absolute",
              right: "0",
              height: "100vh",
              padding: "0px 20px",
              top: "0px",
              width: "0",
              zIndex: 10,
              overflowX: "hidden",
              visibility: "hidden", // Hide the sidebar content when width is 0
              // transition: "width 1s, visibility 0s 1s", // Apply transition to width and delay visibility transition
            }
          : {
              background: "RGB(55, 65, 81)",
              position: "absolute",
              right: "0",
              height: "100vh",
              padding: "0px 10px",
              top: "0px",
              // width: "300px",
              zIndex: 10,
              overflowX: "hidden",
              visibility: "visible", // Show the sidebar content when width is not 0
              transition: "0.3s", // Apply transition to width
            }
      }
    >
      <h4 className="fw-bold text-white border-bottom border-2 pb-3">
        Shopping Cart
      </h4>
      <span
        onClick={toggleCart}
        className="position-absolute top-0 h2"
        style={{ right: "20px", cursor: "pointer" }}
      >
        <AiFillCloseCircle />
      </span>
      <ul className="fw-semibold list-unstyled">
        {cart.items && cart.items.length > 0 ? (
          cart.items.map((item) => {
            return (
              item && (
                <li key={item?.cartItemId}>
                  <Container fluid>
                    <Row className="my-2 d-flex justify-content-center align-items-center">
                      <Col
                        xs={2}
                        className=" d-flex justify-content-center align-items-center"
                      >
                        <img
                          className="rounded"
                          style={{ objectFit: "cover" }}
                          height={60}
                          width={60}
                          src={getProductImageUrl(item?.product?.productId)}
                          alt=""
                        />
                      </Col>
                      <Col xs={7}>
                        <small className="d-flex justify-content-center align-items-center">
                          {item?.product.title}
                        </small>
                      </Col>
                      <Col xs={3}>
                        <div className="d-flex justify-content-center align-items-center">
                          <AiFillMinusCircle
                            onClick={() => {
                              item?.quantity > 1
                                ? addItem(item?.product, -1)
                                : removeItemFromCart(
                                    item.cartItemId,
                                    item.product.productId
                                  );
                            }}
                            className="mx-1 h4  plusminuscart"
                          />
                          <div className="mb-2">{item?.quantity}</div>
                          <AiFillPlusCircle
                            onClick={() => {
                              item?.quantity < item?.product.quantity
                                ? addItem(item?.product, 1)
                                : toast.info("No More Quantity in Stock");
                            }}
                            className="mx-1 h4  plusminuscart"
                          />
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </li>
              )
            );
          })
        ) : (
          <>
            <h6 className="fw-bold mt-4 mx-3">Your cart is Empty!</h6>
          </>
        )}
      </ul>
      <div className="fw-bold my-2">
        Subtotal: ₹
        {cart.items.reduce((accumulator, item) => {
          return accumulator + item.price;
        }, 0)}
      </div>
      <Button
        variant="success"
        size="sm"
        onClick={() => {
          if (!isLogin) {
            localStorage.setItem("redirectTo", "/users/orders");
          }
          toggleCart();
          navigate("/users/orders");
          // navigateToOrders;
        }}
      >
        <BsFillBagCheckFill className="mb-1 mx-1" /> Checkout
      </Button>
      <Button onClick={clearCart} variant="danger" size="sm" className="mx-1">
        Clear
      </Button>
    </div>
  );
};
