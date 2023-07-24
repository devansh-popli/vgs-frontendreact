import { Button, Card } from "react-bootstrap";
import { Base } from "../components/Base";
import { toast } from "react-toastify";
// import { Cart } from "../pages/cart"
import axios from "axios";
import {
  creativeSection,
  infoWithImageInLeftSection,
  infoWithImageInRightSection,
  trendingProducts,
} from "../components/users/HomePageSections";
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/ProductService";
import React from "react";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import { Row, Col } from "react-bootstrap";
import { Carousel, Container } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
export const Index = () => {
  const findProducts = () => {
    getAllProducts(0, 5, "addedDate", "desc")
      .then((data) => {
        setRecentProducts(data.content);
      })
      .catch((error) => {
        toast.error("Error while getting products");
      });
  };
  const [recentProducts, setRecentProducts] = useState(null);
  useEffect(() => {
    findProducts();
  }, []);
  const [sliderImages, setSliderImages] = useState([]);
  const unsplashAccessKey = "YOUR_UNSPLASH_ACCESS_KEY";
  const unsplashUrl = `https://source.unsplash.com/random?nature`;
  const carouselItems = [
    {
      id: 1,
      caption: "Welcome to our Agro eCommerce Website",
      description:
        "Explore our wide range of agricultural products and make your farming experience better.",
      src: `https://source.unsplash.com/random?farming&pesticides&client_id=${unsplashAccessKey}`,
    },
    {
      id: 2,
      caption: "Welcome to our Agro eCommerce Website",
      description:
        "Explore our wide range of agricultural products and make your farming experience better.",
      src: `https://source.unsplash.com/random?agro&client_id=${unsplashAccessKey}`,
    },
    {
      id: 3,
      caption: "Welcome to our Agro eCommerce Website",
      description:
        "Explore our wide range of agricultural products and make your farming experience better.",
      src: `https://source.unsplash.com/random?farming&client_id=${unsplashAccessKey}`,
    },
    // Add more items with different images, captions, and descriptions
  ];

  return (
    <>
      {/* // <
    //   title="Shop what you need"
    //   description="Welcome to trending Store, We provide best items as you need."
    //   buttonEnabled={true}
    //   buttonText="Start Shopping"
    //   buttonVariant="primary"
    // > */}
      <Carousel className="hero-section" fade>
        {carouselItems.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              className="d-block w-100"
              src={item.src}
              alt={`Slide ${item.id}`}
            />
            <Carousel.Caption>
              <Container className="d-flex flex-column justify-content-center ">
                <h1>{item.caption}</h1>
                <p>{item.description}</p>
                {/* Add any additional components or elements you want in the hero section */}
              </Container>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <Container fluid className="mb-5">
      
        {trendingProducts(recentProducts)}
      </Container>
      {/* <div className="my-5 mt-5">
        {infoWithImageInRightSection(
          "https://random.imagecdn.app/500/150",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi earum repellat?",
          "Lorem123"
        )}
      </div>
      <div className="my-5">
        {infoWithImageInLeftSection(
          "https://random.imagecdn.app/500/150",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi earum repellat?",
          "Lorem123"
        )}
      </div> */}
      <div className="my-5">
        {/* <Card>
          <Card.Body> */}
        <ContactUs />
        {/* </Card.Body>
        </Card> */}
      </div>
      <div>
        <AboutUs />
      </div>
      <div>{creativeSection()}</div>
    </>
  );
};
