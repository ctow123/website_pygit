import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import "bootstrap/dist/css/bootstrap.min.css";
import Navgo from "./navbar.js";
import TextField from "@material-ui/core/TextField";
import { Card, CardActions, CardContent } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import MetaTags from "react-meta-tags";
import { login, setLoginSuccess, setLoginError } from "../redux/reducer";
import { withRouter, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {apiprefix} from "../api/apiprefix.js";
import {createAccount,checkAccountCreated, parseJwt} from "./fcns.js";
import {setUser} from '../redux/reducer.js'
// to make eslint will treat gapi as a known global variable.
/* global gapi */

const styles = theme => ({
  centered: {
    margin: "auto", // https://learnlayout.com/max-width.html
    "margin-bottom": "20px",
    maxWidth: "600px"
  },
  centerChildren: {
    display: "flex",
    justifyContent: "center"
  },
  MuiPaper: {
    display: "flex",
    justifyContent: "center"
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  Applogo: {
    animation: "App-logo-spin infinite 20s linear",
    height: "40vmin",
    "pointer-events": "none"
  },
  Appheader: {
    "background-color": "#282c34",
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
    "justify-content": "center",
    "font-size": `calc(10px + 2vmin)`,
    color: "white"
  }
});

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
        // Handle page restore.
        window.location.reload();
      }
    });

    window["init"] = gapiinit();
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js?onload=init";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
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
    // true is passed in via param on successful login, need to make user a new account based off google in our DB,
    // or authenticate them if account already made aka theyve logged in with google before
    // profile.getImageUrl(); , profile.getName();
    async function listener(param) {
      let profile = GoogleAuth.currentUser.get().getBasicProfile();
      let res = await checkAccountCreated(profile.getEmail());
      if (res.body.created) {
        let returning = login(profile.getEmail(),profile.getId());
        returning(dispatch);
      } else {
        let message = createAccount(
          profile.getEmail(),
          profile.getEmail(),
          profile.getId(),
          true
        );
        message.then(values => {
          localStorage.token = values.body.authtoken;
          dispatch(setUser(parseJwt(localStorage.token)));
        }, error => console.log(error));
      }
    }
    let GoogleAuth;
    window.gapi.auth2
      .init({
        clientId: "578271878997-gm7h69gce1v581nh834ka57h5kv3g81d"
      })
      .then(() => {
        GoogleAuth = window.gapi.auth2.getAuthInstance();
        if (GoogleAuth.isSignedIn.get()) {
          dispatch(setLoginError("user already logged in"));
        } else {
          GoogleAuth.isSignedIn.listen(listener);
        }
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
    // console.log(values);
    let returning = login(values.username, values.password);
    returning(dispatch);
  };

  return (
    <div className={`login tab`} style={{ backgroundColor: "white" }}>
      <MetaTags>
        <title>Algo X Login</title>
        <meta
          name="google-signin-client_id"
          content="578271878997-ird9d986ok3qnktl1iup4l28oq1fdg95.apps.googleusercontent.com"
        />
      </MetaTags>

      <Navgo {...props} />
      <Typography
        style={{ marginTop: "60px" }}
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
