import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar, FaTags, FaFire, FaDollarSign } from 'react-icons/fa';

const CategoriesSection = () => {
  return (
    <Container
      fluid
      className="py-5 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1650803318792-6781b4884a20?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '500px',
        color: '#fff'
      }}
    >
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-4" style={{ color: '#fff' }}>Shop By Category</h2>
            <p className="lead" style={{ color: '#f1f1f1' }}>Explore our handpicked collections</p>
          </Col>
        </Row>

        <Row className="g-4 justify-content-center">
          <Col md={3}>
            <Card className="text-center border-0 shadow-sm h-100" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
              <Card.Body>
                <FaStar size={40} className="themeColor mb-3" />
                <Card.Title>Special Picks</Card.Title>
                <Card.Text className="text-muted">Curated just for you.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="text-center border-0 shadow-sm h-100" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
              <Card.Body>
                <FaTags size={40} className="themeColor mb-3" />
                <Card.Title>New Arrivals</Card.Title>
                <Card.Text className="text-muted">Discover the latest trends.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="text-center border-0 shadow-sm h-100" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
              <Card.Body>
                <FaFire size={40} className="themeColor mb-3" />
                <Card.Title>Bestsellers</Card.Title>
                <Card.Text className="text-muted">Popular with our customers.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="text-center border-0 shadow-sm h-100" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
              <Card.Body>
                <FaDollarSign size={40} className="themeColor mb-3" />
                <Card.Title>Under $50</Card.Title>
                <Card.Text className="text-muted">Affordable quality finds.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default CategoriesSection;
