import React, { useContext, useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';
import { getCategories } from '../services/CategoryService';
import { Link ,NavLink} from "react-router-dom";
import { CategoryContext } from '../context/CategoryContext';
// Import the payment logo from the assets folder
// import acceptedPaymentLogo from ''; // Replace with your actual image file name and extension

export const Footer = () => {
  const [categories, setcategories] = useState([])
  const categoriesContext=useContext(CategoryContext);
  useEffect(() => {

    // getCategories().then(data => {
    //   console.log(data)
    //   setcategories(data.content)
    // })
    setcategories(categoriesContext?.categories?.content)
  }, [categoriesContext])

  return (
    <footer className=" footerColor text-white mt-5 py-4">
      <Container>
        <Row className="text-center">
          <Col>
            <img
              src={`${process.env.PUBLIC_URL}/marketmixlogofooter.png`}
              alt="logo"
              style={{ maxWidth: "20%", minWidth: "130px" }}
            />
            {/* <h4 className='fw-bold'>Brand Name</h4> */}
            <ul className='d-flex flex-wrap mt-4 justify-content-center' style={{ listStyle: "none", margin: "0 2rem" }}>
              <NavLink as={NavLink} to="/login" className='mx-5 my-2' style={{ cursor: "pointer",textDecoration:'none',color:"white" }}>Login</NavLink>
              <Link style={{ cursor: "pointer",textDecoration:'none',color:"white" }} as={NavLink} to="/register" className='mx-5 my-2'>Signup</Link>

              {
                categories?.map(cat => (
                  <Link style={{ cursor: "pointer",textDecoration:'none',color:"white" }} as={Link} to={`/store/category/products/${cat.categoryId}/${cat.title}`} className='mx-5 my-2'>{cat.title}</Link>
                ))
              }
              <Link style={{ cursor: "pointer",textDecoration:'none',color:"white" }} as={Link} to={"/contactus"} className='mx-5 my-2'>Contact Us</Link>
              <Link style={{ cursor: "pointer",textDecoration:'none',color:"white" }} as={Link} to="/terms" className='mx-5 my-2'>Terms and Conditions</Link>
              <Link style={{ cursor: "pointer",textDecoration:'none',color:"white" }} as={Link} to="/returnpolicy" className='mx-5 my-2'>Refund Policy</Link>
              <Link style={{ cursor: "pointer",textDecoration:'none',color:"white" }} as={Link} to="/privacypolicy" className='mx-5 my-2'>Privacy Policy</Link>
              <Link style={{ cursor: "pointer",textDecoration:'none',color:"white" }} as={Link} to="/shippingpolicy" className='mx-5 my-2'>Shipping Policy</Link>
            </ul>
            {/* <p>A short description of your brand</p>
            <p>Contact Email: example@example.com</p> */}
          </Col>
          {/* <Col>
            <h4 className='fw-bold'>Quick Links</h4>
            <ul>
              <li>Login</li>
              <li>Signup</li>
              {
                categories?.map(cat => (
                  <li>{cat.title}</li>
                ))
              }
            </ul>
          </Col>``` */}
          {/* <Col>
            <h4 className='fw-bold'>Follow Us</h4>
            <IconContext.Provider value={{ size: '2em' }}>
              <div>
                <a
                  href="https://facebook.com/your-github-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark me-4"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.instagaram.com/in/your-linkedin-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark   me-4"
                >
                  <FaFacebook />
                </a>
              </div>
            </IconContext.Provider>
            <img
              src={"../../assets/pay.png"}
              alt="Accepted Payment Methods"
              style={{ maxWidth: '150px', marginTop: '1rem' }}
            />
          </Col> */}
        </Row>
        <Row className="text-center mt-5 py-4 d-flex flex-wrap justify-content-between  align-items-center" style={{ borderTop: "0.1px solid rgba(255, 255, 255, 0.5)" }}        >
          <Col className=''>
            <IconContext.Provider value={{ size: '2em' }}>
              <div className='d-flex justify-content-center align-items-center'>
                <a
                  href="https://facebook.com/your-github-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white me-4"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.instagaram.com/in/your-linkedin-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white   me-4"
                >
                  <FaFacebook />
                </a>
                <img
                  src={"../../assets/pay.png"}
                  alt="Accepted Payment Methods"
                  style={{ maxWidth: '150px' }}
                />
              </div>

            </IconContext.Provider>

          </Col>
          <Col className='d'>
            <p>All Rights Reserved &copy; {new Date().getFullYear()}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};


