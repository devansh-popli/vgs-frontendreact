import React from 'react';
import { IconContext } from 'react-icons';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';

// Import the payment logo from the assets folder
// import acceptedPaymentLogo from ''; // Replace with your actual image file name and extension

export const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <Container>
        <Row className="text-center">
          <Col>
            <h4 className='fw-bold'>Brand Name</h4>
            <p>A short description of your brand</p>
            <p>Contact Email: example@example.com</p>
          </Col>
          <Col>
            <h4 className='fw-bold'>Follow Us</h4>
            <IconContext.Provider value={{ size: '2em' }}>
              <div>
                <a
                  href="https://facebook.com/your-github-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light me-4"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.instagaram.com/in/your-linkedin-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light me-4"
                >
                  <FaFacebook />
                </a>
              </div>
            </IconContext.Provider>
            {/* Display the accepted payment logo */}
            <img
              src={"../../assets/pay.png"}
              alt="Accepted Payment Methods"
              style={{ maxWidth: '150px', marginTop: '1rem' }}
            />
          </Col>
        </Row>
        <Row className="text-center mt-4">
          <Col>
            {/* <p>Created by Devansh</p> */}
            <p>All Rights Reserved &copy; {new Date().getFullYear()}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};


