import React from "react";
import { Container, Card } from "react-bootstrap";

const PrivacyPolicy = () => {
  return (
    <Container className="my-5">
      <Card className="shadow-lg p-4">
        <Card.Body>
          <Card.Title className="text-center mb-4">Privacy Policy</Card.Title>

          <p className="text-muted"><strong>Last Updated:</strong> March 12, 2025</p>

          <p>
            This Privacy Policy explains how <strong>MARKETMIX</strong> collects, uses, and protects any 
            information that you provide when you visit our website and/or make a purchase from us.
          </p>

          <h5>1. Commitment to Privacy</h5>
          <p>
            MARKETMIX is committed to ensuring that your privacy is protected. If we ask you to provide 
            certain information that identifies you when using our website, you can be assured that it 
            will only be used in accordance with this privacy statement.
          </p>

          <p>
            MARKETMIX may update this policy from time to time. You should check this page periodically 
            to stay informed of any changes.
          </p>

          <h5>2. Information We Collect</h5>
          <p>We may collect the following information:</p>
          <ul>
            <li>Name</li>
            <li>Contact information, including email address</li>
            <li>Demographic information such as postcode, preferences, and interests</li>
            <li>Other information relevant to customer surveys and offers</li>
          </ul>

          <h5>3. How We Use This Information</h5>
          <p>We collect this information to understand your needs and provide you with a better service, including:</p>
          <ul>
            <li>Internal record-keeping</li>
            <li>Improving our products and services</li>
            <li>Sending promotional emails about new products, special offers, or other relevant updates</li>
            <li>Conducting market research via email, phone, or mail</li>
            <li>Customizing the website according to your interests</li>
          </ul>

          <h5>4. Information Security</h5>
          <p>
            We are committed to ensuring that your information is secure. To prevent unauthorized access or disclosure, 
            we have implemented suitable security measures to safeguard the data we collect online.
          </p>

          <h5>5. Use of Cookies</h5>
          <p>
            A cookie is a small file placed on your computer's hard drive to help analyze web traffic and tailor 
            website operations to your preferences.
          </p>
          <p>
            We use traffic log cookies to analyze webpage traffic and improve our website to meet customer needs. 
            This information is used solely for statistical analysis and is removed from the system afterward.
          </p>
          <p>
            Cookies help us provide a better website experience, but they do not give us access to your computer 
            or any personal information beyond what you choose to share.
          </p>
          <p>
            You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you 
            can modify your settings to decline them if you prefer. However, this may limit your ability to use 
            certain features of the website.
          </p>

          <h5>6. Controlling Your Personal Information</h5>
          <p>You may choose to restrict the collection or use of your personal information in the following ways:</p>
          <ul>
            <li>
              When filling out a form on the website, look for an option to indicate that you do not want the 
              information to be used for direct marketing purposes.
            </li>
            <li>
              If you have previously agreed to let us use your information for direct marketing, you can change 
              your preference at any time by contacting us.
            </li>
          </ul>

          <p>
            We will not sell, distribute, or lease your personal information to third parties unless we have your 
            permission or are required by law to do so. If you wish to receive promotional information from third 
            parties, you can opt in accordingly.
          </p>

          <h5>7. Updating Your Personal Information</h5>
          <p>
            If you believe that any information we are holding about you is incorrect or incomplete, please write to:
          </p>
          <p><strong>HIRA MEHAL COLONY, NABHA Patiala, PUNJAB 147201</strong></p>
          <p>
            You can also contact us via email at <a href="mailto:support@marketmix.co.in">support@marketmix.co.in</a>, 
            and we will promptly correct any incorrect information.
          </p>

          <h5>8. Disclaimer</h5>
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

export default PrivacyPolicy;
