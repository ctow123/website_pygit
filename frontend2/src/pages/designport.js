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
import { apiprefix } from '../api/apiprefix';
import {styles} from './styling.js'


const Welcome = ({ classes, ...props }) => {
  // variable objects to store data retrieved from server
  let [data, updateData] = useState([]);
  let [list, updateList] = useState([]);
  let [message, setMessage] = useState(null);

  /* gets a specific image from the server /
   * and updates the data field with that info
   * @param url - really the event is passed in */
  const getImage = async url => {
    url.preventDefault();
    url = typeof url === "undefined" ? "" : url.target.innerHTML;
    let res = await makeAPICall(
      "GET",
      `${apiprefix}/pics/` + url
    );
    let body = await res.blob();
    if (res.status === 200) {
      updateData(body.message);
      const objectURL = URL.createObjectURL(body);
      // console.log(objectURL);
      updateData(objectURL);
    }
  };

  /* gets the list of images from the server
   * and updates the list object with this info
   */
  const getImageList = async () => {
    let res = await makeAPICall("GET", `${apiprefix}/apidb/imagelist`);
    let body = await res.json();
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
    getImageList();
  }, []); // the []) ensures hook only called on mount not every page refresh

  return (
    <div className={classes.root} style={{ backgroundColor: "white", minHeight: '100vh' }}>
      <Navgo/>
      <Typography align="center" variant="body1" gutterBottom>
        My design portfolio. A bunch of random things, i find aesthetically pleasing. click a name to see the picture. upload button disabled for now.
      </Typography>
      <ul id="otis" style={{ 'listStyle': "none" , 'height': '30vh', 'overflow': 'auto', padding: '0'}}>
      {list.map((val, index) => {
        return (
          <li key={index} className={classes.listitem}>
            {
              <Button
                className={classes.MuiButton}
                type="submit"
                text={val}
                onClick={getImage}
              >
                {val}
              </Button>
            }
          </li>
        );
      })}
      </ul>
      <Card className={classes.centered}>
        <CardContent>
          <img src={`${data}`} style={{maxWidth: '100vw', height: '40vh'}} />
        </CardContent>
      </Card>

      <Button variant="contained" component="label" style={{left: '100vw', position: 'sticky', marginTop: '20px'}}>
        Upload File
        <input type="file" style={{ display: "none" }} />
      </Button>

    </div>
  );
};
export default withStyles(styles)(Welcome);
