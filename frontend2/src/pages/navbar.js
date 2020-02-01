import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import {Navbar,Nav, NavDropdown }from 'react-bootstrap'
import Button from '@material-ui/core/Button';
//import Navbar from 'react-bootstrap/Navbar'
import FormControl from '@material-ui/core/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navgo = ({...props}) => {
  // console.log(props);

  return (
    <div className={`1`}>

    <Navbar variant="dark" bg="dark" expand="lg" fixed='top'>
      <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/faceid">FaceID</Nav.Link>
          <Nav.Link href="/comments">Comments</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>

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
