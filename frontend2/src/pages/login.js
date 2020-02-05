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
import { login, setLoginSuccess, setLoginError } from '../redux/reducer'
import { withRouter, useHistory } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import apiprefix from "../api/apiprefix.js";

const styles = theme => ({
  centered: {
    margin: 'auto', // https://learnlayout.com/max-width.html
    'margin-bottom': '20px',
    maxWidth: '600px'
  },
  centerChildren: {
    display: 'flex',
    justifyContent: "center"
  },
  MuiPaper: {
    display: 'flex',
    justifyContent: "center"
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
});

const Login = ({ classes, currentUser, ...props }) => {
    // console.log(props);
    useEffect(() => {
      console.log(currentUser);
    }, []); // the []) ensures hook only called on mount not every page refresh
    const dispatch = useDispatch();
    let [values, setValues] = useState({ username: "", password: "" });
    let history = useHistory();

    const isLoginSuccess = useSelector(state => state.isLoginSuccess);
    const isLoginPending = useSelector(state => state.isLoginPending);
    const loginError = useSelector(state => state.loginError);
    let handleChange = event => {
      // console.log(event.target);
      let { name, value } = event.target;
      // console.log(value);
      setValues({ ...values, [name]: value });
    };

// on submission, takes username and password and dispatches the login action
  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    console.log((null));
    let returning = login(values.username, values.password);
    returning(dispatch);
    // console.log(returning);

     history.push('/');
  };
  return (
    <div className={`login tab`} style={{ backgroundColor: "white" }}>
      <Navgo {...props} />
      <Typography style={{'marginTop':'60px'}} align="center" variant="h5" gutterBottom>
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
            { isLoginPending && 'Please wait' }
            { isLoginSuccess && 'Success' }
            { loginError }
          </Typography>
        </CardContent>
        <CardActions className={classes.centerChildren}>
          <Button  href="/createaccount">Create Account</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default (withStyles(styles)(Login));
