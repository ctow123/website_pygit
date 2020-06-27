import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import {Button, TextField} from "@material-ui/core";
import Navgo from "./navbar.js";
import { Card, CardActions, CardContent } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import MetaTags from "react-meta-tags";
import { login, setLoginError, setUser } from "../redux/reducer";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {createAccount,checkAccountCreated, parseJwt} from "./fcns.js";
import {styles} from './styling.js'
// to make eslint will treat gapi as a known global variable.
/* global gapi */


const Login = ({ classes, currentUser, ...props }) => {
  const user = useSelector(state => state.user);
  useEffect(() => {
    if(user.authenticated){
        dispatch(setLoginError("user already logged in"));
    }
    // handling when user navigates to page via traversal history
    window.addEventListener("pageshow", function(event) {
      var historyTraversal =
        event.persisted ||
        (typeof window.performance != "undefined" &&
          window.performance.navigation.type === 2);
      if (historyTraversal) {
        window.location.reload();
      }
    });

    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js?onload=init";
    // script.async = true;
    // script.defer = true;
    document.body.appendChild(script);
    window.init = gapiinit();
  }, []); // the []) ensures hook only called on mount not every page refresh

  const dispatch = useDispatch();
  let [values, setValues] = useState({ username: "", password: "" });
  let history = useHistory();

  const isLoginSuccess = useSelector(state => state.isLoginSuccess);
  const isLoginPending = useSelector(state => state.isLoginPending);
  const loginError = useSelector(state => state.loginError);

/* handles the initialization of gapi for user auth. gets user name / email from google account and auths user that way*/
function gapiinit() {
  gapi.load("auth2", function() {
    /* Ready. Make a call to gapi.auth2.init or some other API */
    // true is passed in via param on successful login
    async function listener(param) {
      if (param) {
        let profile = GoogleAuth.currentUser.get().getBasicProfile();
        let idtoken = window.gapi.auth2
          .getAuthInstance()
          .currentUser.get()
          .getAuthResponse().id_token;
        // console.log(window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token);
        let res = await checkAccountCreated(profile.getEmail());
        if (res.body.created) {
          let returning = login(idtoken, "", true);
          returning(dispatch);
        } else {
          let message = createAccount(idtoken, "", "", true);
          message.then(
            values => {
              localStorage.token = values.body.authtoken;
              dispatch(setUser(parseJwt(localStorage.token)));
              dispatch(setLoginError("success"));
            },
            error => console.log(error)
          );
        }
      } else {
        dispatch(setLoginError("google api error"));
      }
    }
    let GoogleAuth;
    window.gapi.auth2
      .init({
        clientId: "578271878997-gm7h69gce1v581nh834ka57h5kv3g81d"
      })
      .then(() => {
        GoogleAuth = window.gapi.auth2.getAuthInstance();
        GoogleAuth.isSignedIn.listen(listener);
      });
  });
}



  let handleChange = event => {
    // console.log(event.target);
    let { name, value } = event.target;
    // console.log(value);
    setValues({ ...values, [name]: value });
  };

  // on submission, takes username and password and dispatches the login action
  let handleSubmit = e => {
    e.preventDefault();
    let returning = login(values.username, values.password,false);
    returning(dispatch);
  };

  return (
    <div className={classes.root} style={{ backgroundColor: "white", minHeight: '100vh' }}>
      <MetaTags>
        <title>Algo X Login</title>

      </MetaTags>
      <Navgo />
      <Typography
        align="center"
        variant="h5"
        gutterBottom
      >
        Please Login{" "}
      </Typography>

      <Card className={classes.centered}>
        <form onSubmit={event => handleSubmit(event)} autoComplete="off">
          <CardContent>
            <TextField
              type="text"
              name="username"
              label="username"
              value={values.username}
              fullWidth
              margin="normal"
              onChange={event => handleChange(event)}
            />
            <TextField
              type="text"
              name="password"
              label="password"
              fullWidth
              margin="normal"
              value={values.password}
              onChange={event => handleChange(event)}
            />
          </CardContent>
          <CardActions className={classes.centerChildren}>
            <Button type="submit">Submit</Button>
          </CardActions>
        </form>
      </Card>

      <Card className={classes.centered}>
        <CardContent>
          <Typography color="error" variant="body1">
            {isLoginPending && "Please wait"}
            {isLoginSuccess && "Success"}
            {loginError}
          </Typography>
        </CardContent>
        <CardActions className={classes.centerChildren}>
          <Button href="/createaccount">Create Account</Button>
        </CardActions>
      </Card>

      <div
        className="g-signin2"
        data-longtitle="true"
        style={{ margin: "auto", width: "300px" }}
      ></div>
    </div>
  );
};

export default withStyles(styles)(Login);
