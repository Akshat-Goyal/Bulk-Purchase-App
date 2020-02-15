import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: ""
    };
  }

  onChangeUsername = event => {
    this.setState({ username: event.target.value });
  };

  onChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("http://localhost:4000/add", newUser)
      .then(res => console.log(res.data));

    this.setState({
      username: "",
      email: "",
      password: ""
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
