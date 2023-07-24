import React, { useEffect, useState } from "react";
import { getOrders, updateOrder } from "../../services/OrderService";
import {
  ADMIN_ORDER_PAGE_SIZE,
  formatDate,
  getProductImageUrl,
} from "../../services/HelperService";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { SingleOrderView } from "../../components/admin/SingleOrderView";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

export const AdminOrders = () => {
  const [ordersData, setOrdersData] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);
  useEffect(() => {
    getOrdersLocally();
  }, []);
  useEffect(() => {
    if (pageNumber > 0) {
      console.log("pahg", pageNumber);
      getOrdersLocally(pageNumber);
    }
  }, [pageNumber]);
  const UpdateOrder = async () => {
    try {
      let res = await updateOrder(selectedOrder);
      setOrdersData({
        ...ordersData,
        content: ordersData.content.map((order) => {
          if (order.orderId === res.orderId) return Object.assign(order, res);
          return order;
        }),
      });
      toast.success("Order Updated");
      handleCloseUpdate()
    } catch (e) {
      toast.error(e);
    }
  };
  const getOrdersLocally = async (pageNum = 0) => {
    try {
      const data = await getOrders(
        pageNum,
        ADMIN_ORDER_PAGE_SIZE,
        "orderedDate",
        "desc"
      );
      console.log(data);

      if (pageNumber > 0) {
        setOrdersData({
          content: [...ordersData.content, ...data.content],
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          totalElements: data.totalElements,
          totalPage: data.totalPages,
        });
      } else setOrdersData(data);
    } catch (e) {
      console.log("error", e);
    }
  };

  const fetchMoreData = () => {
    console.log("fetchmoredata");
    setPageNumber(pageNumber + 1);
  };
  const openViewOrderModel = (event, orderModal) => {
    setSelectedOrder(orderModal);
    handleShow();
  };

  const openUpdateOrderModel = (event, orderModal) => {
    setSelectedOrder(orderModal);
    handleShowUpdate();
  };
  const ordersView = () => {
    return (
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="m-3">All Orders is here</h3>
          {ordersData?.content?.length > 0 && (
            <>
              <InfiniteScroll
                dataLength={ordersData.content.length}
                next={fetchMoreData}
                style={{ display: "flex", flexDirection: "column" }} //To put endMessage and loader to the top.
                hasMore={!ordersData.lastPage}
                loader={<h2 className="text-center p-3">Loading..</h2>}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {ordersData.content?.map((order) => {
                  return (
                    <SingleOrderView
                      key={order.orderId}
                      openViewOrderModel={openViewOrderModel}
                      openUpdateOrderModel={openUpdateOrderModel}
                      order={order}
                    />
                  );
                })}
              </InfiniteScroll>
            </>
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
  const orderUpdateModal = () => {
    return (
      { selectedOrder } && (
        <Modal size="xl" show={showUpdate} onHide={handleCloseUpdate}>
          <Modal.Header closeButton>
            <Modal.Title className="text-muted">
              Update Order Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* {JSON.stringify(selectedOrder)} */}
              <Form.Group>
                <Form.Label>Billing Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedOrder.billingName}
                  onChange={(event) => {
                    setSelectedOrder({
                      ...selectedOrder,
                      billingName: event.target.value,
                    });
                    if (event.target.value.trim() === "") {
                      toast.error("Billing Name is Required");
                    }
                  }}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Billing Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedOrder.billingPhone}
                  onChange={(event) => {
                    setSelectedOrder({
                      ...selectedOrder,
                      billingPhone: event.target.value,
                    });
                    // if (event.target.value.trim() === "") {
                    //   toast.error("Billing Phone is Required");
                    // }
                  }}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Billing Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={selectedOrder.billingAddress}
                  onChange={(event) => {
                    setSelectedOrder({
                      ...selectedOrder,
                      billingAddress: event.target.value,
                    });
                    // if (event.target.value.trim() === "") {
                    //   toast.error("Billing Phone is Required");
                    // }
                  }}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Payment Status</Form.Label>
                <Form.Select
                  value={selectedOrder.paymentStatus}
                  onChange={(event) => {
                    setSelectedOrder({
                      ...selectedOrder,
                      paymentStatus: event.target.value,
                    });
                  }}
                >
                  <option value="NOTPAID">NOT PAID</option>
                  <option value="PAID">PAID</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Order Status</Form.Label>
                <Form.Select
                  value={selectedOrder.orderStatus}
                  onChange={(event) => {
                    setSelectedOrder({
                      ...selectedOrder,
                      orderStatus: event.target.value,
                    });
                  }}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="DISPATCHED">DISPATCHED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="ONWAY">ONWAY</option>
                </Form.Select>
              </Form.Group> 
              <Form.Group className="mt-3">
                <Form.Label>Delivered Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedOrder.deliveredDate}
                  onChange={(event) => {
                    setSelectedOrder({
                      ...selectedOrder,
                      deliveredDate: event.target.value,
                    });
                    // if (event.target.value.trim() === "") {
                    //   toast.error("Billing Phone is Required");
                    // }
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdate}>
              Close
            </Button>
            <Button variant="success" onClick={UpdateOrder}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )
    );
  };
  return (
    <div>
      <Container>
        <Row>
          <Col>{ordersView()}</Col>
        </Row>
      </Container>
      {orderViewModal()}
      {orderUpdateModal()}
    </div>
  );
};
