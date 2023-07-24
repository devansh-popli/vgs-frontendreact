import React from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import SingleProductView from "./SingleProductView";

export const trendingProducts = (products) => {
  return (
    <Container>

        <h2 className="ms-2 mt-5  fw-bold">
          Best Selling Products
        </h2> 
      <Row className="d-flex justify-content-center">
        {products?.map((product) => (
          <Col md={3} lg={2} sm={10} className="mx-2 text-center d-flex justify-content-center">
            <SingleProductView className="ms-2 "  product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export const infoWithImageInRightSection = (image, text, title) => {
  return (
    <Container>
    <Row>
      <Col md={6} className="text-center my-2">
        <h3>{title}</h3>
        <p>{text}</p>
        <Button>Store</Button>
      </Col>
      <Col md={6} className=" d-flex align-items-center">
        <Image src={image} alt="" fluid />
      </Col>
    </Row>
    </Container>
  );
};
export const infoWithImageInLeftSection = (image, text, title) => {
  return (
    <Container>
    <Row>
      <Col md={6} className="my-2 d-flex align-items-center">
        <Image src={image} alt="" fluid />
      </Col>
      <Col md={6} className="text-center">
        <h3>{title}</h3>
        <p>{text}</p>
        <Button>Store</Button>
      </Col>
    </Row>
    </Container>
  );
};
export const creativeSection = (image, text, title) => {
  return (
  
   <section className="creative-section">
        <Container>
          <h2 className="fw-bold">Our Commitment to Quality</h2>
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
  );
};
