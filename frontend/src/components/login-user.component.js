import React, { Component } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Col,
  InputGroup,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { UserNavbar } from "./navbar.component";

const schema = yup.object({
  username: yup
    .string()
    .required("Please Enter a username")
    .min(4, "Too Short!")
    .max(16, "Too Long!"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Alphabet, One Number and one special case Character"
    )
});

export default class LoginUser extends Component {
  LoginForm = () => {
    return (
      <Formik
        validationSchema={schema}
        initialValues={{
          username: "",
          password: ""
        }}
        onSubmit={(values, actions) => {
          axios
            .post("http://localhost:4000/user/login", values)
            .then(res => {
              if (res.data.length !== 0) {
                console.log("Successfully Logged!");
              } else {
                actions.setFieldError(
                  "general",
                  "Username or Password is Incorrect!"
                );
                console.log("Unsuccessfull!");
              }
            })
            .catch(err => {
              actions.setFieldError("general", err.message);
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
            <Form.Group md="6" controlId="loginUsername">
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

            <Form.Group md="6" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
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

            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    );
  };

  render() {
    return (
      <React.Fragment>
        <UserNavbar />
        <br />
        <this.LoginForm />
      </React.Fragment>
    );
  }
}
