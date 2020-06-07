import React from "react";
import Navgo from "./navbar.js";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { makeAPICall } from "../api/api.js";
import { apiprefix, notesendpoint } from "../api/apiprefix.js";
import { styles } from "./styling.js";
const { v4: uuidv4 } = require("uuid");

const Viz = ({ classes, ...props }) => {
  // console.log(props);
  let [searchabletags, updateSearchabletags] = React.useState([]);
  let [isDragging, updateDragging] = React.useState(false);
  let [x, updateX] = React.useState(0);
  let [xstart, updateXStart] = React.useState(0);
  let [xmod, updateXMod] = React.useState(0);
  let [y, updateY] = React.useState(0);
  let [ystart, updateYStart] = React.useState(0);
  let [ymod, updateYMod] = React.useState(0);
  React.useEffect(() => {
    // var c = document.getElementById("myCanvas");
    // var ctx = c.getContext("2d");
    // var coords = [[150, 50], [20, 85], [160, 95], [-10, 0]];
    //
    // ctx.beginPath();
    // for (var i = 0; i < coords.length; i++) {
    //   ctx.moveTo(coords[i][0], coords[i][1]);
    //   ctx.arc(coords[i][0], coords[i][1], 20, 0, Math.PI * 2, true);
    //   ctx.lineWidth = 4;
    //   ctx.stroke();
    // }
  }, []);

  React.useEffect(() => {
    getSearchableTags();
  }, []);

  React.useEffect(() => {
    let svgbox = document.getElementById("testsvg");
    svgbox.addEventListener("mousedown", handleMouseDown);
    svgbox.addEventListener("mousemove", handleMouseMove);
    svgbox.addEventListener("mouseup", handleMouseUp);
    return () => {
      svgbox.removeEventListener("mousedown", handleMouseDown);
      svgbox.removeEventListener("mousemove", handleMouseMove);
      svgbox.removeEventListener("mouseup", handleMouseUp);
    };
  });

  function handleMouseDown(e) {

    // set the drag flag
    updateXStart(e.pageX);
    updateXMod(x);
    updateYStart(e.pageY);
    updateYMod(y);
    updateDragging(true);
  }

  function handleMouseUp(e) {
    // canMouseX=parseInt(e.clientX-offsetX);
    // canMouseY=parseInt(e.clientY-offsetY);
    // clear the drag flag
    updateDragging(false);
  }

  function handleMouseMove(e) {
    // if the drag flag is set, clear the canvas and draw the image
    if (isDragging) {
      // console.log(e.pageY);
      // console.log(ystart);
      // console.log(-1*(ystart-e.pageY));
      updateX(xmod + (xstart - e.pageX) / 4);
      updateY(ymod + (ystart - e.pageY) / 4);

      // console.log('dragging');
    }
  }

  async function getSearchableTags() {
    let res = await makeAPICall("GET", `${notesendpoint}/notesapp/getTagsList`);
    let status = res.status;
    let body = await res.json();
    // error
    if (status === 200) {
      updateSearchabletags(searchabletags => [...searchabletags, ...body.tags]);
    }
  }

  // <div style={{ overflow: "hidden" }}>
  //   <canvas
  //     width="500"
  //     height="500"
  //     id="myCanvas"
  //     style={{ width: "50vw", height: "50vh", border: "1px solid #000000" }}
  //   ></canvas>
  // </div>
  return (
    <div className={classes.root}>
      <Navgo />
      <svg id="testsvg" viewBox={`${x} ${y} 200 200`}>
        <g fill="white" stroke="green" stroke-width="5">
          <circle cx="40" cy="40" r="25" fill="yellow" />
          <circle cx="60" cy="60" r="25" />
        </g>
        <g
          fill="white"
          stroke="Red"
          stroke-width="5"
          transform={`translate(0 45.5)`}
        >
          <circle cx="14" cy="60" r="25" />
          <text  dx= '14' dy='60' fill='black' text-anchor="middle" stroke="#51c5cf" stroke-width="0px" style={{fontSize: '8px',fontFamily:'Helvetica Neue'}}> test</text>
        </g>
        {searchabletags.length
          ? searchabletags.map((text, index) => (
            <g
              fill="white"
              stroke="Red"
              stroke-width="5"
              key={index}
            >
              <circle cx={index*20+100} cy={30} r="10" />
              <text  dx={index*20+100} dy={30} fill='black' text-anchor="middle" stroke="#51c5cf" stroke-width="0px" style={{fontSize: '8px',fontFamily:'Helvetica Neue'}}> {text}</text>
            </g>
            ))
          : null}
      </svg>
      <div style={{ display: "flex" }}>
        {searchabletags.length
          ? searchabletags.map((text, index) => (
            <g
              fill="white"
              stroke="Red"
              stroke-width="5"
              transform={`translate(0 45.5)`}
              key={index}
            >
              <circle cx={index*5+20} cy={index*5+10} r="25" />
              <text  dx= '14' dy='60' fill='black' text-anchor="middle" stroke="#51c5cf" stroke-width="0px" style={{fontSize: '8px',fontFamily:'Helvetica Neue'}}> test</text>
            </g>
            ))
          : null}
      </div>
    </div>
  );
};
export default withStyles(styles)(Viz);
