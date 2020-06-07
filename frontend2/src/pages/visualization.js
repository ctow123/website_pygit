import React from "react";
import Navgo from "./navbar.js";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { makeAPICall } from "../api/api.js";
import { apiprefix, notesendpoint } from "../api/apiprefix.js";
import {styles} from './styling.js'
const { v4: uuidv4 } = require('uuid');

const Viz = ({ classes, ...props }) => {
  // console.log(props);


  React.useEffect(() => {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();
  }, []);

  return (
    <div className={classes.root}>
      <Navgo />
      <Typography
        style={{ marginTop: "70px" }}
        align="center"
        variant="h5"
        gutterBottom
      ></Typography>
      <canvas id="myCanvas" width="200" height="100" style={{border:'1px solid #000000'}}>
</canvas>
    </div>
  );
};
export default withStyles(styles)(Viz);
