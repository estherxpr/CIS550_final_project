
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// import "assets/css/bootstrap.min.css";
// import "assets/scss/now-ui-kit.scss?v=1.5.0";

// import HomePage from "views/HomePage.js";
// import StatePage from "views/StatePage.js";
// import ParkPage from "views/ParkPage.js";
// import SpeciesPage from "views/SpeciesPage.js"

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <BrowserRouter>
//     <Switch>
//       <Switch>
//         <Route path="/states" render={(props) => <StatePage {...props} />} />
//         <Route path="/parks" render={(props) => <ParkPage {...props} />} />
//         <Route path="/species" render={(props) => <SpeciesPage {...props} />} />
//         <Route path="/" render={(props) => <HomePage {...props} />} />
//         <Redirect to="/" />
//         <Redirect from="/index" to="/" />
//       </Switch>
//     </Switch>
//   </BrowserRouter>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";

import HomePage from "views/HomePage.js";
import StatePage from "views/StatePage.js";
import ParksPage from "views/ParksPage.js";
import ParkPage from "views/ParkPage.js";
import SpeciesAllPage from "views/SpeciesAllPage.js"
import SpeciesPage from "views/SpeciesPage.js"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route exact path="/states" render={(props) => <StatePage {...props} />} />
        <Route exact path="/parks" render={(props) => <ParksPage {...props} />} />
        <Route exact path="/parks/:parkName" render={(props) => <ParkPage {...props} />} />
        <Route exact path="/species" render={(props) => <SpeciesAllPage {...props} />} />
        <Route exact path="/species/:speciesName" render={(props) => <SpeciesPage {...props} />} />
        <Route exact path="/" render={(props) => <HomePage {...props} />} />
        <Redirect to="/" />
        <Redirect from="/index" to="/" />
      </Switch>
    </Switch>
  </BrowserRouter>
);
