import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAdminUser } from "../../auth/HelperAuth";
import { UserContext } from "../../context/UserContext";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { SideMenu } from "./SideMenu";
import { useJwtExpiration } from "../../hooks/useJwtExpiration";

export const AdminDashboard = () => {
  const userContext = useContext(UserContext);
  useJwtExpiration()
  const AdminView = () => {
    return (
      <>
        <div>
          <Container className="px-5" fluid>
            <Row>
              <Col md={{ span: 2 }}>
                <SideMenu/>
              </Col>
              <Col md={10} className="ps-2">
                <Outlet />
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  };
  return (
    <div>{isAdminUser() ? AdminView() : <Navigate to={"/login"} />}</div>
  );
};
