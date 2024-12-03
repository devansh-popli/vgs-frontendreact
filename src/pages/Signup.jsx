import React, { useState } from "react";
import { Base } from "../components/Base";
import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { registerUser } from "../services/UserService";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

export const Signup = () => {
  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    about: "",
    gender: "",
    confirmBankAccountNumber:"",
    bankAccountNumber:"",
    ifscCode:"",
    bankName:"",
  })
  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  };
  const [accountType, setAccountType] = useState('User');
  const [loading, setLoading] = useState(false)
  const [errorData, setErrorData] = useState({
    isError: false,
    errorData: null
  })

  const handleChange = (event, property) => {
    console.log(event)
    console.log(property)
    setData({
      ...data,
      [property]: event.target.value
    })
  }
  const clearFields = () => {
    setData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      about: "",
      gender: "",
      confirmBankAccountNumber:"",
      bankAccountNumber:"",
      ifscCode:"",
      bankName:"",
    })
    setErrorData({
      isError: false,
      errorData: null
    })
  }
  const submitForm = (event) => {
    event.preventDefault();

    console.log(data)
    //validate client side
    if (data.name == undefined || data.name.trim() == '') {
      toast.error("Name cannot be blank")
      return
    }
    if (data.email == undefined || data.email.trim() == '') {
      toast.error("Email cannot be blank")
      return
    }
    if (data.password == undefined || data.password.trim() == '') {
      toast.error("Password cannot be blank")
      return
    }
    if (data.confirmPassword == undefined || data.confirmPassword.trim() == '') {
      toast.error("Confirm password cannot be blank")
      return
    }
    if (data.confirmPassword != data.password) {
      console.log(data)
      toast.error("Password and Confirm password not matched !!")
      return
    }
    if (accountType=='Business' && (data.confirmBankAccountNumber == undefined || data.confirmBankAccountNumber.trim() == '')) {
      toast.error("Confirm Bank Account Number cannot be blank")
      return
    }
    if (accountType=='Business' && (data.bankAccountNumber == undefined || data.bankAccountNumber.trim() == '')) {
      toast.error("Bank Account Number cannot be blank")
      return
    }
    if (accountType=='Business' && (data.ifscCode == undefined || data.ifscCode.trim() == '')) {
      toast.error("ifsc Code cannot be blank")
      return
    }
    if (accountType=='Business' &&  (data.bankName == undefined || data.bankName.trim() == '')) {
      toast.error("Bank Name cannot be blank")
      return
    }
    if (accountType=='Business' && (data.confirmBankAccountNumber != data.bankAccountNumber)) {
      console.log(data)
      toast.error("Bank Account Number and Confirm Bank Account Number not matched !!")
      return
    }
    setLoading(true)
    data.accountType = accountType
    registerUser(data).then(response => {
      toast.success("User created successfully")
      clearFields()
    }).catch(error => {
      console.log(error)
      toast.error("Error in creating user ! try again")
      setErrorData({ isError: true, errorData: error })
    }).finally(() => {
      setLoading(false)
    });
  }
  const registerForm = () => {

    return (

      <Container>
        {/* {JSON.stringify(data)} */}
        <Row>
          <Col>
            <Card sm={{ span: 6, offset: 3 }} className="my-2 shadow border-0" style={{ position: 'relative', top: -60 }}>
              <Card.Body>
                <div className="text-center">
                  <img src="../assets/logo.png" height={70} width={70} alt="" />
                </div>
                <h3 className="text-muted mb-3 text-center">Store Sign up here</h3>
                <Form onSubmit={submitForm}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Enter your name</Form.Label>
                    <Form.Control onChange={(event) => handleChange(event, 'name')} type="text" placeholder="Enter name" value={data.name} isInvalid={errorData.errorData?.response?.data?.name} />
                    <Form.Control.Feedback type="invalid">{errorData?.errorData?.response?.data?.name}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter your Email address</Form.Label>
                    <Form.Control onChange={(event) => handleChange(event, "email")} type="email" placeholder="Enter email" value={data.email} isInvalid={errorData.errorData?.response?.data?.email} />
                    <Form.Control.Feedback type="invalid">{errorData?.errorData?.response?.data?.email}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter new Password</Form.Label>
                    <Form.Control
                      onChange={(event) => handleChange(event, "password")}
                      type="password"
                      value={data.password}
                      placeholder="Enter Password"
                      isInvalid={errorData.errorData?.response?.data?.password}
                    />
                    <Form.Control.Feedback type="invalid">{errorData?.errorData?.response?.data?.password}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCPassword">
                    <Form.Label>Re enter Password</Form.Label>
                    <Form.Control
                      value={data.confirmPassword}
                      onChange={(event) => handleChange(event, "confirmPassword")}
                      type="password"
                      placeholder="Re Enter Password"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Select Gender </Form.Label>
                    <div>
                      <Form.Check
                        inline
                        label="male"
                        name="gender"
                        type={"radio"}
                        id={`gender`}
                        value={'male'}
                        checked={data.gender == 'male'}
                        onChange={(event) => handleChange(event, "gender")}
                        isInvalid={errorData.errorData?.response?.data?.gender}
                      />
                      <Form.Check
                        inline
                        label="female"
                        name="gender"
                        type={"radio"}
                        id={`gender`}
                        value={'female'}
                        checked={data.gender == 'female'}
                        onChange={(event) => handleChange(event, "gender")}
                        isInvalid={errorData.errorData?.response?.data?.gender}
                      />
                      <Form.Control.Feedback type="invalid">{errorData?.errorData?.response?.data?.gender}</Form.Control.Feedback>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Col} controlId="formAccountType">
                    <Form.Label>Account Type</Form.Label>
                    <Form.Control as="select" value={accountType} onChange={handleAccountTypeChange}>
                      <option value="User">User Account</option>
                      <option value="Business">Business Account</option>
                    </Form.Control>
                  </Form.Group>
                  {
                    accountType === 'Business' && (
                      <>
                        <Form.Group className="mb-3" controlId="formBasicName">
                          <Form.Label>Referred By Someone? Enter Referral Code</Form.Label>
                          <Form.Control
                            onChange={(event) => handleChange(event, 'parentReferralCode')}
                            type="text"
                            placeholder="Enter referral code"
                            value={data.parentReferralCode}
                            isInvalid={errorData?.errorData?.response?.data?.parentReferralCode}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errorData?.errorData?.response?.data?.parentReferralCode}
                          </Form.Control.Feedback>
                        </Form.Group>

                        {/* Bank Account Details */}
                        <Form.Group className="mb-3" controlId="formAccountNumber">
                          <Form.Label>Bank Account Number</Form.Label>
                          <Form.Control
                            onChange={(event) => handleChange(event, 'bankAccountNumber')}
                            type="text"
                            placeholder="Enter account number"
                            value={data.bankAccountNumber}
                            isInvalid={errorData?.errorData?.response?.data?.bankAccountNumber}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errorData?.errorData?.response?.data?.bankAccountNumber}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formConfirmAccountNumber">
                          <Form.Label>Confirm Bank Account Number</Form.Label>
                          <Form.Control
                            onChange={(event) => handleChange(event, 'confirmBankAccountNumber')}
                            type="text"
                            placeholder="Re-enter account number"
                            value={data.confirmBankAccountNumber}
                            isInvalid={
                              data.bankAccountNumber &&
                              data.bankAccountNumber !== data.confirmBankAccountNumber
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Account numbers do not match.
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formIfscCode">
                          <Form.Label>IFSC Code</Form.Label>
                          <Form.Control
                            onChange={(event) => handleChange(event, 'ifscCode')}
                            type="text"
                            placeholder="Enter IFSC code"
                            value={data.ifscCode}
                            isInvalid={errorData?.errorData?.response?.data?.ifscCode}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errorData?.errorData?.response?.data?.ifscCode}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBankName">
                          <Form.Label>Bank Name</Form.Label>
                          <Form.Control
                            onChange={(event) => handleChange(event, 'bankName')}
                            type="text"
                            placeholder="Enter bank name"
                            value={data.bankName}
                            isInvalid={errorData?.errorData?.response?.data?.bankName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errorData?.errorData?.response?.data?.bankName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </>
                    )
                  }

                  <Form.Group className="mb-3" controlId="formBasicName">

                    <Form.Label>Write something about yourself</Form.Label>
                    <Form.Control
                      isInvalid={errorData.errorData?.response?.data?.about} value={data.about} onChange={(event) => handleChange(event, "about")} as="textarea" placeholder="write here" rows={6} />
                    <Form.Control.Feedback type="invalid">{errorData?.errorData?.response?.data?.about}</Form.Control.Feedback>
                  </Form.Group>

                  <Container>
                    <p className="text-center">Already Registered! <NavLink className={"themeColor"} to="/login">Login Here</NavLink></p>
                  </Container>
                  <Container className="text-center">
                    <Button type="submit"
                      disabled={loading}
                      className="themebgColor"
                      variant="success mx-2"
                    >
                      <Spinner hidden={!loading} animation="border" size="sm" className="me-2">
                      </Spinner>
                      <span hidden={!loading}>Wait</span>  <span hidden={loading}>Register</span>
                    </Button>
                    <Button variant="outline-danger" className="themeBorderColor" onClick={clearFields}>
                      Reset
                    </Button>
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
      <Base
        title="Electro Store / Signup"
        description="Fill the form to correctly to regsiter with us. By registering with you can use services that we provide"
      >
        {registerForm()}
      </Base>
    </div>
  );
};
