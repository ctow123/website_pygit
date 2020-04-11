import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Navgo from "./navbar.js";
import TextField from "@material-ui/core/TextField";
import { Card, CardActions, CardContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router';
import {createAccount} from "./fcns.js";

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

    let [values, setValues] = useState({ username: "", password: "" , email: ""});
    let [message, updateMessage] = useState(null);
    let history = useHistory();

    let handleChange = event => {
      let { name, value } = event.target;
      setValues({ ...values, [name]: value });
    };

let handleCreate = async e => {
  e.preventDefault();
  // check username/password restrictions on server side
  let message = createAccount(
    values.username,
    values.email,
    values.password,
    false
  );
  message.then(
    values => {
      if (values.status === 200 || values.status === 201) {
        updateMessage(values.body.message);
      } else {
        updateMessage(values.body.error);
      }
    },
    error => console.log(error)
  );
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
              name="email"
              label="email"
              value={values.email}
              fullWidth
              margin="normal"
              onChange={event => handleChange(event)}
            />
            <TextField
              type="password"
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
            { message }
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default (withStyles(styles)(CreateAccount));
