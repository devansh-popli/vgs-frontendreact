import React from "react";
import { Accordion, Badge, Card, Col, Row, Table } from "react-bootstrap";
import { defaultImage, getUserImageUrl } from "../../services/HelperService";

export const SingleUserView = ({ user }) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  return (
    <Card className="mt-3 border shadow-sm">
      <Card.Body>
        <Row>
          <Col
            md={2}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
              }}
              className="rounded"
              src={
                user.imageName
                  ? user.imageName.startsWith("http")
                    ? user.imageName
                    : getUserImageUrl(user.userId)
                  : defaultImage
              }
              alt=""
            />
          </Col>
          <Col md={10} className="">
            <h5>{user.name}</h5>
            <h5>{user.email}</h5>
            <p className="text-muted">{user.about}</p>
            {user.roles.map((role) => {
              return (
                <Badge bg={role.roleName === "ROLE_ADMIN" ? "success" : "info"}>
                  {role.roleName}
                </Badge>
              );
            })}
             <p className="text-muted">Referral Earning: {user?.oneTimeReferralEarning || 0}</p>
             <p className="text-muted">Referral Earning to be sent on first Order:{user?.inActiveMoney || 0}</p>
            {user.bankAccountNumber && user.ifscCode && user.bankName && (
              <Accordion className="mt-3">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <strong>Bank Account Details</strong>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col md={4}>
                        <p className="mb-1 ms-2"><strong>Account Number:</strong></p>
                        <p className="text-muted ms-2">{user.bankAccountNumber}</p>
                      </Col>
                      <Col md={4}>
                        <p className="mb-1"><strong>IFSC Code:</strong></p>
                        <p className="text-muted">{user.ifscCode}</p>
                      </Col>
                      <Col md={4}>
                        <p className="mb-1"><strong>Bank Name:</strong></p>
                        <p className="text-muted">{user.bankName}</p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

            )}
            {user?.directEarningsHistory?.length>0 &&
            <Accordion className="mt-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <strong>Direct Earnings History</strong>
                </Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Total Order Amount</th>
                        <th>Total Commission</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user?.directEarningsHistory.map((earning, index) => (
                        <tr key={index}>
                          <td>
                            {new Date(earning.month).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                            })}
                          </td>
                          <td>₹{earning.totalOrderAmount}</td>
                          <td>₹{earning.totalCommission}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>}
            {user?.indirectEarningsHistory?.length>0 &&
            <Accordion className="mt-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <strong>Indirect Earnings History</strong>
                </Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Total Order Amount</th>
                        <th>Total Commission</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user?.indirectEarningsHistory.map((earning, index) => (
                        <tr key={index}>
                          <td>
                            {new Date(earning.month).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                            })}
                          </td>
                          <td>₹{earning.totalOrderAmount}</td>
                          <td>₹{earning.totalCommission}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>}
            <h6 className="my-3">Total Direct Earnings of Current Month: ₹{user?.directEarningsHistory?.find(record => {
              if (record.month) {
                const recordDate = new Date(record?.month)
                return recordDate.getFullYear() === currentYear && recordDate.getMonth() === currentMonth
              }
            })?.totalCommission || 0}</h6>
 <h6 className="my-3">Total Indirect Earnings of Current Month: ₹{user?.indirectEarningsHistory?.find(record => {
              if (record.month) {
                const recordDate = new Date(record?.month)
                return recordDate.getFullYear() === currentYear && recordDate.getMonth() === currentMonth
              }
            })?.totalCommission || 0}</h6>
          </Col>
        </Row>
        {/* Bank Account Details */}


      </Card.Body>
    </Card>
  );
};
