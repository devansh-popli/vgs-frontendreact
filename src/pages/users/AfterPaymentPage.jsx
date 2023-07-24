import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AfterPaymentPage = () => {
  return (
    <Container className="mt-5 my-5" style={{height:"48vh"}}>
      <Row>
        <Col md={6} className="mx-auto text-center">
          <h2>Payment Successful!</h2>
          <p>Thank you for your purchase.</p>
          <p>Your order has been successfully processed.</p>
          <p>We will send you a confirmation email with the details of your order.</p>
          <Button variant="primary" as={Link} to="/store">Continue Shopping</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AfterPaymentPage;
