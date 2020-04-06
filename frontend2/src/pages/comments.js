import React, { useState, useEffect, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import "bootstrap/dist/css/bootstrap.min.css";
import Navgo from "./navbar.js";
import TextField from "@material-ui/core/TextField";
import { Card, CardActions, CardContent } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

import { withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { makeAPICall } from "../api/api.js";
import apiprefix from "../api/apiprefix.js";

const styles = theme => ({
  centered: {
    margin: "auto", // https://learnlayout.com/max-width.html
    "margin-bottom": "20px",
    maxWidth: "600px"
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
  const user = useSelector(state => state.user);
  let [commentfromDB, updateCommentfromDB] = useState([]);
  let [message, updateMessage] = useState(null);
  let [values, setValues] = useState({ comment: "" });
  const socket = useRef(null);

  // comments should automatically load and update as new ones are added, need websockets
  useEffect(() => {
    // console.log(user);
    socket.current = new WebSocket(`ws://localhost:80/apidb/ws/chat`);
    socket.current.onopen = () => {
      console.log("WebSocket open");
    };
    socket.current.onmessage = e => {
      fetchComments();
      console.log(e.data);
    };
    fetchComments();
  }, []); // the []) ensures hook only called on mount not every page refresh

  let handleChange = event => {
    let { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  // user must be logged in to submit, submits comment to server, sends message to socket
  // to update comment list for other users, then refreshes page for you
  let handleSubmit = e => {
    e.preventDefault();
    if (!user.authenticated) {
      updateMessage("need to login before submitting comment");
    } else {
      if (values.comment === "") {
        updateMessage("comment field cant be empty");
      } else {
        uploadComment(values.comment);
        socket.current.send(
          JSON.stringify({ message: "comment submitted", update: true })
        );
        // window.location.reload();
        setValues({ comment: "" });
      }
    }
  };

  // fetches all comments from database
  const fetchComments = async () => {
    let res = await makeAPICall("GET", `http://localhost:80/apidb/comments`);
    let status = res.status;

    let body = await res.json();
    if (status !== 200 && status !== 201) {
      updateMessage(body.error);
    } else {
      // Object.keys(body).forEach(key => arr.push({name: key, value: body[key]}))
      // updateCommentfromDB([...commentfromDB,  ...body]);
      console.log("vol");
      commentToHTML(body.data);
      // history.push('/');
    }
  };

  // converts the comment from API call to data that can be displayed in JSX
  const commentToHTML = commentarray => {
    let temparray = [];
    for (let i = 0; i < commentarray.length; i++) {
      // console.log(commentarray[i]);
      temparray.push(
        <Typography key={i} color="textPrimary" variant="body1">
          {" "}
          {commentarray[i].username + " : " + commentarray[i].comment}{" "}
        </Typography>
      );
    }
    console.log(temparray);
    updateCommentfromDB(temparray);
  };

  // uploads comment to database
  const uploadComment = async comment => {
    let res = await makeAPICall("POST", `${apiprefix}:8000/apidb/comments`, {
      username: user.username,
      comment: comment
    });
    let status = res.status;
    let body = await res.json();
    if (status !== 200 && status !== 201) {
      updateMessage(body.error);
    } else {
      // success
    }
  };

  // react cant render objects so if using {commentfromDB} can't store json in there
  return (
    <div className={`welcome tab`} style={{ backgroundColor: "white" }}>
      <Navgo />
      <Typography
        style={{ marginTop: "60px" }}
        align="center"
        variant="h5"
        gutterBottom
      >
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
            <Typography color="primary" align="center" variant="body1">
              {"hit submit when done, comments appear below"}
            </Typography>
            <Typography color="error" align="center" variant="body1">
              {message}
            </Typography>
          </CardContent>
          <CardActions className={classes.centerChildren}>
            <Button type="submit">Submit</Button>
          </CardActions>
        </form>
      </Card>
      <Card
        className={classes.centered}
        style={{ maxHeight: "40vh", overflow: "auto" }}
      >
        <CardContent>{commentfromDB}</CardContent>
      </Card>
      ;
    </div>
  );
};
export default withStyles(styles)(Comments);
