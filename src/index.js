
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";

import HomePage from "views/HomePage.js";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/" render={(props) => <HomePage {...props} />} />
        <Redirect to="/" />
        <Redirect from="/index" to="/" />
      </Switch>
    </Switch>
  </BrowserRouter>
);
