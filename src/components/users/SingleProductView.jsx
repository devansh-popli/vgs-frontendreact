import React, { useContext, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { getProductImageUrl } from "../../services/HelperService";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const SingleProductView = ({ product, width }) => {
  const navigate = useNavigate();
  const [copySuccess, setCopySuccess] = useState('');
  const navigateToProductsView = () => {
    navigate(`/products/${product?.productId}`);
  };
  const userContext=useContext(UserContext)

  const copyToClipBoard=async (productId)=>{
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
  return (
    <Card
     
      className="shadow border-0 mb-2 singleProd rounded"
      style={{ cursor: "pointer", marginLeft: "" }}
    >
      <>
      <div className=" d-flex justify-content-center align-items-center"  onClick={navigateToProductsView}>
          <img
            style={{ objectFit: "cover" }}
            className="w-100 productImg"
            src={getProductImageUrl(product?.productId)}
            alt=""
          />
        </div>
      </>
      <Card.Body className="">
        {/* <h6 className="ms-2 text-capitalize text-secondary">
          {product.categories &&
          product.categories?.length > 0 &&
          product?.categories[0]?.title?.length < 20
            ? product?.categories[0]?.title
            : product?.categories[0]?.title.substring(0, 20) + "..."}
        </h6> */}
        <h6 className="ms-2 text-capitalize text-gray font"  onClick={navigateToProductsView}>
          {product.title && product.title?.length < 22
            ? product?.title
            : product?.title.substring(0, 22) + "..."}
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
        <div style={{display:"flex",justifyContent:"end"}}>
          <Button onClick={()=>copyToClipBoard(product?.productId)} size='sm' className='themeBorderColor font themeColor mb-2 ' variant={'outline-success'}> {copySuccess ? copySuccess:'Copy Affilate Link'}</Button>
        </div>
}
        <div className="d-grid mb-2">
          <Button size='sm' className='gradientBgColor text-dark font' variant={'success'}>Add to Cart</Button>
        </div>
      </div>
    </Card>
  );
};

export default SingleProductView;
