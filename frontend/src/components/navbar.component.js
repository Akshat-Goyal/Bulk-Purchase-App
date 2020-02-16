import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserNavbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          App
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

class VendorNavbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          App
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/vendor/:id/add" className="nav-link">
                Add
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/vendor/:id/view" className="nav-link">
                View
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export { UserNavbar, VendorNavbar };
