import React from "react";
import { Container, Card } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaBuilding } from "react-icons/fa";

const ContactUs = () => {
  return (
    <Container className="my-5">
      <Card className="shadow-lg p-4 text-muted">
        <Card.Body>
          <Card.Title className="text-center mb-4">Contact Us</Card.Title>

          <p className="text-muted text-center"><strong>Last Updated:</strong> March 12, 2025</p>

          <h5><FaBuilding className="me-2 text-muted" /> Merchant Legal Entity Name</h5>
          <p className="text-muted"><strong>MARKETMIX</strong></p>

          <h5><FaMapMarkerAlt className="me-2 text-muted" /> Registered Address</h5>
          <p className="text-muted">HIRA MEHAL COLONY, NABHA, Patiala, PUNJAB 147201</p>

          <h5><FaMapMarkerAlt className="me-2 text-muted" /> Operational Address</h5>
          <p className="text-muted">HIRA MEHAL COLONY, NABHA, Patiala, PUNJAB 147201</p>

          <h5><FaPhoneAlt className="me-2 text-muted" /> Telephone No.</h5>
          <p className="text-muted"><a href="tel:+918699262832" className="text-muted">+91 9855 843431</a></p>

          <h5><FaEnvelope className="me-2 text-muted" /> Email ID</h5>
          <p className="text-muted">
            <a href="mailto:support@marketmix.co.in" className="text-muted">support@marketmix.co.in</a>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ContactUs;
