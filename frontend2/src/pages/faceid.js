import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeAPICall } from "../api/api.js";

import "bootstrap/dist/css/bootstrap.min.css";
import Navgo from "./navbar.js";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Card, CardActions, CardContent } from "@material-ui/core";
import axios from 'axios';

const styles = theme => ({
  root: {
    root2: {
      background: "red"
    },
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2)
  },

  MuiButton: {
    padding: 0
  }
});

const Welcome = ({ classes, ...props }) => {
  console.log(props);

  // variable objects to store data retrieved from server
  let [data, updateData] = useState([]);
  let [list, updateList] = useState([]);
  let [message, setMessage] = useState(null);

  /* gets a specific image from the server /
   * and updates the data field with that info
   * @param url - really the event is passed in */
  const getImage = async url => {
    url.preventDefault();
    console.log(url.target);
    url = typeof url === "undefined" ? "" : url.target.innerHTML;
    let res = await makeAPICall(
      "GET",
      "http://127.0.0.1:8000/apidb/image/" + url
    );
    let body = await res.json();
    console.log(res);
    //console.log(body);
    console.log(res.status);
    if (res.status === 200) {
      updateData(body.message);
    }
  };

  /* gets the list of images from the server
   * and updates the list object with this info
   */
  const getImageList = async () => {
    let res = await makeAPICall("GET", "http://127.0.0.1:8000/apidb/imagelist");
    let body = await res.json();
    console.log(res);
    //console.log(body);
    console.log(res.status);
    if (res.status === 200) {
      updateList(body.list);
    }
  };

  /*
   * uploads and image to the server and displays message
   */
  const uploadImage = async e => {
    // e is event
    e.preventDefault();
    let { target } = e;
    console.log(target.files);

    const fd = new FormData();
    console.log(typeof target.files);
    fd.append('image', target.files[0]);
    fd.append('name', target.files[0].name);

    let url = 'http://127.0.0.1:8000/apidb/image';
    axios.post(url, fd, {
      headers: {
        'content-type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
      console.log(progressEvent.loaded / progressEvent.total)
    }
    })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err))
    // let res = await makeAPICall("POST", "http://127.0.0.1:8000/apidb/image", fd);
    // let body = await res.json();
    // console.log(res);
    // console.log(res.status);
    // if (res.status === 200) {
    //   updateList(body.list);
    // }

  };

  useEffect(() => {
    const API = "http://127.0.0.1:8000/apidb/image";
    //getImage();
    getImageList();
  }, []); // the []) ensures hook only called on mount not every page refresh

  return [
    <div>
      <Navgo />;
    </div>,
    <div className={classes.root} style={{ backgroundColor: "white" }}>
      <Typography align="center" variant="h5" gutterBottom>
        Pictures Database{" "}
      </Typography>
      {list.map((val, index) => {
        return (
          <li key={index}>
            {
              <Button
                className={classes.MuiButton}
                type="submit"
                text={val}
                onClick={getImage}
              >
                {val}{" "}
              </Button>
            }
          </li>
        );
      })}
      <Card className={classes.centered}>
        <CardContent>
          <img src={`data:image/jpeg;base64,${data}`} style={{maxWidth: '70vw', height: '70vh'}} />
        </CardContent>
      </Card>

      <Button variant="contained" component="label" onChange={uploadImage}>
        Upload File
        <input type="file" style={{ display: "none" }} />
      </Button>
      {message && (
        <Typography color="error" variant="body1">
          {message}
        </Typography>
      )}
    </div>
  ];
};
export default withStyles(styles)(Welcome);
