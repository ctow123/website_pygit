import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

//import Navbar from 'react-bootstrap/Navbar'
import FormControl from "@material-ui/core/FormControl";
import "bootstrap/dist/css/bootstrap.min.css";
import Navgo from "./navbar.js";
import { withStyles } from "@material-ui/core/styles";
import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";

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

const Welcome = ({ classes, ...props }) => {
  console.log(props);

  return [
    <div>
      <Navgo />
    </div>,
    <div className={classes.bcg_img1}>
      <section>
        <img class="logo" src="../static/media/Abstergo.jpg" />
      </section>
    </div>,
    <div className={`welcome tab`} style={{ backgroundColor: "white" }}>
      <Typography align="center" variant="h5" gutterBottom>
        Welcome to Connor's Survey-R-Us{" "}
      </Typography>
      <Typography component="p">
        Click on a tab or click to see{" "}
        <Link to={`/question`}>{"available surveys"}</Link>.
      </Typography>
    </div>,
    <div className={classes.bcg_img2} />,
    <div className={`welcome tab`} style={{ backgroundColor: "white" }}>
      <section className={classes.bcg_img2} id="about">
        <body>
          <section>
            <h1>Pandas and Dolphins </h1>
            <p>
              Overall just majestic creatures. come shred the gnar with some
              Dolphins. The Panda has become the symbol of WWF. The well-known
              panda logo of WWF originated from a panda named Chi Chi that was
              transferred from the Beijing Zoo to the London Zoo in the same
              year of the establishment of WWF.
            </p>
          </section>
        </body>
      </section>
      <section />
      <Navgo />
      <Typography align="center" variant="h5" gutterBottom>
        Welcome to Connor's Survey-R-Us{" "}
      </Typography>
      <Typography component="p">
        Click on a tab or click to see{" "}
        <Link to={`/question`}>{"available surveys"}</Link>.
      </Typography>
    </div>
  ];
};
export default withStyles(styles)(Welcome);

//Welcome = withStyles(styles)(Welcome); // apply HOC
// <Form inline>
//   <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//   <Button variant="outline-success">Search</Button>
// </Form>
