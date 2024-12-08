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
        backgroundImage: "url('../../bagwati.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '500px',
        color: '#fff',
        // opacity:"0.6"
      }}
    >
      <Container className='opac'>
        <Row className="text-center ">
          <Col className='section-top'>
            <h2 className="display-4" >Shop By Category</h2>
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
