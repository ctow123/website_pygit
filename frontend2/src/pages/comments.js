import React, { useState, useEffect, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import {Button, TextField }from "@material-ui/core/";
import "bootstrap/dist/css/bootstrap.min.css";
import Navgo from "./navbar.js";
import { Card, CardActions, CardContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { makeAPICall } from "../api/api.js";
import { apiprefix, wsprefix } from "../api/apiprefix.js";
import {styles} from './styling.js'

const Comments = ({ classes, ...props }) => {
  const user = useSelector(state => state.user);
  let [commentfromDB, updateCommentfromDB] = useState([]);
  let [message, updateMessage] = useState(null);
  let [values, setValues] = useState({ comment: "" });

// useref keeps same object between renders
  const socket = useRef(null);
  // comments should automatically load and update as new ones are added, need websockets
  useEffect(() => {
    socket.current = new WebSocket(`${wsprefix}/apidb/ws/chat`);
    socket.current.onopen = () => {
      console.log("WebSocket open");
    };
    // take new comments in redis cache and add to list
    socket.current.onmessage = e => {
      let newcomment = JSON.parse(e.data);
      let newelem = (
        <Typography
          key={generateKey(newcomment.username)}
          color="textPrimary"
          variant="body1"

          id={newcomment.comment}
        >
          {" "}
          {newcomment.username + " : " + newcomment.comment}{" "}
        </Typography>
      );
      updateCommentfromDB(commentfromDB => [...commentfromDB, newelem]);
      let test = document.getElementById(newcomment.comment);
      test.scrollIntoView();
    };
    fetchComments();
  }, []); // the []) ensures hook only called on mount not every page refresh

  let handleChange = event => {
    let { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const generateKey = pre => {
    return `${pre}_${new Date().getTime()}`;
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
          JSON.stringify({
            username: user.username,
            comment: values.comment,
            update: true
          })
        );
        // window.location.reload();
        setValues({ comment: "" });
      }
    }
  };

  // fetches all comments from database
  const fetchComments = async () => {
    let res = await makeAPICall("GET", `${apiprefix}/apidb/comments`);
    let status = res.status;
    let body = await res.json();
    if (status !== 200 && status !== 201) {
      updateMessage(body.error);
    } else {
      commentToHTML(body.data);
    }
  };

  // converts the comment from API call to data that can be displayed in JSX
  const commentToHTML = commentarray => {
    let temparray = [];
    let i = 0;
    for (i = 0; i < commentarray.length; i++) {
      // console.log(commentarray[i]);
      temparray.push(
        <Typography key={i} id={i} color="textPrimary" variant="body1">
          {" "}
          {commentarray[i].username + " : " + commentarray[i].comment}{" "}
        </Typography>
      );
    }
    if (i === commentarray.length) {
      // console.log(temparray);
      updateCommentfromDB(temparray);
      let test = document.getElementById(i-1);
      test.scrollIntoView();
    }

  };

  // uploads comment to database
  const uploadComment = async comment => {
    let res = await makeAPICall("POST", `${apiprefix}/apidb/comments`, {
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
    <div className={classes.root} style={{ backgroundColor: "white" }}>
      <Navgo />
      <Typography
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
    </div>
  );
};
export default withStyles(styles)(Comments);
