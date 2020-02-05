import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import {Navbar,Nav, NavDropdown }from 'react-bootstrap'
import {Form }from 'react-bootstrap'
import Button from '@material-ui/core/Button';
import {Redirect} from "react-router-dom"
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from 'react-router-dom'
import { parseJwt } from "./fcns.js"
import { useSelector,useDispatch } from 'react-redux'
import setUser from '../redux/reducer.js'
import 'bootstrap/dist/css/bootstrap.min.css';

const Navgo = ({...props}) => {
  const user = useSelector(state => state.user);
  let history = useHistory();
  useEffect(() => {

  }, []); // the []) ensures hook only called on mount not every page refresh

  let logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    history.push('/');
    // force hard refresh
    window.location.href = `${process.env.PUBLIC_URL}/`;
  };

  // make user take it to profile page
  return (
    <div className={`1`}>
    <Navbar variant="dark" bg="dark" expand="lg" fixed='top'>
      <Navbar.Brand href="/">Algo</Navbar.Brand>
      <Navbar.Text>User: <a href="">{user == null
        ? 'no user logged in'
        : `${user.username}`}</a></Navbar.Text>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/faceid">FaceID</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          <NavDropdown title="Other" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Beta1.1</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Beta1.2</NavDropdown.Item>
            <NavDropdown.Item href="/comments">Comments</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <Button onClick={e => logout(e)} style={{ backgroundColor: "white" }}>Logout</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>

    </div>

  );
};
export default Navgo;

//Welcome = withStyles(styles)(Welcome); // apply HOC
// <Form inline>
//   <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//   <Button variant="outline-success">Search</Button>
// </Form>
