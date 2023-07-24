import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { getOrdersOfUser } from "../../services/OrderService";
import { useEffect } from "react";
import { useState } from "react";
import { Badge, Button, Card, Col, Container, ListGroup, ListGroupItem, Modal, Row, Table } from "react-bootstrap";
import { SingleOrderView } from "../../components/admin/SingleOrderView";
import { formatDate, getProductImageUrl } from "../../services/HelperService";

export const LoadOrders = () => {
  const { userData, isLogin } = useContext(UserContext);
  const [ordersData, setOrdersData] = useState(null);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const openViewOrderModel = (event, orderModal) => {
    setSelectedOrder(orderModal);
    handleShow();
  };
  const loadOrderOfUsers = async (userId) => {
    try {
      const data = await getOrdersOfUser(userId);
      setOrdersData(data);
    } catch (e) {
      toast.error("error while loading orders");
    }
  };
  useEffect(() => {
    if (isLogin) loadOrderOfUsers(userData.userId);
  }, [isLogin]);
  const ordersView = () => {
    return (
      <Card className="shadow-sm mt-3">
        <Card.Body>
          <h3 className="m-3">Your Previous Orders</h3>
          {ordersData?.length > 0 ? (
            <>
              {ordersData?.map((order) => {
                return (
                  <SingleOrderView
                    openViewOrderModel={openViewOrderModel}
                    key={order.orderId}
                    order={order}
                  />
                );
              })}
            </>
          ):(
            <div className="h5 fw-bold text-center mt-4 text-secondary">No Items in Your Order</div>
          )}
        </Card.Body>
      </Card>
    );
  };
  const orderViewModal = () => {
    return (
      { selectedOrder } && (
        <Modal size="xl" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-muted">Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-3">
              <Col>
                <b>Order Id: </b> {selectedOrder.orderId}
              </Col>
              <Col>
                <b>Billing Name: </b>
                {selectedOrder.billingName}
              </Col>
            </Row>
            <Row>
              <Col>
                <Table bordered striped>
                  <tbody>
                    <tr>
                      <td>Billing Phone</td>
                      <td>{selectedOrder.billingPhone}</td>
                    </tr>
                    <tr>
                      <td>Order Items</td>
                      <td>{selectedOrder.orderItems?.length}</td>
                    </tr>
                    <tr>
                      <td>Order Status</td>
                      <td>{selectedOrder.orderStatus}</td>
                    </tr>
                    <tr
                      className={
                        selectedOrder.paymentStatus === "NOTPAID"
                          ? "table-danger"
                          : "table-success"
                      }
                    >
                      <td>Payment Status</td>
                      <td>{selectedOrder.paymentStatus}</td>
                    </tr>
                    <tr>
                      <td>Ordered Date</td>
                      <td>{formatDate(selectedOrder.orderedDate)}</td>
                    </tr>
                    <tr>
                      <td>Billing Address</td>
                      <td>{selectedOrder.billingAddress}</td>
                    </tr>
                    <tr>
                      <td>Delivered Date</td>
                      <td>
                        {selectedOrder.deliveredDate
                          ? formatDate(selectedOrder?.deliveredDate)
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Order Amount</td>
                      <td>₹{selectedOrder.orderAmount}</td>
                    </tr>
                  </tbody>
                </Table>
                <Card>
                  <Card.Body>
                    <h3>Order Items</h3>
                    <ListGroup>
                      {selectedOrder.orderItems?.map((item) => {
                        return (
                          <ListGroupItem key={item.orderItemId} onCL>
                            <Container>
                              <Row>
                                <Col
                                  md={2}
                                  className=" d-flex justify-content-center align-items-center"
                                >
                                  <img
                                    width={100}
                                    height={50}
                                    src={getProductImageUrl(
                                      item.product.productId
                                    )}
                                    alt=""
                                  />
                                </Col>
                                <Col md={10}>
                                  <p className="text-muted">
                                    Product Id: {item.product.productId}
                                  </p>
                                  <h5>{item.product.title}</h5>
                                  <Badge pill size={"lg"}>
                                    Quantity: {item.quantity}
                                  </Badge>
                                  <Badge
                                    pill
                                    bg="success"
                                    className="ms-2"
                                    size={"lg"}
                                  >
                                    Amount: ₹{item.totalPrice}
                                  </Badge>
                                </Col>
                              </Row>
                            </Container>
                          </ListGroupItem>
                        );
                      })}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )
    );
  };
  return (
    <>
      <Container>
        <Row>
          <Col>{ordersView()}
          {orderViewModal()}
          </Col>
        </Row>
      </Container>
    </>
  );
};
