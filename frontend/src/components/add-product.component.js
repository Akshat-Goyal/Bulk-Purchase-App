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
import { VendorNavbar } from "./navbar.component";

const schema = yup.object({
  username: yup.string().required(),
  name: yup
    .string()
    .required("Please Enter a Product Name")
    .min(4, "Too Short!")
    .max(64, "Too Long!"),
  price: yup
    .string()
    .required("Please Enter the Price")
    .matches(/^[0-9]+$/, "Please Enter an Integer!"),
  quantity: yup
    .string()
    .required("Please Enter the Quantity")
    .matches(/^[0-9]+$/, "Please Enter an Integer!")
});

export default class AddProduct extends Component {
  Add = () => {
    return (
      <Formik
        validationSchema={schema}
        initialValues={{
          username: this.props.match.params.id,
          name: "",
          price: "",
          quantity: ""
        }}
        onSubmit={(values, actions) => {
          axios
            .post("http://localhost:4000/product/add", values)
            .then(res => {
              console.log("Successfully Added!");
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
            <Form.Group md="6" controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                aria-describedby="inputGroupPrepend"
                name="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={(touched.name || values.name) && errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group md="6" controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Price"
                name="price"
                value={values.price}
                onChange={handleChange}
                isInvalid={(touched.price || values.price) && errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group md="6" controlId="productQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Quantity"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
                isInvalid={
                  (touched.quantity || values.quantity) && errors.quantity
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.quantity}
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
        <VendorNavbar />
        <br />
        <this.Add />
      </React.Fragment>
    );
  }
}
