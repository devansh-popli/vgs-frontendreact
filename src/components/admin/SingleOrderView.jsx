import React from "react";
import { Badge, Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { formatDate } from "../../services/HelperService";
import { Link } from "react-router-dom";
import { isAdminUser } from "../../auth/HelperAuth";

export const SingleOrderView = ({
  order,
  openViewOrderModel,
  openUpdateOrderModel,
  isBusinessUser
}) => {
  return (
    <div>
      <Card className="border-0 shadow mb-5">
        <Card.Body>
          <Row className="mb-3">
            <Col>
              <b>Order Id: </b> {order.orderId}
            </Col>
            <Col>
              <b>Ordered By: </b>
              <Link
                className="text-muted"
                to={`/users/profile/${order.user.userId}`}
              >
                {order.user.name}
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table bordered striped>
                <tbody>
                  <tr>
                    <td>Billing Name</td>
                    <td>{order.billingName}</td>
                  </tr>
                  <tr>
                    <td>Billing Phone</td>
                    <td>{order.billingPhone}</td>
                  </tr>
                  <tr>
                    <td>Order Items</td>
                    <td>{order.orderItems.length}</td>
                  </tr>
                  <tr>
                    <td>Order Status</td>
                    <td>{order.orderStatus}</td>
                  </tr>
                  {isBusinessUser &&
                    <>
                      <tr>
                        <td>Referred By</td>
                        <td> <Badge bg={order?.childUser?.name && "success"}>{order?.childUser?.name || 'You'}</Badge></td>
                      </tr>
                      <tr>
                        <td>Your Earnings</td>
                        <td> ₹ {order?.yourCommission}</td>
                      </tr>
                    </>
                  }
                  <tr
                    className={
                      order.paymentStatus === "NOTPAID"
                        ? "table-danger"
                        : "table-success"
                    }
                  >
                    <td>Payment Status</td>
                    <td>{order.paymentStatus}</td>
                  </tr>
                  <tr>
                    <td>Ordered Date</td>
                    <td>{formatDate(order.orderedDate)}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Container className="text-center">
            <Button
              variant="info"
              size="sm"
              onClick={(event) => openViewOrderModel(event, order)}
            >
              View Details
            </Button>
            {isAdminUser() && (
              <Button
                variant="danger"
                className="ms-2"
                size="sm"
                onClick={(event) => openUpdateOrderModel(event, order)}
              >
                Update Order
              </Button>
            )}
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
};
