import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import {Button, TextField} from "@material-ui/core";
import Navgo from "./navbar.js";
import { Card, CardActions, CardContent } from "@material-ui/core";
import { useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {styles} from './styling.js'
import { makeAPICall } from "../api/api.js";
import { apiprefix, notesendpoint } from "../api/apiprefix.js";

const Profile = ({ classes, ...props }) => {
  const user = useSelector(state => state.user);
  useEffect(() => {
    userInfo()
  }, []);

  let [values, setValues] = useState({ twitter: "", blogs: "", website: "", youtube: "", podcasts: "", notion: "", books:"" });
  let links = [ 'twitter', 'blogs',  'website' , 'youtube' , 'podcasts' , 'notion' , 'books']


  let handleChange = event => {
    let { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  // on submission, takes username and password and dispatches the login action
  let handleSubmit = e => {
    e.preventDefault();
    console.log(values);
    changeLinks(values)
  };

  async function changeLinks(data) {
    let res = await makeAPICall("PUT", `${apiprefix}/apidb/userlinks`, data);
    let status = res.status;
    let body = await res.json();
    if (status === 200) {
      console.log('success');
    }
  }

  async function userInfo() {
    let res = await makeAPICall("GET", `${apiprefix}/apidb/userInfo`);
    let status = res.status;
    let body = await res.json();
    if (status === 200) {
      console.log(body);
      for (var key in body){
          setValues({ ...values, [key]: body[key] });
      }

    }
  }

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

    // let res = await makeAPICall("POST", "http://127.0.0.1:8000/apidb/image", fd);
    // let body = await res.json();
    // console.log(res);
    // console.log(res.status);
    // if (res.status === 200) {
    //   updateList(body.list);
    // }

  };

  return (
    <div className={classes.root} style={{ backgroundColor: "white", minHeight: '100vh' }}>

      <Navgo />
      <Typography
        align="center"
        variant="h5"
        gutterBottom
      >
        Link Other accounts Information{" "}
      </Typography>

      <Card className={classes.centered}>
        <form onSubmit={event => handleSubmit(event)} autoComplete="off">
          <CardContent>
          {links.length
            ? links.map((link, index) => (
              <TextField
                key={link}
                type="text"
                name={link}
                label={link}
                value={values[link]}
                fullWidth
                margin="normal"
                onChange={event => handleChange(event)}
              />
              ))
            : null}
          </CardContent>
          <CardActions className={classes.centerChildren}>
            <Button type="submit">Save</Button>
          </CardActions>
          <div style={{display: 'flex', width: '100%', marginBottom: '20px'}}>
          <Button variant="contained" component="label" style={{margin: 'auto' }}>
            Upload Blogs (bookmarks list)
            <input type="file" accept=".html" style={{ display: "none" }} />
          </Button>
          <Button variant="contained" component="label" style={{margin: 'auto' }}>
            Change Profile Pic
            <input type="file" accept=".png, .jpg, .jpeg" style={{ display: "none" }} onChange={uploadImage}/>
          </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default withStyles(styles)(Profile);
