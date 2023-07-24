import React from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { defaultImage, getUserImageUrl } from "../../services/HelperService";

export const SingleUserView = ({ user }) => {
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
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
