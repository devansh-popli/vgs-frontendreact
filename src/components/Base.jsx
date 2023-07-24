import React from "react";
import { Button, Container } from "react-bootstrap";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";

export const Base = ({
  title = "ElectroStore",
  description = "Welcome to Your Store",
  buttonText = "Show Now",
  buttonVariant="primary",
  buttonLink="/",
  buttonEnabled=false,
  children
  
}) => {
  return (
    <div>
      <Container
        fluid
        className="bg-dark p-5  d-flex align-items-center justify-content-center text-center"
      >
        <div className="">
          <h3 className="text-white">{title}</h3>
          <p className="text-white">{description && description}</p>
         {buttonEnabled && <Button as={Link} to={buttonLink} variant={buttonVariant}>
            {buttonText}
          </Button>}
        </div>
      </Container>
      {children}
      {/* <Footer /> */}
    </div>
  );
};
