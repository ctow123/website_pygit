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


const styles = theme => ({
  centered: {
    margin: 'auto', // https://learnlayout.com/max-width.html
    'margin-bottom': '20px',
    maxWidth: '600px'
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
  // comments should automatically load and update as new ones are added, need websockets
  useEffect(() => {

  }, []); // the []) ensures hook only called on mount not every page refresh

  const [commentfromDB, updateCommentfromDB] = useState(null);
  const [message, updateMessage] = useState(null);
  let [values, setValues] = useState({ comment: "" });

  let handleChange = event => {
    // console.log(event.target);
    let { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

// user must be logged in
  let handleSubmit = () => {

  };
  return (
    <div className={`welcome tab`} style={{ backgroundColor: "white" }}>
      <Navgo />
      <Typography style={{'marginTop':'60px'}} align="center" variant="h5" gutterBottom>
        Leave a comment below{" "}
      </Typography>

      <Card className={classes.centered}>
        <form onSubmit={event => handleSubmit(event)} autoComplete="off">
          <CardContent>
            <TextField
              type="text"
              name="comment"
              label="your comment"
              value={values.comment}
              fullWidth
              margin="normal"
              onChange={event => handleChange(event)}
            />
            <Typography color="error" align='center' variant="body1">
              {'hey'}
            </Typography>
          </CardContent>
          <CardActions className={classes.centerChildren}>
            <Button type="submit">Submit</Button>
          </CardActions>
        </form>
      </Card>

      <Card className={classes.centered}>
        <CardContent>
          <Typography color="error" variant="body1">
            {commentfromDB}
          </Typography>
        </CardContent>

      </Card>
    </div>
  );
};
export default withStyles(styles)(Comments);
