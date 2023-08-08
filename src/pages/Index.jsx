import { Badge, Button, Card } from "react-bootstrap";
import { Base } from "../components/Base";
import { toast } from "react-toastify";
// import { Cart } from "../pages/cart"
import axios from "axios";
import {
  creativeSection,
  infoWithImageInLeftSection,
  infoWithImageInRightSection,
  trendingCollections,
  trendingProducts,
} from "../components/users/HomePageSections";
import { useEffect, useState } from "react";
import { getAllProducts, getLiveProducts } from "../services/ProductService";
import React from "react";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import { Row, Col } from "react-bootstrap";
import { Carousel, Container } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getCategories } from "../services/CategoryService";
import { Link } from "react-router-dom";
export const Index = () => {
  const findProducts = () => {
    getLiveProducts(0, 5, "addedDate", "desc")
      .then((data) => {
        setRecentProducts(data.content);
      })
      .catch((error) => {
        toast.error("Error while getting products");
      });
      getCategories(0,100)
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        toast.error("error loading categories");
      })
  };
  const [recentProducts, setRecentProducts] = useState(null);
  const [categories, setCategories] = useState({
    content: [],
  });
  useEffect(() => {
    findProducts();
    getCategories()
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
      src: `https://source.unsplash.com/random?wallets&gifts&client_id=${unsplashAccessKey}`,
    },
    {
      id: 2,
      caption: "Welcome to our Agro eCommerce Website",
      description:
        "Explore our wide range of agricultural products and make your farming experience better.",
      src: `https://source.unsplash.com/random?watches&client_id=${unsplashAccessKey}`,
    },
    {
      id: 3,
      caption: "Welcome to our Agro eCommerce Website",
      description:
        "Explore our wide range of agricultural products and make your farming experience better.",
      src: `https://source.unsplash.com/random?jwellery&client_id=${unsplashAccessKey}`,
    },
    // Add more items with different images, captions, and descriptions
  ];
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollingDown(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      {/* // <
    //   title="Shop what you need"
    //   description="Welcome to trending Store, We provide best items as you need."
    //   buttonEnabled={true}
    //   buttonText="Start Shopping"
    //   buttonVariant="primary"
    // > */}
    <Container fluid className="text-center py-2 ">
      <Badge pill className="py-2 text-wrap "><span className="d-flex align-items-center"><Badge className="py-2 me-2 animpulse"  pill bg="success">NEW</Badge> Get custom designed products by sending us a text on whatsapp</span></Badge>
    </Container>
      <Carousel className="hero-section px-1" fade variant="dark" nextIcon={<Button className="rounded-circle text-dark bg-white"style={{padding:0,margin:0}}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="36" width="36" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg></Button>} prevIcon={<Button className="rounded-circle text-dark bg-white" style={{padding:0,margin:0}}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="36" width="36" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg></Button>}>
        {carouselItems.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              className="d-block w-100"
              src={item.src}
              alt={`Slide ${item.id}`}
            />
            <Carousel.Caption className="d-flex  justify-content-center align-items-end ">
              <Container>
                {/* <h1>{item.caption}</h1>
                <p>{item.description}</p> */}
                {/* Add any additional components or elements you want in the hero section */}
                <Button variant="light" as={Link} to={"/store"} className={`rounded fw-bold text-capitalize zoom-button ${isScrollingDown ? '' : 'hide-button'}`}>Shop Now</Button>
              </Container>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <Container fluid className="my-4">
      
      {trendingCollections(categories.content)}
    </Container>
      <Container fluid className="my-4">
      
        {trendingProducts(recentProducts)}
      </Container>
 
      <div className="my-5">
        <ContactUs />
      </div>
      {/* <div>
        <AboutUs />
      </div> */}
      <div>{creativeSection()}</div>
    </>
  );
};
