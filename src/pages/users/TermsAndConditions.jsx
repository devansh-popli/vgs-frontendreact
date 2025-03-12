import React from "react";
import { Container, Card } from "react-bootstrap";

const TermsAndConditions = () => {
  return (
    <Container className="my-5">
      <Card className="shadow-lg p-4">
        <Card.Body>
          <Card.Title className="text-center mb-4">Terms & Conditions</Card.Title>

          <p className="text-muted"><strong>Last Updated:</strong> March 12, 2025</p>

          <p>
            For the purpose of these Terms and Conditions, the terms <strong>"we", "us", "our"</strong> refer to 
            <strong> MARKETMIX</strong>, whose registered/operational office is 
            <strong> HIRA MEHAL COLONY, NABHA Patiala, PUNJAB 147201</strong>. 
            The terms <strong>"you", "your", "user", "visitor"</strong> refer to any natural or legal person 
            who visits our website and/or agrees to purchase from us.
          </p>

          <h5>1. General Terms</h5>
          <p>
            Your use of our website and/or any purchase from us is governed by the following Terms and Conditions.
            The content on this website is subject to change without notice.
          </p>

          <h5>2. Accuracy & Liability</h5>
          <p>
            Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, 
            performance, completeness, or suitability of the information and materials on this website for any 
            particular purpose. You acknowledge that such information may contain errors, and we expressly exclude 
            liability for any such inaccuracies to the fullest extent permitted by law.
          </p>

          <h5>3. User Responsibility</h5>
          <p>
            Your use of any information or materials on our website and/or product pages is entirely at your own risk. 
            It is your responsibility to ensure that any products, services, or information available through our 
            website meet your specific requirements.
          </p>

          <h5>4. Intellectual Property</h5>
          <p>
            Our website contains material that is owned by or licensed to us. This includes, but is not limited to, 
            the design, layout, look, appearance, and graphics. Unauthorized reproduction is prohibited and may 
            result in legal action.
          </p>

          <h5>5. Trademarks</h5>
          <p>
            All trademarks reproduced on our website that are not the property of or licensed to us are acknowledged 
            on the website.
          </p>

          <h5>6. Unauthorized Use</h5>
          <p>
            Unauthorized use of information provided by us may give rise to a claim for damages and/or be considered 
            a criminal offense.
          </p>

          <h5>7. External Links</h5>
          <p>
            From time to time, our website may include links to third-party websites. These links are provided for 
            your convenience to offer additional information. However, we do not endorse or take responsibility for 
            the content of these external sites.
          </p>

          <h5>8. Linking to Our Website</h5>
          <p>
            You may not create a link to our website from another website or document without prior written consent 
            from <strong>MARKETMIX</strong>.
          </p>

          <h5>9. Governing Law & Disputes</h5>
          <p>
            Any disputes arising from the use of our website, purchases made from us, or any engagement with us 
            shall be governed by the laws of <strong>India</strong>.
          </p>

          <h5>10. Payment Authorization</h5>
          <p>
            We shall not be liable for any loss or damage arising directly or indirectly due to the decline of 
            authorization for any transaction, on account of the cardholder having exceeded the preset limit 
            agreed with our acquiring bank.
          </p>

          <h5>11. Disclaimer</h5>
          <p className="text-muted">
            The above content is created at <strong>MARKETMIX’s</strong> sole discretion. 
            <strong>Razorpay</strong> shall not be liable for any content provided here and shall not be responsible 
            for any claims and liability that may arise due to the merchant’s non-adherence to these terms.
          </p>

        </Card.Body>
      </Card>
    </Container>
  );
};

export default TermsAndConditions;
