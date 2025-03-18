import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";
import SingleProductView from "./SingleProductView";
import { getCategoryImageUrl } from "../../services/HelperService";
import { Link } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import FeaturedSection from "./FeaturedSection";
import Carousel from 'react-multi-carousel';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Core Swiper styles
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const MultiCarousel = Carousel;
const PremiumCard = ({ title, description, imgSrc, delay }) => {
  const animationProps = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { mass: 1, tension: 170, friction: 26 },
    delay,
  });

  return (
    <Col md={4}>
      <animated.div style={animationProps}>
        <Card className="mb-4  p-4 shadow rounded border-0 text-center ">
          <div className="mt-3">
            <span style={{ border: "1px solid black", width: "10px", backgroundColor: "#e0e1dd" }} className="p-1   rounded-circle ">
              {imgSrc}
            </span>
          </div>

          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text style={{ fontSize: "11px" }}>{description}</Card.Text>
          </Card.Body>
        </Card>
      </animated.div>
    </Col>
  );
};

export const PremiumCards = () => {
  return (
    <Container className="my-5">
      <Row>
        <PremiumCard
          title="Premium Products"
          description="Our Products are 100% Genuine."
          imgSrc={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-gem"
            >
              <path d="M6 3h12l4 6-10 13L2 9Z" />
              <path d="M11 3 8 9l4 13 4-13-3-6" />
              <path d="M2 9h20" />
            </svg>
          }
          delay={0}
        />
        <PremiumCard
          title="Free Shipping"
          description="We ship all over India for FREE."
          imgSrc={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" /><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" /><circle cx="7" cy="18" r="2" /><path d="M15 18H9" /><circle cx="17" cy="18" r="2" /></svg>}
          delay={200}
        />
        <PremiumCard
          title="Exciting Offers"
          description="We provide amazing offers & discounts on our products."
          imgSrc={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-indian-rupee"><path d="M6 3h12" /><path d="M6 8h12" /><path d="m6 13 8.5 8" /><path d="M6 13h3" /><path d="M9 13c6.667 0 6.667-10 0-10" /></svg>}
          delay={400}
        />
      </Row>
    </Container>
  );
};


export const trendingProducts = (products = [], handleSelect, index, text) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1400 },
      items: 4.5
    },
    desktop: {
      breakpoint: { max: 1400, min: 1101 },
      items: 3.5
    },
    tablet: {
      breakpoint: { max: 1100, min: 881 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 880, min: 680 },
      items: 2.5
    },
    smallmobile: {
      breakpoint: { max: 679, min: 600 },
      items: 2.3
    },
    smallmobile2: {
      breakpoint: { max: 600, min: 565 },
      items: 3.3
    },
    smallmobile1: {
      breakpoint: { max: 565, min: 451 },
      items: 2.04
    },
    smallmobile05: {
      breakpoint: { max: 450, min: 366 },
      items: 2.04, partialVisible: true
    },
    smallmobile0: {
      breakpoint: { max: 365, min: 0 },
      items: 2.04
    }
  };

  const productsArr = products?.map((product) => (
    <SingleProductView id={product?.productId} product={product} />))
  return (
    <div fluid>
      <Col className='section-top'>
        <h2 className="display-4 text-center mb-3" style={{ color: '#333' }}>{text}</h2>
        {/* <p className="lead text-muted text-center ">Discover what makes us unique and why our customers love shopping with us.</p> */}
      </Col>
      {/* <Slider {...settings}> */}
      {/* 
      <Carousel
        swipeable={true}
        draggable={true}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlay={false}
        // autoPlay={this.props.deviceType !== "mobile" ? true : false}
        transitionDuration={700} // Smooth transition
        keyBoardControl={true}
        customTransition="transform 0.7s ease-in-out"
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        additionalTransfrom={0}
        responsive={responsive}> */}

      {/* {productsArr} */}
      {/* <div>∂∂∂¥¥¥</div>
          // <div>∂∂∂¥¥¥</div> */}
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
        loop={true} // Enables infinite looping
        centeredSlides={false}
        breakpoints={{
          1400: { slidesPerView: 4.5 },
          1101: { slidesPerView: 3.5 },
          881: { slidesPerView: 3 },
          680: { slidesPerView: 2.5 },
          600: { slidesPerView: 2.3 },
          565: { slidesPerView: 3.3 },
          451: { slidesPerView: 2.1 },
          366: { slidesPerView: 2.1 },
          0: { slidesPerView: 2.1 }
        }}>
        {products?.map((product) =>
          <SwiperSlide><SingleProductView id={product?.productId} product={product} /></SwiperSlide>)
        }
      </Swiper>
      {/* </Carousel> */}
      {/* <Carousel responsive={responsive}>

        {products?.map((product, index) => (
          <>
            <div key={product.productId} className="">
              <SingleProductView product={product} />
            </div>
          </>
        ))}
      </Carousel> */}
      {/* </MultiCarousel> */}
      {/* </Slider> */}
    </div>
  );
};

export const trendingCollections = (categories) => {
  return (
    <Container>
      <Col className="section-top">
        <h2 className="display-4 text-center" style={{ color: '#333' }}>Collections</h2>
        <p className="lead text-muted text-center ">Discover what makes us unique and why our customers love shopping with us.</p>
      </Col>
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
              className="rounded my-2 scale"
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
                    getCategoryImageUrl(category.categoryId)
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
        <Col md={6} className="my-2  d-flex align-items-center">
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
    <section className="creative-section bgColor" >
      <Container>
        <FeaturedSection />
      </Container>
    </section>
  );
};
