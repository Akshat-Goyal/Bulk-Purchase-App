import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import RegisterUser from "./components/register-user.component";
import LoginUser from "./components/login-user.component";
import AddProduct from "./components/add-product.component";
import ViewProduct from "./components/view-product.component";
import PlacedProduct from "./components/placed-product.component";
import DispatchedProduct from "./components/dispatched-product.component";
import SearchProduct from "./components/search-product.component";
import StatusProduct from "./components/status-product.component";
import ReviewVendor from "./components/review-vendor.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={LoginUser} />
        <Route path="/register" component={RegisterUser} />
        <Route path="/login" component={LoginUser} />
        <Route path="/vendor/:id/add" component={AddProduct} />
        <Route path="/vendor/:id/view" component={ViewProduct} />
        <Route path="/vendor/:id/placed" component={PlacedProduct} />
        <Route path="/vendor/:id/dispatched" component={DispatchedProduct} />
        <Route path="/customer/:id/search" component={SearchProduct} />
        <Route path="/customer/:id/status" component={StatusProduct} />
        <Route path="/vendor/:id/review" component={ReviewVendor} />
      </div>
    </Router>
  );
}

export default App;
