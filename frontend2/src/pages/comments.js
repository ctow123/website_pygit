import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import "bootstrap/dist/css/bootstrap.min.css";
import Navgo from "./navbar.js";
import TextField from "@material-ui/core/TextField";
import { Card, CardActions, CardContent } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  centered: {
    margin: 20, // https://learnlayout.com/max-width.html
    maxWidth: 600,
  },
  centerChildren: {
    justifyContent: "center"
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
});

const Comments = ({ classes, ...props }) => {
  console.log(props);
  const [message, updateMessage] = useState(null);
  let [values, setValues] = useState({ username: "", password: "" });

  let handleChange = event => {
    let { name, value } = event.target;
  };

  let handleSubmit = () => {};
  return (
    <div className={`welcome tab`} style={{ backgroundColor: "white" }}>
      <Navgo />
      <Typography align="center" variant="h5" gutterBottom>
        Leave a comment below{" "}
      </Typography>

      <Card className={classes.centered}>
        <form onSubmit={event => handleSubmit(event)} autoComplete="off">
          <CardContent>
            <TextField
              type="text"
              name="username"
              label="Username"
              value={values.username}
              fullWidth
              margin="normal"
              onChange={event => handleChange(event)}
            />
            {message && (
              <Typography color="error" variant="body1">
                {message}
              </Typography>
            )}
            <TextField
              type="password"
              name="password"
              label="Password"
              fullWidth
              margin="normal"
              value={values.password}
              onChange={event => handleChange(event)}
            />
          </CardContent>
          <CardActions className={classes.centerChildren}>
            <Button type="submit">Login</Button>
          </CardActions>
        </form>
      </Card>

      <Card className={classes.centered}>
        <CardContent>
          <Typography color="error" variant="body1">
            {message}
          </Typography>
        </CardContent>
        <CardActions className={classes.centerChildren}>
          <Button type="submit">Load</Button>
        </CardActions>
      </Card>
    </div>
  );
};
export default withStyles(styles)(Comments);
