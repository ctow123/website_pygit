import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import {Navbar,Nav, NavDropdown }from 'react-bootstrap'
import {Form }from 'react-bootstrap'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom'
import { parseJwt } from "./fcns.js"
import { useSelector } from 'react-redux'
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
    const script2 = document.createElement("script2");
script2.src = "https://apis.google.com/js/client.js";
          document.body.appendChild(script2);
 // GoogleAuth.signOut()
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

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
          <Nav.Link href="/aboutme">About Me</Nav.Link>
          <Nav.Link href="/faceid">Design Portfolio</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/comments">Comments</Nav.Link>
          <NavDropdown title="Other" id="basic-nav-dropdown">
            <NavDropdown.Item href="/stocks">Investments</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Dreams</NavDropdown.Item>
            <NavDropdown.Item href="/yelpaddon">Yelp Beta addon</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Beta</NavDropdown.Item>
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
