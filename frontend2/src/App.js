import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Welcome from "./pages/main.js";
import TabChooser from "./pages/TabChooser.js";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

let App = props => {
  let [isDark, switchThemeFunc] = useState(false);
  console.log(props);
  useEffect(() => {}, []);

  //-------------------------------------------------------------------------------
  // current user related functions
  // function parseJwt(token) {
  //   const base64Url = token.split('.')[1];
  //   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   const buff = new Buffer(base64, 'base64');
  //   const payloadinit = buff.toString('ascii');
  //   const payload = JSON.parse(payloadinit);
  //   return payload;
  // }

  let initialUser;
  // let token;
  // if (typeof localStorage.token != 'undefined') {
  //   token = parseJwt(localStorage.token); // how to decode token??
  //   //console.log(token);
  //   //initialUser = token;
  //   initialUser = { ...token, authenticated: true };
  // } else {
  //   initialUser = { authenticated: false };
  // }

  // eslint-disable-next-line
  // curruser is current state and updateuser is way to change it
  // {} is way to evaluate a function
  let [currentUser, updateUser] = useState(initialUser);
  //console.log(currentUser);
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
            path="/2"
            label="2"
            render={props => <Welcome {...props} isAuthed={true} />}
          />
        </Switch>
  
  );
};

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
