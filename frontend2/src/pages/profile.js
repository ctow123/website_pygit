import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import {Button, TextField} from "@material-ui/core";
import Navgo from "./navbar.js";
import { Card, CardActions, CardContent } from "@material-ui/core";
import { useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {styles} from './styling.js'


const Profile = ({ classes, ...props }) => {
  const user = useSelector(state => state.user);
  useEffect(() => {}, []);

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
          </div>
        </form>
      </Card>
    </div>
  );
};

export default withStyles(styles)(Profile);
