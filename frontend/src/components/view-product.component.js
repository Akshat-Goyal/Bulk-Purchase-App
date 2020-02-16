import React, { Component } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Col,
  InputGroup,
  FormGroup,
  FormControl,
  ListGroup,
  Table,
  ControlLabel
} from "react-bootstrap";
import { VendorNavbar } from "./navbar.component";

export default class ViewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }

  componentDidMount() {
    axios
      .post("http://localhost:4000/product/view", {
        username: this.props.match.params.id
      })
      .then(response => {
        this.setState({ product: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleClick = (e, id) => {
    this.setState({ product: this.state.product.filter(row => row._id != id) });
    axios
      .post("http://localhost:4000/product/delete", { id: id })
      .then(response => {
        console.log("Deleted Successfully!");
      })
      .catch(error => {
        console.log(error);
      });
  };

  View = () => {
    let table = [];
    let body = [];
    let row = [];
    for (let key in this.state.product[0]) {
      if (key === "_id" || key === "username" || key === "__v") continue;
      row.push(<th>{key}</th>);
    }
    row.push(<th>{"Delete"}</th>);
    body.push(<tr>{row}</tr>);
    table.push(<thead>{body}</thead>);
    body = [];
    for (let i in this.state.product) {
      row = [];
      for (let key in this.state.product[i]) {
        if (key === "_id" || key === "username" || key === "__v") continue;
        row.push(<td>{this.state.product[i][key]}</td>);
      }
      row.push(
        <td>
          <Button
            variant="danger"
            value={this.state.product[i]["_id"]}
            onClick={e => this.handleClick(e, this.state.product[i]["_id"])}
          >
            Delete
          </Button>
        </td>
      );
      body.push(<tr>{row}</tr>);
    }
    table.push(<tbody>{body}</tbody>);
    return (
      <Table striped bordered hover variant="dark">
        {table}
      </Table>
    );
  };

  render() {
    return (
      <React.Fragment>
        <VendorNavbar />
        <br />
        <this.View />
      </React.Fragment>
    );
  }
}
