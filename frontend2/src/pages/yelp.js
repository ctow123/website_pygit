import React, { useState, useEffect, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import "bootstrap/dist/css/bootstrap.min.css";
import Navgo from "./navbar.js";
import TextField from "@material-ui/core/TextField";
import { Card, CardActions, CardContent, ButtonGroup } from "@material-ui/core";
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { InfoWindow, Marker } from 'google-maps-react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { blue } from '@material-ui/core/colors';

import { withStyles } from "@material-ui/core/styles";
import { useSelector,useDispatch } from 'react-redux'
import { makeAPICall } from "../api/api.js";
import apiprefix from "../api/apiprefix.js";

let keyapi = 'AIzaSyA3qJk3H3SaQOLQOkxCNuycA8JmyP3ekqk'
let yelpapikey = 'ZCAw9cQsX-ctjUl3dP8lt9uW47llaEy1PMIeSaqxSlPbRBTXciyDvjbyJbAZwKSKPmS4GJqZOdxA0utMF8C8XIhXQeFILEwjwPBLDRKnjp-Tkm2zBsB_6OHHM_hPXnYx'




const mapStyles = {
  width: '100%',
  height: '70%'
};

const styles = theme => ({
  centered: {
    margin: 'auto', // https://learnlayout.com/max-width.html
    'margin-bottom': '20px',
    maxWidth: '600px',

  },
  centerChildren: {
    justifyContent: "center"
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  fab: {
   position: 'absolute',
   bottom: theme.spacing(2),
   right: theme.spacing(2),
 }
});
// ______________________DIALOG__________
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

let SimpleDialog = ({ classes, ...props }) => {
  const emails = ['username@gmail.com', 'user02@gmail.com'];
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = value => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <List>
        {emails.map(email => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog = withStyles(styles)(SimpleDialog);

const Yelp = ({ classes, ...props }) => {
  // console.log(props);

  const user = useSelector(state => state.user);
  const [open, setOpen] = useState(false);
  let [locations, updateLocations] = useState({'stores': []});
  let [listresturant, updateListresturant] = useState([]);
 let [selectedIndex, setSelectedIndex] = React.useState(1);
  useEffect(() => {
    getLocation()
    if(locations.stores.length != 0){


    let row = []
    row.push(  <ListItem
        key={0}
        button
        selected={selectedIndex === 0}
        onClick={event => handleListItemClick(event, 0, locations)}
      >

      <ListItemIcon>
      <img src={locations.stores[0].image_url}  style={{maxWidth: '5vw', height: '5vh'}} />
      </ListItemIcon>
      <ListItemText primary={locations.stores[0].name} />
      <ListItemText secondary={locations.stores[0].location.display_address} />
          </ListItem>)
    updateListresturant(
      row
    );
  }
}, [locations, selectedIndex]); // the []) ensures hook only called on mount not every page refresh
    console.log(locations);

  function getLocation() {
    if (navigator.geolocation) {
      console.log(navigator.geolocation.getCurrentPosition(showPosition));
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }


function showPosition(position) {
  let pos = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
  console.log(pos);
}

let onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

let  onClose = state => {
    if (state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

let thestate = {
   stores: [{lat: 47.49855629475769, lng: -122.14184416996333},
           {latitude: 47.359423, longitude: -122.021071},
           {latitude: 47.2052192687988, longitude: -121.988426208496},
           {latitude: 47.6307081, longitude: -122.1434325},
           {latitude: 47.3084488, longitude: -122.2140121},
           {latitude: 47.5524695, longitude: -122.0425407}],
    production: ['hi']
 }


let displayMarkers = (thestate) => {
 return thestate.stores.map((store, index) => {
   return <Marker key={index} id={index} position={{
    lat: store.latitude,
    lng: store.longitude
  }}
  onClick={() => console.log("You clicked me!")} />
 })
}

const TAKEOUT = { 'term': '', 'limit': 5,  'latitude': '','longitude':  -122.176, 'radius':'',
'categories':'','price': '1,2','open_now': true, 'attributes':''};
const FAST = { 'term': '', 'limit': 5,  'latitude': 47.444,'longitude':  -122.176, 'radius':'',
'categories':'','price': '1,2,3','open_now': true, 'attributes':"hot_and_new,waitlist_reservation"};
const HEALTHY = { 'term': '', 'limit': 5,  'latitude': 47.444,'longitude':  -122.176, 'radius':'',
'categories':'','price': '1,2,3','open_now': true, 'attributes':"hot_and_new,waitlist_reservation"};
const INSTA_FOODIE = { 'term': '', 'limit': 5,  'latitude': 47.444,'longitude':  -122.176, 'radius':'',
'categories':'','price': '1,2,3','open_now': true, 'attributes':"hot_and_new,waitlist_reservation"};
const FRIENDS = { 'term': '', 'limit': 5,  'latitude': 47.444,'longitude':  -122.176, 'radius':'',
'categories':'','price': '1,2,3','open_now': true, 'attributes':"hot_and_new,waitlist_reservation"};

let handleListItemClick = (event, index, storeinfo) => {
console.log(event.target);
  setSelectedIndex(index);
  console.log(index);
  console.log(locations);
  console.log('store info ' + storeinfo);
  console.log(selectedIndex);
};

// search type is either searching with terms or specific business (two values search or business)
let callyelpapi = async (searchtype, searchparams) => {
  let res = await makeAPICall(
    "POST",
    `${apiprefix}:8000/apidb/yelpappAPI`,
    {'searchtype': searchtype, 'searchparams': searchparams}
  );
  let status = res.status
  let body = await res.json();
  if(status !== 200 && status !== 201){
    console.log('failed');
  }
  else{
    console.log(body.res.businesses);
    await updateLocations({stores: body.res.businesses});
    console.log(locations);
    let row = []
    row.push(  <ListItem
        key={0}
        button
        selected={selectedIndex === 0}
        onClick={event => handleListItemClick(event, 0, locations)}
      >

      <ListItemIcon>
      <img src={body.res.businesses[0].image_url}  style={{maxWidth: '5vw', height: '5vh'}} />
      </ListItemIcon>
      <ListItemText primary={body.res.businesses[0].name} />
      <ListItemText secondary={body.res.businesses[0].location.display_address} />
          </ListItem>)
    updateListresturant(
      row
    );

  }
}

//   <InfoWindow
// marker={state.activeMarker}
// visible={state.showingInfoWindow}
// onClose={onClose}
// >
// <div>
// <h4>{state.selectedPlace.name}</h4>
// </div>
// </InfoWindow>

// lat: -1.2884,
// lng: 36.8233
//
// <Map
//        google={props.google}
//        zoom={7}
//        style={mapStyles}
//        initialCenter={{ lat: 47.444, lng: -122.176}}
//      >
//      <Marker
//        onClick={onMarkerClick}
//        name={'Kenyatta International Convention Centre'}
//      />
// {displayMarkers(thestate)}
//      </Map>


const handleFoodSearch = async (event, type) => {
  switch (type) {
    case 'takeout':
      console.log('takeout block');
      await callyelpapi('search',TAKEOUT);
      break;
    case 'fast':
      console.log('fast block');
      // await callyelpapi('search',FAST);
      updateListresturant(
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={event => handleListItemClick(event, 0)}
        >
        <ListItemText primary={'testing'} />
            </ListItem>
      );
      break;
    case 'healthy':
      console.log('healthy');
      await callyelpapi('search',HEALTHY);
      break;
    case 'instagram_foodie':
      console.log('instagram_foodie');
      await callyelpapi('search',INSTA_FOODIE);
      break;
    case 'friends':
      console.log('friends');
      await callyelpapi('search',FRIENDS);
      break;
    default:
      // display error message
  }
};

const handleClickOpen = () => {
   setOpen(true);
 };

 const handleClose = value => {
   setOpen(false);
 };

 // let testing = listresturant.map((comp, i) => React.createElement(comp, { key: i}));
// console.log(testing);
// console.log(listresturant.length);
  return (
    <div className={classes.centered} style={{ backgroundColor: "white"  }}>
      <Navgo />
      <Typography style={{'marginTop':'60px'}} align="center" variant="h5" gutterBottom>
        Yelp Prototype{" "}
      </Typography>
      <ButtonGroup style={{  'marginLeft':'5%'   }}color="primary" aria-label="outlined primary button group">
        <Button onClick={ event => handleFoodSearch(event, 'takeout')} >Takeout</Button>
        <Button onClick={ event => handleFoodSearch(event, 'fast')} >Fast</Button>
        <Button onClick={ event => handleFoodSearch(event, 'healthy')} >Healthy</Button>
        <Button onClick={ event => handleFoodSearch(event, 'instagram_foodie')} >Instagram Foodie</Button>
        <Button onClick={ event => handleFoodSearch(event, 'friends')} >Bar (meeting friends)</Button>
      </ButtonGroup>

      <List component="nav" aria-label="main mailbox folders">

{listresturant}
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <img src="../media/Abstergo.jpg"  style={{maxWidth: '5vw', height: '5vh'}} />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
          <Typography>{"Draftsdos"} </Typography>
        </ListItem>
      </List>
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={event => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={event => handleListItemClick(event, 3)}
        >
          <ListItemText primary="Spam" />
        </ListItem>
      </List>
      <Fab
         variant="extended"
         size="small"
         color="primary"
         aria-label="add"
         className={classes.fab}
         onClick={event => handleClickOpen(event)}
       >
         <EditIcon className={classes.extendedIcon} />
         Review
       </Fab>
        <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
};
export default GoogleApiWrapper({
  apiKey: keyapi
})(withStyles(styles)(Yelp));
