import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Navgo from "./navbar.js";
import TextField from "@material-ui/core/TextField";
import { Card, CardActions, CardContent } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, useHistory } from 'react-router-dom'
import { Redirect } from 'react-router';
import { makeAPICall } from "../api/api.js";
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

const CreateAccount = ({ classes, ...props }) => {
    useEffect(() => {

    }, []); // the []) ensures hook only called on mount not every page refresh

    let [values, setValues] = useState({ username: "", password: "" });
    let [created, updateCreate] = useState(false);
    let [message, updateMessage] = useState(null);
    let history = useHistory();

    let handleChange = event => {
      let { name, value } = event.target;
      setValues({ ...values, [name]: value });
    };

  let handleCreate = async (e) => {
    e.preventDefault();
    console.log(values);
    // check username/password restrictions on server side
    let res = await makeAPICall(
      "POST",
      `${apiprefix}:8000/apidb/create`,
      {'username':values.username, 'password':values.password}
    );
    let status = res.status
    let body = await res.json();
    if(status !== 200 && status !== 201){
      updateMessage(body.error)
    }
    else{
      updateCreate(true);
      // history.push('/');
    }
  };
  return (
    <div className={`login tab`} style={{ backgroundColor: "white" }}>
      <Navgo {...props} />
      <Typography style={{'marginTop':'60px'}} align="center" variant="h5" gutterBottom>
        Create an Account{" "}
      </Typography>

      <Card className={classes.centered}>
        <form onSubmit={event => handleCreate(event)} autoComplete="off">
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
            <Button type="submit">Create</Button>
          </CardActions>
        </form>
      </Card>

      <Card className={classes.centered}>
        <CardContent>
          <Typography color="error" variant="body1">
            { created && 'Success' }
            { message }
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default (withStyles(styles)(CreateAccount));
