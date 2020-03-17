import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

//import Navbar from 'react-bootstrap/Navbar'
import FormControl from "@material-ui/core/FormControl";
import "bootstrap/dist/css/bootstrap.min.css";
import Navgo from "./navbar.js";
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
  bcg_img2: {
    backgroundImage: `url(${process.env.PUBLIC_URL + "/media/surf.jpg"})`,
    minHeight: 500,
    height: "100vh",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  bcg_img3: {
    backgroundImage: `url(${process.env.PUBLIC_URL + "/media/surf3.jpg"})`,
    minHeight: 500,
    height: "100vh",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  bcg_img1: {
    backgroundImage: `url(${process.env.PUBLIC_URL +
      "/media/redmountain.jpg"})`,
    minHeight: 500,
    minWidth: 400,
    height: "100vh",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
});

const Welcome = ({ classes, currentUser, updateUser, ...props }) => {
  // console.log(props);
  return [
    <div>
      <Navgo />
    </div>,
    <div className={classes.bcg_img1}>
      <section>
        <img style={{ display: 'flex', margin:'auto', paddingTop:'50px' }} width='100px' src={process.env.PUBLIC_URL + "/media/Abstergo.jpg"} />
        <Typography align="center" variant="h5" gutterBottom>
          Scroll down
        </Typography>
      </section>
    </div>,
    <div className={`welcome tab`} style={{ backgroundColor: "white" }}>
      <Typography align="center" variant="h5" gutterBottom>
        Welcome to my Webpage{" "}
      </Typography>
      <Typography component="p">
        Keep scrolling to see the parallax effect. This page contains some info <Link to={`/aboutme`}>{"about me"}</Link>,
        my <Link to={`/faceid`}>{"design portfolio"}</Link>, a place to leave <Link to={`/comments`}>{"comments"}</Link>, and various small web apps i'm continously working on{" "}

      </Typography>
    </div>,
    <div className={classes.bcg_img2} />,
    <div className={`welcome tab`} style={{ backgroundColor: "white" }}>
      <section className={classes.bcg_img3} id="about">
        <body>
          <section>
            <h1>Stuff I like</h1>
            <p>
              Tech, software engineering, angel investing, venture capital
            </p>
            <p>
             surfing, reading, making short videos, hiking
            </p>
            <p>
             soccer, tennis, and running
            </p>
          </section>
        </body>
      </section>
      <section />

      <body>
        <section>
          <h1>Red Pandas and Dolphins</h1>
          <p>
            Overall just majestic creatures. Come shred the gnar in hawaii with some
            Dolphins. Then hop over to Japan to see some Red pandas. The Panda has become the symbol of WWF.
            The well-known
            panda logo of WWF originated from a panda named Chi Chi that was
            transferred from the Beijing Zoo to the London Zoo in the same
            year of the establishment of WWF.
          </p>
        </section>
      </body>
    </div>
  ];
};
export default withStyles(styles)(Welcome);

//Welcome = withStyles(styles)(Welcome); // apply HOC
// <Form inline>
//   <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//   <Button variant="outline-success">Search</Button>
// </Form>
