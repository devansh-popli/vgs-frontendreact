import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './HomePage.css'; // Custom CSS file for additional styling

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <Container>
          <Row>
            <Col md={6}>
              <h1>Welcome to Agro Service Center</h1>
              <p>Providing top-notch agricultural services since 2005</p>
              <Button variant="primary">Learn More</Button>
            </Col>
            <Col md={6}>
              <img
                src="https://random.imagecdn.app/500/300"
                alt="Agro Service Center"
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="best-selling-section">
        <Container>
          <h2>Best Selling Products</h2>
          <Row>
            {/* Product 1 */}
            <Col md={4}>
              <div className="product-card">
                <img
                  src="https://random.imagecdn.app/500/300"
                  alt="Product 1"
                  className="img-fluid"
                />
                <h4>Product 1</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </Col>

            {/* Product 2 */}
            <Col md={4}>
              <div className="product-card">
                <img
                  src="https://random.imagecdn.app/500/300"
                  alt="Product 2"
                  className="img-fluid"
                />
                <h4>Product 2</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </Col>

            {/* Product 3 */}
            <Col md={4}>
              <div className="product-card">
                <img
                  src="https://random.imagecdn.app/500/300"
                  alt="Product 3"
                  className="img-fluid"
                />
                <h4>Product 3</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about-us-section">
        <Container>
          <Row>
            <Col md={6}>
              <img
                src="https://random.imagecdn.app/500/300"
                alt="About Us"
                className="img-fluid"
              />
            </Col>
            <Col md={6}>
              <h2>About Us</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                convallis arcu non elit lobortis, id rutrum velit commodo. Sed
                malesuada dapibus dui, vitae placerat metus tincidunt vel.
              </p>
              <Button variant="primary">Read More</Button>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="contact-us-section">
        <Container>
          <Row>
            <Col md={6}>
              <h2>Contact Us</h2>
              <p>
                Address: 123 Main Street, City, Country
                <br />
                Email: info@example.com
                <br />
                Phone: +1 234 5678
              </p>
            </Col>
            <Col md={6}>
              <img
                src="https://random.imagecdn.app/500/300"
                alt="Contact Us"
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="creative-section">
        <Container>
          <h2>Our Commitment to Quality</h2>
          <Row>
            <Col md={6}>
              <div className="creative-card">
                <h4>Exceptional Products</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  convallis arcu non elit lobortis, id rutrum velit commodo.
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className="creative-card">
                <h4>Expert Advice</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  convallis arcu non elit lobortis, id rutrum velit commodo.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
