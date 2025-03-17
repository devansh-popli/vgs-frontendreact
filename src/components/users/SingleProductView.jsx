import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Carousel, Container, OverlayTrigger } from "react-bootstrap";
import { getProductImageUrl } from "../../services/HelperService";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { getAllProductImages } from "../../services/ProductService";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { Tooltip } from "react-bootstrap";
const SingleProductView = ({ product, width }) => {
  const navigate = useNavigate();
  const [copySuccess, setCopySuccess] = useState('');
  const navigateToProductsView = () => {
    navigate(`/products/${product?.productId}`);
  };
  const userContext = useContext(UserContext)
  const { addItem, showCart, setShowCart, cart } = useContext(CartContext);
  const copyToClipBoard = async (productId) => {
    try {
      const url = `${window.location.origin}/products/${productId}/${userContext?.userData?.referralCode}`;
      await navigator.clipboard.writeText(url);
      setCopySuccess('Link copied!');
      setTimeout(() => {
        setCopySuccess(''); // Reset text after 2 seconds
      }, 2000);
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  }
  const [images, setImages] = useState([])
  useEffect(() => {
    getAllProductImages(product?.productId).then(data => {
      setImages(data)
    }).catch(err => {
      toast.error("error while fetching product images")
    })
  }, [])
  const shareProduct = (id) => {
    try {
      console.log("first")
      if (navigator.share) {
        navigator.share({
          title: "Check out this product!",
          text: "I found this amazing product for you.",
          url: `${window.location.origin}/products/${id}`
        })
          .then(() => toast.success("Product shared successfully"))
          .catch((error) => console.log("error"));
      } else {
        toast.error("Sharing is not supported in this browser.");
      }
    }
    catch (e) {
      console.log(e + "e")
    }
  }

  return (
    <Card

      className="shadow border-0 mb-2 singleProd rounded"
      style={{ cursor: "pointer", marginLeft: "" }}
    >
      <>
        <Carousel indicators={false}>
          {images?.map((imageUrl, index) => (
            <Carousel.Item key={index}>
              <div
                className="d-flex justify-content-center align-items-center"
                onClick={navigateToProductsView}
              >
                <img
                  style={{ objectFit: "cover", cursor: "pointer", position: "relative" }}
                  className="w-100 productImg"
                  src={imageUrl}
                  alt={`Product Image ${index + 1}`}
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

      </>
      <Card.Body className="">
        {/* <h6 className="ms-2 text-capitalize text-secondary">
          {product.categories &&
          product.categories?.length > 0 &&
          product?.categories[0]?.title?.length < 20
            ? product?.categories[0]?.title
            : product?.categories[0]?.title.substring(0, 20) + "..."}
        </h6> */}

        <Button className="gradientBgColor mx-2 p-0 m-0" style={{ zIndex: 1000, position: "absolute", bottom: "100", right: "0" }} onClick={() => shareProduct(product.productId)}><FaRegShareFromSquare className="w-5 h-5 mx-2" /></Button>
        <h6 className="ms-2 text-capitalize text-gray font" onClick={navigateToProductsView}>
          {product.title && product.title?.length < 19
            ? product?.title
            : product?.title.substring(0, 19) + "..."}
        </h6>
        <Container className="text-start font">
          <b>
            <span className="h6 text-muted font">
              <s>₹{product?.price}</s>
            </span>
          </b>
          <b>
            <span className=" h6 ms-2 font">₹{product?.discountedPrice}</span>
          </b>
        </Container>
      </Card.Body>
      <div className="px-2">
        {
          userContext.isBusinessUser &&
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={() => shareProduct(product?.productId)} size='sm' className='themeBorderColor font themeColor mb-2 ' variant={'outline-success'}> {copySuccess ? copySuccess : 'Copy Affilate Link'}</Button>
          </div>
        }
        <div className="d-grid mb-2">
          <Button onClick={() => {
            if (
              (cart.items.filter(
                (prod) => prod.product.productId == product.productId
              ).length == 0 &&
                product?.quantity > 0) ||
              cart?.items.filter(
                (prod) => prod.product.productId == product.productId
              )[0].quantity < product.quantity
            ) {
              addItem(product, 1);
              setShowCart(true);
            } else {
              toast.info("No more Quantity in Stock");
            }
          }} size='sm' className='gradientBgColor text-white font' variant={'success'}>Add to Cart</Button>
        </div>
      </div>
    </Card>
  );
};

export default SingleProductView;
