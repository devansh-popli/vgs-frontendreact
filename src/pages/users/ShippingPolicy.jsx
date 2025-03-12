import React from "react";
import { Container, Card } from "react-bootstrap";

const ShippingPolicy = () => {
  return (
    <Container className="my-5">
      <Card className="shadow-lg p-4">
        <Card.Body>
          <Card.Title className="text-center mb-4">Shipping & Delivery Policy</Card.Title>

          <p className="text-muted"><strong>Last Updated:</strong> March 12, 2025</p>

          <h5>1. Shipping for International & Domestic Buyers</h5>
          <p>
            For <strong>International buyers</strong>, orders are shipped and delivered through registered 
            international courier companies and/or International Speed Post only.
          </p>
          <p>
            For <strong>Domestic buyers</strong>, orders are shipped through registered domestic courier 
            companies and/or Speed Post only.
          </p>

          <h5>2. Order Processing & Delivery Time</h5>
          <p>
            Orders are shipped within <strong>6-8 days</strong> or as per the delivery date agreed upon at the time 
            of order confirmation. Delivery timelines are subject to courier company or postal service norms.
          </p>
          <p>
            MARKETMIX is not responsible for any delays caused by courier services or postal authorities. 
            However, we guarantee to hand over the consignment to the courier company or postal service 
            within <strong>6-8 days</strong> from the date of order and payment, or as per the agreed delivery date 
            during order confirmation.
          </p>

          <h5>3. Delivery Address & Confirmation</h5>
          <p>
            All orders will be delivered to the address provided by the buyer at the time of purchase. 
            A confirmation of the delivery will be sent to the email ID provided during registration.
          </p>

          <h5>4. Customer Support</h5>
          <p>
            If you face any issues while utilizing our services, please contact our helpdesk:
          </p>
          <ul>
            <li><strong>Phone:</strong> 8699262832</li>
            <li><strong>Email:</strong> <a href="mailto:support@marketmix.co.in">support@marketmix.co.in</a></li>
          </ul>

          <h5>5. Disclaimer</h5>
          <p className="text-muted">
            The above content is created at <strong>MARKETMIX’s</strong> sole discretion. 
            <strong>Razorpay</strong> shall not be liable for any claims arising due to the merchant’s 
            non-adherence to these terms.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ShippingPolicy;
