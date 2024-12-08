import React from 'react';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShippingFast, FaCreditCard, FaHeadset } from 'react-icons/fa';

const FeaturedSection = () => {
  return (
    <Container fluid className="new-section" >
      <Container>
        <Row className="text-center ">
          <Col className='section-top'>
            <h2 className="display-4 m-0" style={{ color: '#333' }}>Why Shop With Us</h2>
            <p className="lead text-muted">Discover what makes us unique and why our customers love shopping with us.</p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={4} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Image src="https://images.pexels.com/photos/4246109/pexels-photo-4246109.jpeg" rounded fluid />
              <Card.Body className="text-center">
                <FaShippingFast size={48} className="themeColor mb-3" />
                <Card.Title>Fast & Reliable Delivery</Card.Title>
                <Card.Text className="text-muted">
                  We ensure quick and reliable shipping, bringing your orders right to your doorstep.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Image src="https://images.pexels.com/photos/4386396/pexels-photo-4386396.jpeg" rounded fluid />
              <Card.Body className="text-center">
                <FaCreditCard size={48} className="themeColor mb-3" />
                <Card.Title>Secure Payments</Card.Title>
                <Card.Text className="text-muted">
                  Experience safe and secure payment options, ensuring peace of mind for all your purchases.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Image src="https://images.pexels.com/photos/845451/pexels-photo-845451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" rounded fluid />
              <Card.Body className="text-center">
                <FaHeadset size={48} className="themeColor mb-3" />
                <Card.Title>24/7 Customer Support</Card.Title>
                <Card.Text className="text-muted">
                  Our dedicated support team is available around the clock to assist you with any queries.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="text-center ">
          <Col>
            <Button variant="primary" className='themebgColor' size="lg">Shop Now</Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default FeaturedSection;
