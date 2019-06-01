import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// custom imports
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
  <Router>
    {/*
      <Route
        exact
        path="/"
        render={props => <Welcome {...props} isAuthed={true} />}
      />
*/}
    <Route path="/" component={App} />
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();