import React, { useContext } from "react";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { getUserFromLocalStorage, isLoggedIn } from "../../auth/HelperAuth";
function Dashboard() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate()
  const dashboardView = () => {
    return (
      <>
        
        <Outlet />
      </>
    );
  };
  const UserNotLoggedInView = () => {
    return (
      <>
        <Container>
          <Row>
            <Col md={{span:8,offset:2}}>
              <Card className="border-0 shadow mt-3">
                <Card.Body className="text-center">
                  <h3>You are not logged in !!</h3>
                  <p>Please do login to view the page</p>
                  <Button variant="success" as={NavLink} to={"/login"}>Login Now</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  return <>{(isLoggedIn()) ? (dashboardView()) :( <Navigate to={"/login"}/>)}</>;
}

export default Dashboard;
