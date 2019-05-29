import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

//import Navbar from 'react-bootstrap/Navbar'
import FormControl from "@material-ui/core/FormControl";
import "bootstrap/dist/css/bootstrap.min.css";
import Navgo from "./navbar.js";
const Welcome = ({ ...props }) => {
  console.log(props);

  return (
    <div className={`welcome tab`} style={{ backgroundColor: "white" }}>
      <Navgo />
      <Typography align="center" variant="h5" gutterBottom>
        Welcome to Connor's Survey-R-Us{" "}
      </Typography>
      <Typography component="p">
        Click on a tab or click to see{" "}
        <Link to={`/question`}>{"available surveys"}</Link>.
      </Typography>
    </div>
  );
};
export default Welcome;

//Welcome = withStyles(styles)(Welcome); // apply HOC
// <Form inline>
//   <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//   <Button variant="outline-success">Search</Button>
// </Form>

//
// <div className={`1`}>
//
// <Navbar variant="dark" bg="dark" expand="lg">
//   <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//   <Navbar.Toggle aria-controls="basic-navbar-nav" />
//   <Navbar.Collapse id="basic-navbar-nav">
//     <Nav className="mr-auto">
//       <Nav.Link href="#home">Home</Nav.Link>
//       <Nav.Link href="#link">Link</Nav.Link>
//       <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//         <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//         <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//         <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//         <NavDropdown.Divider />
//         <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
//       </NavDropdown>
//     </Nav>
//
//   </Navbar.Collapse>
// </Navbar>
// </div>,
