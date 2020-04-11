import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// from now ui kit
import "./assets/css/now-ui-kit.css";
 import 'bootstrap/dist/css/bootstrap.min.css';

// import "assets/css/now-ui-kit.min.css";
// import "assets/css/now-ui-kit.css.map";
// import "./assets/demo/demo.css";

// custom imports
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
//import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
  <Provider store={store}>
  <Router basename={`${process.env.PUBLIC_URL}`}>
    {/*
      <Route
        exact
        path="/"
        render={props => <Welcome {...props} isAuthed={true} />}
      />
*/}
    <Route path="/" component={App} />
  </Router>
   </Provider>
);

// calls the routing component with props injected
ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
