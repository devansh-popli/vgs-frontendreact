import React from "react";
import { Container, Card } from "react-bootstrap";

const RefundPolicy = () => {
  return (
    <Container className="my-5">
      <Card className="shadow-lg p-4">
        <Card.Body>
          <Card.Title className="text-center mb-4">Cancellation & Refund Policy</Card.Title>

          <p className="text-muted"><strong>Last Updated:</strong> March 12, 2025</p>

          <p>
            <strong>MARKETMIX</strong> believes in helping its customers as much as possible and follows a liberal 
            cancellation policy. Below are the terms regarding cancellations and refunds:
          </p>

          <h5>1. Cancellation Policy</h5>
          <p>
            Cancellations will be considered only if the request is made within <strong>9-15 days</strong> of placing the order. 
            However, the cancellation request may not be entertained if the order has already been processed, shipped, 
            or communicated to vendors/merchants.
          </p>
          <p>
            <strong>Exclusions:</strong> MARKETMIX does not accept cancellation requests for perishable items such as 
            flowers, food, or other consumables. However, refunds/replacements may be provided if the customer 
            establishes that the delivered product was of poor quality.
          </p>

          <h5>2. Reporting Damaged or Defective Items</h5>
          <p>
            If you receive a damaged or defective product, please report the issue to our 
            <strong> Customer Service team</strong> within <strong>9-15 days</strong> of receiving the product. 
            The request will be entertained only after the merchant has verified and confirmed the issue.
          </p>

          <h5>3. Product Mismatch or Quality Concerns</h5>
          <p>
            If the product received does not match the description on our website or does not meet your expectations, 
            please inform our <strong>Customer Service</strong> within <strong>9-15 days</strong> of receiving the product. 
            After reviewing your complaint, our team will take an appropriate decision.
          </p>

          <h5>4. Manufacturer Warranty Products</h5>
          <p>
            For products that come with a manufacturer's warranty, any issues should be directly addressed with 
            the manufacturer. MARKETMIX is not responsible for such warranty-related claims.
          </p>

          <h5>5. Refund Process</h5>
          <p>
            In case a refund is approved by <strong>MARKETMIX</strong>, it will be processed within 
            <strong>6-8 business days</strong> and credited back to the customer’s original payment method.
          </p>

          <h5>6. Disclaimer</h5>
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

export default RefundPolicy;
