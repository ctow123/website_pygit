import React from "react";
import Navgo from "./navbar.js";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { makeAPICall } from "../api/api.js";
import { apiprefix, notesendpoint } from "../api/apiprefix.js";
import { styles } from "./styling.js";
import Fab from '@material-ui/core/Fab';
import Graph from "react-graph-vis";
import { useSelector } from "react-redux";
// https://visjs.github.io/vis-data/data/dataset.html
import { DataSet } from 'vis-data';
import {Input} from "reactstrap";
import {Button, Menu, MenuItem,ListItemText, Switch} from '@material-ui/core';
import {List,ListItem} from '@material-ui/core';
import {getQueryStringParams} from "./fcns.js";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { useHistory } from "react-router-dom";

const { v4: uuidv4 } = require("uuid");

const Viz = ({ classes, ...props }) => {
  // console.log(props);
const user = useSelector(state => state.user.username);
// {tag: {user: value}, tag: {user:value}}
let [searchabletags, updateSearchabletags] = React.useState({});
let history = useHistory();
let [users, updateUsers] = React.useState([])
// {path: {user: value}, path: {user:value}}
let [searchuser, updateSearchUser] = React.useState('');
let [pathWeight, updatePathWeight] = React.useState({});
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
     randomSeed: undefined,
     improvedLayout: true,
      clusterThreshold: 50,

   },
   physics: {
    enabled: true,
    solver: "barnesHut",
    barnesHut: {
         gravitationalConstant: -12000,
         centralGravity: 0.9,
         springLength: 95,
         springConstant: 0.04,
         damping: 0.09,
         avoidOverlap: 0
       },
},
     nodes: {
       shape: 'dot',
       scaling: {
           customScalingFunction: function(min, max, total, value) {
             return value / total;
           },
           min: 5,
           max: 300
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
       // console.log('evenontsnonotnsot');
       // console.log(event);
      },
      click: function(event) {
      // console.log(event);
      if (typeof event.nodes[0] !== 'undefined'){
        history.push(`/notes?user=${getQueryStringParams(props.location.search).user}&tag=${event.nodes[0]}`)
      }
      // console.log(event.nodes[0]);

    }
  },
  network: null
})
let [state, setState] = React.useState({});
let [colors,updateColors] = React.useState([]);
// const colors = ['#f54275','#42f56c','#f5c242']
const multicolors = ['#417380']
const defaultcolor = ['#add8e6']

React.useEffect(() => {
  let nodearray = [];
  for (var key in searchabletags) {
    let value = 0
    let colornum = 0
    let theuser;
    for (var tuser in searchabletags[key]) {
      // logged in
      if(tuser === user){
        value += (searchabletags[key])[tuser]
        colornum += 1
        theuser = user
      }
      if(tuser !== user && state[tuser] === true){
        value += (searchabletags[key])[tuser]
        colornum += 1
        theuser = tuser
      }
      //not logged in
      if(tuser === searchuser){
        value += (searchabletags[key])[tuser]
        colornum += 1
        theuser = tuser
      }
    }
    let color = colornum === 1 ? (users.indexOf(theuser) === -1 ?  defaultcolor[0] : colors[users.indexOf(theuser)] ): multicolors[0]
    if (value !== 0) nodearray.push({ id: key, value: value, label: key, color: color,     font : {
            size : 18,

        }});
  }
  updateG(gstate => ({
    graph: {
      nodes: nodearray,
      edges: [...gstate.graph.edges]
    },
    options: { ...gstate.options },
    events: { ...gstate.events },
    network: gstate.network
  }));
}, [searchabletags,state]);



React.useEffect(() => {
  var patharray = [];
  for (var key in pathWeight) {
    let value = 0
      for (var tuser in pathWeight[key]) {
        if(tuser === user){
          value += (pathWeight[key])[tuser]
        }
        if(tuser !== user && state[tuser] === true){
          value += (pathWeight[key])[tuser]
        }
        //not logged in
        if(tuser === searchuser){
          value += (pathWeight[key])[tuser]
        }
      }

    if (value > 0) patharray.push({from: key.split("][")[0], to: key.split("][")[1], value: value})
  }
  updateG(gstate => ({
    graph: {
      nodes: [...gstate.graph.nodes],
      edges: patharray
    },
    options: { ...gstate.options },
    events: { ...gstate.events },
    network: gstate.network
  }));
}, [pathWeight,state]);



React.useEffect(() => {
  let colorarray = []
  users.forEach((user, index) => {
    colorarray.push('#' + Math.floor(Math.random()*16777215).toString(16))
  });
  updateColors(colorarray)

}, [users]);

  React.useEffect(() => {

    // getUsers();
  }, []);

  React.useEffect(() => {
    if(Object.keys(getQueryStringParams(props.location.search)).length !== 0){
      updateSearchUser(getQueryStringParams(props.location.search).user)
    }

}, []);

  React.useEffect(() => {
if (searchuser !== ''){
      getSearchableTags(searchuser);
      getPathWeights(searchuser);
}

}, [searchuser]);

  async function getSearchableTags(username) {
  let res = await makeAPICall("GET", `${notesendpoint}/notesapp/getTagsList?user=${username}`);

    let status = res.status;
    let body = await res.json();
    // error
    if (status === 200) {
      console.log(body);
      let tagsdict = {};
      let localuser = typeof username !== 'undefined' ? username : user;
      (body.tags).forEach((tag, i) => {
        if (typeof searchabletags[tag] !== 'undefined'){
          tagsdict[tag] = {...searchabletags[tag], [username]: body.tagsCount[tag]}
        }else{
          tagsdict[tag] = {[username]: body.tagsCount[tag]}
        }
      });
      updateSearchabletags(searchabletags => ({...searchabletags, ...tagsdict}));
    }
  }

  async function getPathWeights(username) {
      let res  = await makeAPICall("GET", `${notesendpoint}/notesapp/getPathWeights?user=${username}`);

    let status = res.status;
    let body = await res.json();
    // error
    if (status === 200) {
      // console.log(body.weights);
      // console.log(Object.keys(body.weights[0]).length);
      let pathsdict = {};
      for (var key in body.weights[0]){
        if (typeof pathWeight[key] !== 'undefined'){
          pathsdict[key] = {...pathWeight[key], [username]: (body.weights[0])[key]}
        }else{
          pathsdict[key] = {[username]: (body.weights[0])[key] }
        }
      }
      console.log(pathsdict);
      updatePathWeight(pathWeight => ({...pathWeight, ...pathsdict}));

    }
    else {
      console.log(body);
    }
  }


  async function checkUser(user) {
    let res = await makeAPICall("GET", `${apiprefix}/apidb/checkuser?user=${user}`);
    let status = res.status;
    let body = await res.json();
    // error
    if (status === 200) {

      // array.remove(body,function(n) {return n === user;})
      // body = body.slice(0,5)
        setState(state => ( {[user]: false, ...state }))
      updateUsers([...users, user]);

    }
    else{
      console.log(body);
    }
  }

const handleClickOpen = (e, zm) => {
  e.preventDefault();
  if (zm === "plus") {
    console.log(gstate.network.getConnectedNodes('elon'));
    console.log(gstate.network.getConnectedEdges('elon'));
  gstate.graph.nodes[0].font =  {size: 30}
    gstate.network.setSelection({nodes:gstate.network.getConnectedNodes('elon') ,edges:gstate.network.getConnectedEdges('elon')})
  gstate.graph.nodes[0].color = '#FF3105'

    var options = {id: 1};
    var data = new DataSet(options);
    console.log(data);
    // get a specific item
var item1 = data.get(1);
console.log('item1', item1);
    // update an existing item
// data.updateOnly({id: 2, group: 1});


//     data.add([
//   {id: 1, text: 'item 1', date: new Date(2013, 6, 20), group: 1, first: true},
//   {id: 2, text: 'item 2', date: '2013-06-23', group: 2},
//   {id: 3, text: 'item 3', date: '2013-06-25', group: 2},
//   {id: 4, text: 'item 4'}
// ]);
    // gstate.network.unselectAll()
    // cleaning all users from searchabletags and pathWeight that are not main user
    // updateG(gstate => ({
    //   graph: {
    //     nodes: [...gstate.graph.nodes],
    //     edges: [
    //       { from: 2, to: 8, value: 3 },
    //       { from: 2, to: 9, value: 5 },
    //       { from: 2, to: 10, value: 10 , chosen: true, color: '#797979'},
    //       { from: 4, to: 6, value: 100 },
    //       { from: 5, to: 7, value: 2 },
    //       { from: 4, to: 5, value: 1 }
    //     ]
    //   },
    //   options:{ ...gstate.options},
    //   events: {...gstate.events},
    //   network: gstate.network
    // }));
  } else if (zm === "minus") {
        gstate.network.redraw()
    // console.log(searchabletags);
    // console.log(pathWeight);
    console.log(gstate);
  }
};




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
      // backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.gray,

    // },
  },
}))(MenuItem);

function handleSubmit(e) {
  e.preventDefault()
  checkUser(document.getElementById('adduser').value)
}

const handleChange = (event) => {
  setState({ ...state, [event.target.name]: event.target.checked });
  // if true update notes, if false remove
  if(event.target.checked){
    getSearchableTags(event.target.name)
    getPathWeights(event.target.name)

  }
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
{users.map((puser, index) => (puser !== user ?
    <StyledMenuItem       key={puser+index}>
      <ListItemText primary={puser} />
      <Switch
        checked={state[puser]}
        onChange={handleChange}
        color="primary"
        name={puser}
        id="hey"

      />
    </StyledMenuItem> : null
)) }


      </StyledMenu>
    <div className={classes.topLeft} style={{backgroundColor: 'lightgrey', padding: '20px', borderRadius: '15px', zIndex: 1}}>
    <form onSubmit={e => handleSubmit(e)} style={{marginBottom: '5px'}}  >
    <Input
    id='adduser'

      placeholder="Add user's graph"
      type="text"
      autoComplete="off"
    ></Input>
     </form>
    {users.map((puser, index) => (
        <p key={puser} >{puser + ' '}
<span style={{backgroundColor: colors[index], borderRadius: '50%', display: 'inline-block', height: '15px',width: '15px'}} />
        </p>


    )) }
    </div>
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
