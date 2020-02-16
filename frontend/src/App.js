import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import RegisterUser from "./components/register-user.component";
import LoginUser from "./components/login-user.component";
import AddProduct from "./components/add-product.component";
import ViewProduct from "./components/view-product.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={RegisterUser} />
        <Route path="/register" component={RegisterUser} />
        <Route path="/login" component={LoginUser} />
        <Route path="/vendor/:id/add" component={AddProduct} />
        <Route path="/vendor/:id/view" component={ViewProduct} />
      </div>
    </Router>
  );
}

export default App;
