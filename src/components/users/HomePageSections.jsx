import React, { useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";
import SingleProductView from "./SingleProductView";
import { getCategoryImageUrl } from "../../services/HelperService";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export const trendingProducts = (products, handleSelect, index) => {
  const settings = {
    arrows:false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
     centerMode: true,
    centerPadding: '6%',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: '0'
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          centerMode: true,
          centerPadding: '0'
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 2,
          centerMode: false,
        }
      }
    ]
  };

  return (
    <div fluid>
      <h2 className="ms-2  fw-bold text-center">Best Selling Products</h2>
        <Slider {...settings}>
          {products?.map((product, index) => (
            <div key={product.productId} className="pe-2">
                <SingleProductView product={product} />
            </div>
          ))}
        </Slider>
    </div>
  );
};

export const trendingCollections = (categories) => {
  return (
    <Container>
      <h2 className="mt-3  fw-bold text-center">Collections</h2>
      <Row className="d-flex justify-content-center">
        {categories?.map((category) => (
          <Col
            lg={4}
            md={5}
            sm={6}
            xs={6}
            className="text-center d-flex justify-content-center"
          >
            <Card
              as={Link}
              to={`/store/category/products/${category.categoryId}/${category.title}`}
              className="rounded my-2 "
            >
              <div fluid className="position-relative">
                <img
                  className="rounded imgCat"
                  style={{
                    objectFit: "cover",
                    height: "400px",
                    width: "400px",
                  }}
                  src={
                    true
                      ? `https://source.unsplash.com/random?${category.title}`
                      : getCategoryImageUrl(category.categoryId)
                  }
                  alt=""
                />
                <h3
                  className="position-absolute text-white"
                  style={{
                    bottom: "15px",
                    transform: "translate(-50%, -50%)",
                    left: "50%",
                  }}
                >
                  {category.title}
                </h3>
              </div>
            </Card>
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
