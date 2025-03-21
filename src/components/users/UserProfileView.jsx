import React, { useContext, useEffect } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { BASE_URL, defaultImage, getUserImageUrl } from "../../services/HelperService";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

export const UserProfileView = ({ user = null, handleShowModal }) => {
  // const handleShow = () => {
  //   setShow(true);
  // }  
  const userContext = useContext(UserContext)
  return (
    <>
      {user && (
        <Container>
          <Row>
            <Col>
              <Card className=" shadow border-0">
                <Card.Body>
                  <Container className="text-center userProf">
                    <img className="border border-dark userProf" style={{ borderRadius: "50%", objectFit: "cover" }} src={user.imageName ? user.imageName.startsWith("http") ? user.imageName : getUserImageUrl(user.userId) + '?' + (new Date).getTime() : defaultImage} alt="" />
                  </Container>
                  <h3 className="text-center fw-bold text-uppercase themeColor">
                    {user.name ? user.name : "Anonymous User"}
                  </h3>
                  <Card className="shadow-sm mt-4 border-0" style={{ borderRadius: "50px" }}>
                    <Card.Body >
                      <Table className="text-center" hover responsive variant="white">
                        <tbody >
                          <tr >
                            <td>Name</td>
                            <td>{user.name}</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>{user.email}</td>
                          </tr>
                          <tr>
                            <td>Gender</td>
                            <td>{user.gender}</td>
                          </tr>
                          <tr>
                            <td>About</td>
                            <td>{user.about}</td>
                          </tr>
                          <tr>
                            <td>Roles</td>
                            <td>
                              {user?.roles?.map((role) => (
                                <div key={role.roleId}>{role.roleName}</div>
                              ))}
                            </td>
                          </tr>
                          {
                            user?.referralCode?.length > 0 &&
                            <tr className="">
                              <td>Referral Code</td>
                              <td>
                                {user?.referralCode}
                              </td>
                            </tr>
                          }
                          {
                            user?.oneTimeReferralEarning > 0 &&
                            <tr className="">
                              <td>Referral Earning</td>
                              <td>
                                <p className="text-muted">{user?.oneTimeReferralEarning || 0}</p>

                              </td>
                            </tr>
                          }
                          {
                            user?.inActiveMoney > 0 &&
                            <tr className="">
                              <td>Referral Earning to be sent on first Order</td>
                              <td>
                                <p className="text-muted">{user?.inActiveMoney || 0}</p>
                              </td>
                            </tr>
                          }
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                  {


                    (userContext.isLogin && userContext.userData?.userId == user.userId)
                      ? (
                        <Container className="text-center mt-3">
                          <Button onClick={handleShowModal} variant="success" className="mx-2 themebgColor">
                            Update
                          </Button>
                          <Button variant="outline-warning" as={Link} to={"/users/orders-details"} className="themeBorderColor">
                            Orders
                          </Button>
                        </Container>) : ''
                  }
                </Card.Body>

              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
