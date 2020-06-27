import React from "react";
import Navgo from "./navbar.js";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { makeAPICall } from "../api/api.js";
import { apiprefix, notesendpoint } from "../api/apiprefix.js";
import { styles } from "./styling.js";
import Fab from '@material-ui/core/Fab';
import Graph from "react-graph-vis";
// import Graph from 'vis-react';
import {Button, Menu, MenuItem,ListItemText, Switch} from '@material-ui/core';
const { v4: uuidv4 } = require("uuid");


const Viz = ({ classes, ...props }) => {
  // console.log(props);
  let [searchabletags, updateSearchabletags] = React.useState([]);
  let [searchabletagsNum, updateSearchabletagsNum] = React.useState({});
  let [pathWeight, updatePathWeight] = React.useState([]);
 let [zoom, updateZoom] = React.useState(100);
let [gstate, updateG] = React.useState({
  graph : {
    nodes : [
      { id: 1, value: 2, label: "Algie" , color : 'rbga(120,32,14,1)'},
      { id: 2, value: 31, label: "Alston" },
      { id: 3, value: 12, label: "Barney" },
      { id: 4, value: 16, label: "Coley" },
      { id: 5, value: 17, label: "Grant" },
      { id: 6, value: 15, label: "Langdon" },
      { id: 7, value: 6, label: "Lee" },
      { id: 8, value: 5, label: "Merlin" },
      { id: 9, value: 30, label: "Mick" },
      { id: 10, value: 18, label: "Tod" }
    ],

    // create connections between people
    // value corresponds with the amount of contact between two people
    edges : [
      { from: 2, to: 8, value: 3 },
      { from: 2, to: 9, value: 5 },
      { from: 2, to: 10, value: 10 , chosen: true, color: '#797979'},
      { from: 4, to: 6, value: 100 },
      { from: 5, to: 7, value: 2 },
      { from: 4, to: 5, value: 1 },
      { from: 9, to: 10, value: 2 },
      { from: 2, to: 3, value: 6 },
      { from: 3, to: 9, value: 4 },
      { from: 5, to: 3, value: 1 },
      { from: 2, to: 7, value: 4 }
    ]

  },

  options : {
     layout: {
     randomSeed: 2
   },
     nodes: {
       shape: 'dot',
       scaling: {
           customScalingFunction: function(min, max, total, value) {
             return value / total;
           },
           min: 5,
           max: 100
         },
     },
     edges: {
       color: {
      color: "#D3D3D3",
      highlight: "#797979",
      hover: "#797979",
      opacity: 1.0
    },
       arrows: {
           to: { enabled: false, scaleFactor: 0, type: "arrow" },
           middle: { enabled: false, scaleFactor: 0, type: "arrow" },
           from: { enabled: false, scaleFactor: 0, type: "arrow" }
         }
     },

     height: (window.innerHeight / 1.1).toString(),
     interaction: {
    hover: true,
    hoverConnectedEdges: true,
    // hoverEdges: true,
    selectable: true,
    selectConnectedEdges: false,
    // BIG OPTIONS
    zoomView: true,
    dragView: true
  },



},

    events : {
     select: function(event) {
       var { nodes, edges } = event;
     },
     hoverNode: function(event) {
       console.log('evenontsnonotnsot');
        // this.neighbourhoodHighlight(event, this.props.searchData);
      },
      click: function(event) {
      // this.redirectToLearn(event, this.props.searchData);
      console.log(event);
    }
  },
  network: null
})

  React.useEffect(() => {
    var nodearray = []
    searchabletags.forEach((tag, index)=> {nodearray.push({id: index, value: searchabletagsNum[tag], label: tag})})
    updateG(gstate => ({
      graph: {
        nodes: nodearray,
        edges: [...gstate.graph.edges]
      },
      options:{ ...gstate.options},
      events: {...gstate.events},
      network: gstate.network
    }));

  }, [searchabletags,searchabletagsNum]);


  React.useEffect(() => {
    var patharray = []
    pathWeight.forEach((path, index)=> {

      if(path.value > 0){
      patharray.push({from: searchabletags.indexOf(path.key.split('][')[0]), to: searchabletags.indexOf(path.key.split('][')[1]), value: path.value})
}
    })
    updateG(gstate => ({
      graph: {
        nodes:[...gstate.graph.nodes] ,
        edges: patharray
      },
      options:{ ...gstate.options},
      events: {...gstate.events},
      network: gstate.network
    }));
  }, [pathWeight]);

  React.useEffect(() => {
    getSearchableTags();
    getPathWeights();
  }, []);

  async function getSearchableTags() {
    let res = await makeAPICall("GET", `${notesendpoint}/notesapp/getTagsList`);
    let status = res.status;
    let body = await res.json();
    // error
    if (status === 200) {
      updateSearchabletags(searchabletags => [...searchabletags, ...body.tags]);
      updateSearchabletagsNum(body.tagsCount);
    }
  }

  async function getPathWeights() {
    let res = await makeAPICall("GET", `${notesendpoint}/notesapp/getPathWeights`);
    let status = res.status;
    let body = await res.json();
    // error
    if (status === 200) {
      console.log(body.weights);
      console.log(body.weights[0]['key'].split(']['));
      updatePathWeight(body.weights);

    }
  }

const handleClickOpen = (e, zm) => {
  e.preventDefault();
  if (zm === "plus") {
    updateZoom(zoom - 10);
    updateG(gstate => ({
      graph: {
        nodes: [...gstate.graph.nodes],
        edges: [
          { from: 2, to: 8, value: 3 },
          { from: 2, to: 9, value: 5 },
          { from: 2, to: 10, value: 10 , chosen: true, color: '#797979'},
          { from: 4, to: 6, value: 100 },
          { from: 5, to: 7, value: 2 },
          { from: 4, to: 5, value: 1 }
        ]
      },
      options:{ ...gstate.options},
      events: {...gstate.events},
      network: gstate.network
    }));
  } else if (zm === "minus") {
    updateZoom(zoom + 10);
    console.log(searchabletags);
    console.log(searchabletagsNum);
    console.log(pathWeight);
    console.log(gstate);
  }
};



// const graph = {
//   nodes : [
//     { id: 1, value: 2, label: "Algie" , color : 'rbga(120,32,14,1)'},
//     { id: 2, value: 31, label: "Alston" },
//     { id: 3, value: 12, label: "Barney" },
//   ],
//
//   // create connections between people
//   // value corresponds with the amount of contact between two people
//   edges : [
//     { from: 2, to: 8, value: 3 },
//     { from: 2, to: 9, value: 5 },
//     { from: 2, to: 10, value: 10 , chosen: true, color: '#797979'},
//     { from: 4, to: 6, value: 100 },
//   ]
//
//  };

//  };
//
 // network.on( 'click', function(params) {
 //     idnode = params.nodes;
 //     idedge = params.edges;
 // });
 //
 // function red() {
 //     idnode2 = idnode;
 //     nodes.update({id: idnode2, color: "red"});
 // }
 // console.log(getNetwork());
 // style={style}
 //        getNetwork={this.getNetwork}
 //        getEdges={this.getEdges}
 //        getNodes={this.getNodes}
 //        vis={vis => (this.vis = vis)}
  const [anchorEl, setAnchorEl] = React.useState(null);
 const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',

    background: 'gainsboro', borderBottomRightRadius: '20px', borderBottomLeftRadius: '20px'
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    // '&:focus': {
    //   backgroundColor: theme.palette.primary.main,
    //   '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.gray,
    //   },
    // },
  },
}))(MenuItem);
const [state, setState] = React.useState({
  checkedA: false,
});

const handleChange = (event) => {
  if(state.checkedA){
    console.log('true'
    );
  }
  console.log(state.checkedA, 'before');
  setState({ ...state, [event.target.name]: event.target.checked });
console.log(state.checkedA, 'after');
};

return (
  <div className={classes.root} >
    <Navgo />
    <Button
    className={classes.topRight}
  aria-controls="customized-menu"
  aria-haspopup="true"
  variant="contained"
  color="primary"
  onClick={handleClick}
  style={{zIndex: '1', borderRadius: '20px'}}
>
  Friends Graphs
</Button>
<StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}

      >

      <StyledMenuItem>

<ListItemText primary="Sent mail" />
<Switch
       checked={state.checkedA}
       onChange={handleChange}
       color="primary"
       name="checkedA"

     />
          </StyledMenuItem>
          <StyledMenuItem>

    <ListItemText primary="Sent mail" />
              </StyledMenuItem>
      </StyledMenu>
    <Graph
            graph={gstate.graph}
            options={gstate.options}
            events={gstate.events}
            getNetwork={network => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
        updateG(gstate => ({
          graph: {
            nodes: [...gstate.graph.nodes],
            edges: [...gstate.graph.edges]
          },
          options:{ ...gstate.options},
          events: {...gstate.events},
          network: network
        }));
      }}
        />
    <Fab
      variant="extended"
      size="small"
      color="primary"
      className={classes.fab}
      onClick={event => handleClickOpen(event, 'plus')}

    >
      <i className="fa fa-plus" aria-hidden="true"></i>
    </Fab>
    <Fab
      variant="extended"
      size="small"
      color="primary"
      className={classes.fab2}
      onClick={event => handleClickOpen(event, 'minus')}
    >
      <i className="fa fa-minus" aria-hidden="true"></i>
    </Fab>
  </div>
);

};
export default withStyles(styles)(Viz);
