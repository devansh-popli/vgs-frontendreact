import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import {
  createOrder,
  createdTrancationOfOrder,
} from "../../services/OrderService";
import { useJwtExpiration } from "../../hooks/useJwtExpiration";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";
// import Razorpay from "razorpay";

export const Orders = () => {
  const [Razorpay] = useRazorpay();
  useJwtExpiration();
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const { userData, isLogin } = useContext(UserContext);
  const [order, setOrder] = useState({
    billingAddress: "",
    billingName: "",
    billingPhone: "",
    cartId: "",
    paymentStatus: "",
    orderStatus: "",
    userId: "",
  });
  const handleFieldUpdate = (event) => {
    setOrder({ ...order, [event.target.name]: event.target.value });
  };

  const openRazorpayCheckout = () => {
    if (cart.items <= 0) {
      toast.info("Add items in your cart");
      return;
    }
    const orderAmount = cart.items.reduce((accumulator, item) => {
      return accumulator + item.price;
    }, 0);
    if (order.billingName.trim() == "") {
      toast.info("Billing name required");
      return;
    }
    if (order.billingPhone.trim() == "") {
      toast.info("Billing Phone required");
      return;
    }
    if (order.billingAddress.trim() == "") {
      toast.info("Billing Address required");
      return;
    }
    createdTrancationOfOrder(orderAmount).then((response) => {
      showPopupRazorPay(response);
    });
  };
  const showPopupRazorPay = (response) => {
    const razorpayOptions = {
      key: response.key,
      amount: response.amount, // Amount in paise (e.g., 1000 paise = ₹10)
      order_id: response.orderId,
      currency: response.currency,
      name: "My Store",
      description: "Test Payment",
      handler: (response) => {
        console.log(response);
        order.paymentStatus = "PAID";
        order.razorPayPaymentId = response.razorpay_payment_id;
        order.razorPayOrderId = response.razorpay_order_id;
        handleOrderCreation();
        setOrder({
          billingAddress: "",
          billingName: "",
          billingPhone: "",
          cartId: "",
          paymentStatus: "",
          orderStatus: "",
          userId: "",
        });
        navigate("/users/orders/payment-success");

        // You can perform additional actions here after successful payment
      },
    };

    const paymentObject = new Razorpay(razorpayOptions);
    paymentObject.open();
    // const razorpayInstance = new Razorpay(razorpayOptions);
    // razorpayInstance.open();
  };
  const handleOrderCreation = async () => {
    order.cartId = cart.cartId;
    order.orderStatus = "PENDING";

    order.userId = userData.userId;
    console.log(order);
    try {
      const data = await createOrder(order);
      setCart({ items: [] });
      toast.success("Order Created Successfully Proceeding for Payment");
    } catch (e) {
      toast.error("error while creating order");
    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card className="shadow-sm mt-3">
              <Card.Body>
                <h3>Fill the form to complete the order</h3>
                <Form>
                  <Form.Group className="mt-3">
                    <Form.Label>Billing Name</Form.Label>
                    <Form.Control
                      onChange={(event) => handleFieldUpdate(event)}
                      name="billingName"
                      placeholder="enter here"
                      type="text"
                    />
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Label>Billing Phone</Form.Label>
                    <Form.Control
                      onChange={(event) => handleFieldUpdate(event)}
                      name="billingPhone"
                      placeholder="enter here"
                      type="phone"
                    />
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Label>Billing Address</Form.Label>
                    <Form.Control
                      onChange={(event) => handleFieldUpdate(event)}
                      name="billingAddress"
                      placeholder="enter here"
                      as={"textarea"}
                      rows={6}
                    />
                  </Form.Group>
                  <Container className="d-grid mt-3">
                    <Button variant="success" onClick={openRazorpayCheckout}>
                      Proceed to Pay
                    </Button>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
