import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const AboutUs = () => {
  return (
    // <section className="about-section">
      <Container className='mt-5'>
        <Row>
          <Col md={5} className='d-flex align-items-center my-2'>
            <Image src={"https://source.unsplash.com/random?agriculture"} style={{height:"320px",width:"100%",objectFit:"contain"}} alt="About Us" fluid />
          </Col>
          <Col md={6}>
            <div className="mt-3 about-content d-flex flex-column justify-content-center">
              <h2>About Agro Service Center</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus ante in elit accumsan
                tincidunt. Proin pretium metus vel elit consectetur, vel semper orci volutpat. Fusce laoreet sem
                id dolor consequat, at ullamcorper dolor convallis. Integer finibus est quis congue pharetra.
              </p>
              <p>
                Sed vel sagittis nunc. Praesent fringilla dapibus libero. Donec auctor purus ac velit venenatis,
                a facilisis nisl eleifend. In sit amet ligula metus. Aenean laoreet felis non tellus eleifend
                feugiat.
              </p>
              <p>
                Donec tempor augue sit amet neque pulvinar vestibulum. Morbi in leo vitae nisl interdum posuere.
                Integer a tristique velit, id sollicitudin turpis. Vivamus id felis nec metus euismod
                sollicitudin.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    // </section>
  );
};

export default AboutUs;
