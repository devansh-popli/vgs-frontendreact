import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const cardStyles = {
  borderRadius: "15px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  border: "0",
  height: "260px",
  width: "300px",
  cursor: "pointer",
};

const ColorfulCards = () => {
  const colors = ["#FFD700", "#87CEEB", "#FF69B4", "#98FB98"];

  return (
   
      <Row>
        {colors.map((color, index) => (
          <Col md={3} sm={6} xs={6}>
            <Card className="cardStyle my-2" key={index} style={{ ...cardStyles, background: color }}>
              <Card.Img
               className="mobText rounded-3" 
                variant="top"
                src={`https://source.unsplash.com/random?ring/${index + 1}`}
                style={{ height: "60%" }}
              />
              <Card.Body>
                <Card.Title className="mobText1 text-center" style={{  fontWeight: "bold" }}>
                  {getTitleByIndex(index)}
                </Card.Title>
                <Card.Text  className="mobText text-center" > {getDescriptionByIndex(index)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
  );
};

const getTitleByIndex = (index) => {
  switch (index) {
    case 0:
      return "Special Picks";
    case 1:
      return "New At Jivu";
    case 2:
      return "Beauty Under ₹499";
    case 3:
      return "Best Of Luxury";
    default:
      return "";
  }
};

const getDescriptionByIndex = (index) => {
  switch (index) {
    case 0:
      return "At Min. 40% Off";
    case 1:
      return "";
    case 2:
      return "";
    case 3:
      return "";
    default:
      return "";
  }
};

export default ColorfulCards;
