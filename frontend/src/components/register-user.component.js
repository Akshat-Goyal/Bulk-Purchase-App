import React, { Component } from "react";
import ls from "local-storage";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {
  Form,
  Button,
  Col,
  InputGroup,
  FormGroup,
  FormControl,
  Navbar,
  Nav,
  Alert,
  ControlLabel
} from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  firstName: yup
    .string()
    .required("Please Enter your First Name")
    .matches(/^[A-Za-z]+$/, "Please Enter a valid First Name")
    .min(2, "Too Short!")
    .max(32, "Too Long!"),
  lastName: yup
    .string()
    .required("Please Enter your Last Name")
    .matches(/^[A-Za-z]+$/, "Please Enter a valid Last Name")
    .min(2, "Too Short!")
    .max(32, "Too Long!"),
  username: yup
    .string()
    .required("Please Enter a username")
    .min(4, "Too Short!")
    .max(16, "Too Long!"),
  email: yup
    .string()
    .required("Please Enter your Email")
    .matches(
      /(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/,
      "Please Enter a valid Email"
    ),
  city: yup
    .string()
    .required("Please Enter your City")
    .matches(/^[A-Za-z]+$/, "Please Enter a valid City name"),
  state: yup
    .string()
    .required("Please Enter your State")
    .matches(/^[A-Za-z]+$/, "Please Enter a valid State name"),
  zip: yup
    .string()
    .required("Please Enter your Zip Code")
    .matches(/^[0-9]{6}$/, "Please Enter a valid Zip Code"),
  address: yup.string().required("Please Enter your Address"),
  phoneNo: yup
    .string()
    .required("Please Enter your Phone No.")
    .matches(/^[0-9]{10}$/, "Please Enter a 10 digit Phone Number"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Alphabet, One Number and one special case Character"
    ),
  confirmPassword: yup
    .string()
    .required("Please Enter your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  userType: yup.string().required("Please Select the User type")
});

export default class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      username: "",
      type: "customer",
      show: false
    };
  }

  UserNavbar = () => {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar>
      </React.Fragment>
    );
  };

  RegisterForm = () => {
    return (
      <Formik
        validationSchema={schema}
        initialValues={{
          firstName: "",
          lastName: "",
          username: "",
          city: "",
          state: "",
          zip: "",
          address: "",
          email: "",
          phoneNo: "",
          password: "",
          confirmPassword: "",
          userType: "Customer"
        }}
        onSubmit={(values, actions) => {
          values.userType = values.userType.toLowerCase();
          axios
            .post("http://localhost:4000/user/exist", {
              username: values.username
            })
            .then(res => {
              if (res.data !== null && res.data.length !== 0) {
                actions.setFieldError(
                  "username",
                  "This username already exists!"
                );
              } else {
                axios
                  .post("http://localhost:4000/user/add", values)
                  .then(res => {
                    ls.set("username", values.username);
                    ls.set("userType", values.userType);
                    this.setState({
                      redirect: true,
                      type: values.userType,
                      username: values.username
                    });
                  })
                  .catch(err => {
                    actions.setFieldError("general", err.message);
                    this.setState({ show: true });
                  });
              }
            })
            .catch(err => {
              actions.setFieldError("general", err.message);
              this.setState({ show: true });
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors
        }) => (
          <Form onSubmit={handleSubmit}>
            {this.state.show && (
              <Form.Group>
                <Alert
                  key="general"
                  variant={errors.general ? "danger" : "light"}
                  onClose={() => this.setState({ show: false })}
                  dismissible
                >
                  {errors.general}
                </Alert>
              </Form.Group>
            )}

            <Form.Row>
              <Form.Group as={Col} md="4" controlId="registerFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isInvalid={
                    (touched.firstName || values.firstName) && errors.firstName
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="registerLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  isInvalid={
                    (touched.lastName || values.lastName) && errors.lastName
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="registerUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={
                    (touched.username || values.username) && errors.username
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="8" controlId="registerEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={(touched.email || values.email) && errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="registerPhoneNo">
                <Form.Label>Phone No.</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone No."
                  name="phoneNo"
                  value={values.phoneNo}
                  onChange={handleChange}
                  isInvalid={
                    (touched.phoneNo || values.phoneNo) && errors.phoneNo
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNo}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="4" controlId="registerState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  isInvalid={(touched.state || values.state) && errors.state}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.state}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="registerCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  isInvalid={(touched.city || values.city) && errors.city}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="registerZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Zip"
                  name="zip"
                  value={values.zip}
                  onChange={handleChange}
                  isInvalid={(touched.zip || values.zip) && errors.zip}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.zip}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="registerAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                name="address"
                value={values.address}
                onChange={handleChange}
                isInvalid={
                  (touched.address || values.address) && errors.address
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} md="6" controlId="registerPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  secureTextEntry
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={
                    (touched.password || values.password) && errors.password
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="registerConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  secureTextEntry
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  isInvalid={
                    (touched.confirmPassword || values.confirmPassword) &&
                    errors.confirmPassword
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="registerUserType">
              <Form.Label>User Type</Form.Label>
              <Form.Control
                as="select"
                name="userType"
                value={values.userType}
                onChange={handleChange}
              >
                <option>Vendor</option>
                <option>Customer</option>
              </Form.Control>
            </Form.Group>

            <Button type="submit" name="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    );
  };

  render() {
    if (this.state.redirect) {
      if (this.state.type === "customer") {
        return (
          <Redirect push to={"/customer/" + this.state.username + "/search"} />
        );
      } else {
        return (
          <Redirect push to={"/vendor/" + this.state.username + "/view"} />
        );
      }
    }
    return (
      <React.Fragment>
        <this.UserNavbar />
        <br />
        <this.RegisterForm />
      </React.Fragment>
    );
  }
}
