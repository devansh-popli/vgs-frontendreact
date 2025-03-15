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
import { useContext, useEffect, useState } from "react";
import { getAllProducts, getLiveProducts } from "../services/ProductService";
import React from "react";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import { Row, Col } from "react-bootstrap";
import { Carousel, Container } from "react-bootstrap";
import { getCategories } from "../services/CategoryService";
import { Link } from "react-router-dom";
import ColorfulCards from "../components/users/ColorFullCards";
import CategoriesSection from "../components/users/CategoriesSections";
import { CategoryContext } from "../context/CategoryContext";
export const Index = () => {
  const categoriesContext=useContext(CategoryContext)
  const findProducts = () => {
    getLiveProducts(0, 5, "addedDate", "desc")
      .then((data) => {
        setRecentProducts(data.content);
      })
      .catch((error) => {
        toast.error("Error while getting products");
      });
    getLiveProducts(0, 5, "addedDate", "asc")
      .then((data) => {
        setRecommendedProducts(data.content);
      })
      .catch((error) => {
        toast.error("Error while getting products");
      });
    // getCategories(0, 100)
    //   .then((data) => {
    //     setCategories(data);
    //   })
    //   .catch((error) => {
    //     toast.error("error loading categories");
    //   });

      setCategories(categoriesContext?.categories)
  };
  const [recentProducts, setRecentProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [categories, setCategories] = useState({
    content: [],
  });
  useEffect(() => {
    findProducts();
  //  getCategories();
  }, []);
  useEffect(() => {
  //  getCategories();
  setCategories(categoriesContext?.categories)
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
      src: `https://plus.unsplash.com/premium_photo-1683120945190-42ebfb2b6e7e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
    },
    {
      id: 2,
      caption: "Welcome to our Agro eCommerce Website",
      description:
        "Explore our wide range of agricultural products and make your farming experience better.",
      src: `https://cdn.pixabay.com/photo/2019/02/01/02/43/jewellery-3968328_1280.jpg`,
    },
    {
      id: 3,
      caption: "Welcome to our Agro eCommerce Website",
      description:
        "Explore our wide range of agricultural products and make your farming experience better.",
      src: `https://images.pexels.com/photos/29245554/pexels-photo-29245554/free-photo-of-elegant-diamond-and-emerald-necklace-set-on-display.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
    },
    // Add more items with different images, captions, and descriptions
  ];
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollingDown(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      {/* // <
    //   title="Shop what you need"
    //   description="Welcome to trending Store, We provide best items as you need."
    //   buttonEnabled={true}
    //   buttonText="Start Shopping"
    //   buttonVariant="primary"
    // > */}
      {/* <Container fluid className="text-center py-2 ">
        <Badge pill className="py-2 text-wrap ">
          <span className="d-flex align-items-center">
            <Badge className="py-2 me-2 animpulse" pill bg="success">
              NEW
            </Badge>{" "}
            Get custom designed products by sending us a text on whatsapp
          </span>
        </Badge>
      </Container> */}
      <Carousel
        className="hero-section p-0 m-0 zindex"
        fade
        variant="dark"
        nextIcon={
          <Button
            className="rounded-circle text-dark bg-white"
            style={{ padding: 0, margin: 0 }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="36"
              width="36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
          </Button>
        }
        prevIcon={
          <Button
            className="rounded-circle text-dark bg-white"
            style={{ padding: 0, margin: 0 }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="36"
              width="36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
            </svg>
          </Button>
        }
      >
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
                <Button
                  variant="light"
                  as={Link}
                  to={"/store"}
                  className={`rounded fw-bold text-capitalize zoom-button themebgColor text-white ${isScrollingDown ? "" : "hide-button"
                    }`}
                >
                  Shop Now
                </Button>
              </Container>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <Container fluid className="new-section">
        {trendingCollections(categories?.content)}
      </Container>
      <div className="mt-5 ">
        <CategoriesSection />
      </div>
      <div fluid className=" new-section">
        {trendingProducts(recentProducts, handleSelect, index, 'Best Selling Products')}
      </div>



      {/* <div>
        <AboutUs />
      </div> */}
      <div>{creativeSection()}</div>
      <div fluid className="new-section">
        {trendingProducts(recentProducts, handleSelect, index, 'Recommended for You')}
      </div>
    </>
  );
};
