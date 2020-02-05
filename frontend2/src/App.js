import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Welcome from "./pages/main.js";
import Login from "./pages/login.js";
import FaceID from "./pages/faceid.js";
import Comments from "./pages/comments.js";
import CreateAccount from "./pages/createaccount.js";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";


let App = props => {
  let [isDark, switchThemeFunc] = useState(false);
  console.log(props);
  // console.log(localStorage.token);
  // console.log(typeof localStorage.token);
  useEffect(() => {}, []);

  //-------------------------------------------------------------------------------

// using update user triggers re-render
  // eslint-disable-next-line

  // see https://material-ui.com/api/typography/
  return (


        <Switch>
          <Route
            exact
            path="/"
            label="welcome"
            render={props => <Welcome {...props} isAuthed={true} />}
          />
          <Route
            exact
            path="/login"
            label="Login"
            render={props => <Login {...props}  isAuthed={true} />}
          />
          <Route
            exact
            path="/faceid"
            label="faceid"
            render={props => <FaceID {...props} isAuthed={true} />}
          />
          <Route
            exact
            path="/comments"
            label="comment"
            render={props => <Comments {...props} isAuthed={true} />}
          />
          <Route
            exact
            path="/createaccount"
            label="createaccount"
            render={props => <CreateAccount {...props} isAuthed={false} />}
          />
        </Switch>

  );
};


export default App;
