import React, { useContext, useState } from "react";
import { Base } from "../components/Base";
import { GoogleLogin } from "@react-oauth/google";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  NavLink,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, loginUserByGoogle } from "../services/UserService";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { isAdminUser } from "../auth/HelperAuth";
import { OldSocialLogin as SocialLogin } from "react-social-login";
export const Login = () => {
  let userContext = useContext(UserContext);
  let redirect = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorData, setErrorData] = useState({
    isError: false,
    errorData: null,
  });
  const [loading, setLoading] = useState(false);
  const setLoginInfo = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };
  const submitLoginForm = (e) => {
    e.preventDefault();
    if (loginData.email == undefined || loginData.email.trim() == "") {
      toast.error("email cannot be blank");
      return;
    }
    if (loginData.password == undefined || loginData.password.trim() == "") {
      toast.error("password cannot be blank");
      return;
    }
    setLoading(true);
    loginUser(loginData)
      .then((response) => {
        console.log(response);

        setErrorData({ isError: false, errorData: null });
        toast.success("Logged in Successfully");
        //redirect to dashboard
        //for normal user: normal user ka dashboard
        userContext.doLogin(response);
        const redirectTo = localStorage.getItem("redirectTo");
        if (redirectTo) {
          localStorage.removeItem("redirectTo");
          redirect(redirectTo);
        } else if (isAdminUser()) {
          redirect("/admin/home");
        } else redirect("/");
      })
      .catch((response) => {
        console.log(response);
        setErrorData({ isError: true, errorData: response });
        toast.error(response?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSocialLogin = (user) => {
    console.log(user);
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };
  const clearFields = () => {
    setLoginData({
      email: "",
      password: "",
    });
    setErrorData({ isError: false, errorData: null });
  };
  const loginJxs = () => {
    return (
      <Container className="mt-3" style={{ position: "relative", top: -60 }}>
        <Row>
          <Col>
            <Card sm={{ span: 6, offset: 3 }} className="shadow border-0">
              <Card.Body>
                <div className="text-center ">
                  <img src="../assets/logo.png" alt="" height={70} width={70} />
                  <h3 className="text-muted">Store Login</h3>
                </div>
                <Form onSubmit={submitLoginForm}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      value={loginData.email}
                      type="email"
                      placeholder="name@example.com"
                      name="email"
                      onChange={(event) => setLoginInfo(event)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Enter your password</Form.Label>
                    <Form.Control
                      value={loginData.password}
                      type="password"
                      placeholder="Enter here"
                      name="password"
                      onChange={(event) => setLoginInfo(event)}
                    />
                  </Form.Group>

                  <Container className="w-25 d-flex justify-content-center">
                    <GoogleLogin
                      type="standard"
                      shape="square"
                      onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                        loginUserByGoogle({
                          idToken: credentialResponse.credential,
                        })
                          .then((response) => {
                            // console.log(response, "loginwith google");
                            userContext.doLogin(response);
                            const redirectTo =
                              localStorage.getItem("redirectTo");
                            if (redirectTo) {
                              localStorage.removeItem("redirectTo");
                              redirect(redirectTo);
                            } else if (isAdminUser()) {
                              redirect("/admin/home");
                            } else redirect("/");
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </Container>
                  <p className="text-center my-2">or</p>
                  <Container className="text-center">
                    <Button
                      disabled={loading}
                      type="submit"
                      className="mx-2"
                      variant="success"
                    >
                      <Spinner size="sm" hidden={!loading}></Spinner>
                      <span hidden={!loading}>Wait..</span>
                      <span hidden={loading}>Login</span>
                    </Button>

                    <Button variant="danger" onClick={clearFields}>
                      Reset
                    </Button>
                  </Container>
                  <Container className="text-center mt-3">
                    <p>
                      Forgot Password? <Link to={"/"}>click here</Link>
                    </p>
                    <p>
                      Not Registered? <Link to={"/register"}>click here</Link>
                    </p>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  return (
    <div>
      <Base title="Electro  Store / Login" description={null}>
        {loginJxs()}
      </Base>
    </div>
  );
};
