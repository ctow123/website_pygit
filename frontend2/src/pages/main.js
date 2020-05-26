import React from "react";
import { Link } from "react-router-dom";
import { Button, UncontrolledTooltip } from "reactstrap";
import {Heading, Paragraph, TextContent} from "../components/Body/textStyles.js";
import Layout from "../components/Body/Layout";
import ProjectRow from "../components/Body/ProjectRow";
import {SkillTable, SkillContent, HeadingBox} from "../components/Body/styles.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Navgo from "./navbar.js";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  bcg_img2: {
    [theme.breakpoints.down("sm")]: {
      backgroundImage: `url(${process.env.PUBLIC_URL +
        "/media/surf3.jpg"})`,
      height: "100vh",
      backgroundPosition: "center",
      backgroundAttachment: "scroll",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    },
    backgroundImage: `url(${process.env.PUBLIC_URL + "/media/surf3.jpg"})`,
    minHeight: 500,
    height: "100vh",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  bcg_img3: {
    [theme.breakpoints.down("sm")]: {
      backgroundImage: `url(${process.env.PUBLIC_URL +
        "/media/yosemite-mobile.jpg"})`,
      height: "100vh",
      backgroundPosition: "center",
      backgroundAttachment: "scroll",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    },
    backgroundImage: `url(${process.env.PUBLIC_URL + "/media/surf2.jpg"})`,
    minHeight: 500,
    height: "100vh",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  bcg_img1: {
    [theme.breakpoints.down("sm")]: {
      backgroundImage: `url(${process.env.PUBLIC_URL +
        "/media/model3_iphone.jpg"})`,
      height: "100vh",
      backgroundPosition: "center",
      backgroundAttachment: "scroll",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    },
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



function handleScroll(e) {
  e.preventDefault();
  let test = document.getElementById("projects");
  let test2 = document.getElementById("skills");
  if (e.target.text === " projects ") {
    test.scrollIntoView({ behavior: "smooth" });
  } else {
    test2.scrollIntoView({ behavior: "smooth" });
  }
}

const Welcome = ({ classes, currentUser, updateUser, ...props }) => {
  // console.log(props);
  return [
    <div key={'nav'}>
      <Navgo />
    </div>,
    <div key={'bcg1'} className={classes.bcg_img1}>
      <i
        style={{
          color: "white",
          display: "flex",
          paddingTop: "85vh",
          position: "absolute",
          left: "50%"
        }}
        className="fas fa-arrow-down fa-align-center fa-3x"
      ></i>
    </div>,
    <div key={'welcome'} className={`welcome tab`} style={{ backgroundColor: "white" }}>
      <HeadingBox style={{ paddingTop: "10px" }}>
        <Button
          className="btn-round btn-icon"
          color="default"
          id="tooltip515203352"
          size="lg"
          href="https://twitter.com/ctow123"
        >
          <i className="fab fa-twitter"></i>
        </Button>
        <UncontrolledTooltip delay={0} target="tooltip515203352">
          Follow me on Twitter
        </UncontrolledTooltip>
        <Button
          className="btn-round btn-icon"
          color="default"
          id="tooltip340339231"
          size="lg"
          href="mailto:connor.towler@gmail.com"
        >
          <i className="fab fa-github"></i>
        </Button>
        <UncontrolledTooltip delay={0} target="tooltip340339231">
          See My Github
        </UncontrolledTooltip>
        <Button
          className="btn-round btn-icon"
          color="default"
          size="lg"
          href="mailto:connor.towler@gmail.com"
        >
          <i className="fas fa-envelope fab"></i>
        </Button>
      </HeadingBox>
      <Layout style={{ minHeight: "100px", marginTop: "0" }}>
        <TextContent>
          <Heading>Hey, I'm Connor and welcome to my website</Heading>
          <Paragraph>
            Keep scrolling to see the parallax effect (desktop only). This page
            contains some info <Link to={`/aboutme`}>{"about me"}</Link>, my{" "}
            <Link to={`/faceid`}>{"design portfolio"}</Link>, a place to leave{" "}
            <Link to={`/comments`}>{"comments"}</Link>, various
            <Link to={`#projects`} onClick={handleScroll}>
              {" projects "}
            </Link>
            i'm continously working on, and some of my{" "}
            <Link to={`/`} onClick={handleScroll}>
              {" skills "}
            </Link>{" "}
          </Paragraph>
        </TextContent>
      </Layout>
    </div>,
    <div key={'bcg2'} className={classes.bcg_img2} />,
    <div key={'projects'} style={{ backgroundColor: "white" }}>
      <Layout style={{ minHeight: "100px", marginTop: "0" }}>
        <TextContent>
          <Heading id={"projects"}>Projects: Finished and ongoing </Heading>
        </TextContent>
        <ProjectRow />
      </Layout>
    </div>,
    <div key={'bcg3'} className={classes.bcg_img3} />,
    <div key={'skills'} style={{ backgroundColor: "white" }}>
      <Layout style={{ minHeight: "100px", marginTop: "0" }}>
        <SkillContent>
          <TextContent>
            <Heading id={'skills'} >My Skills</Heading>
          </TextContent>
          <SkillTable>
            <row>
              <Paragraph>
                <b> FrontEnd</b>
              </Paragraph>
              <Paragraph>
                <span>&#9675;</span> Javascript ES6
              </Paragraph>
              <Paragraph>
                <span>&#9675;</span> HTML & CSS
              </Paragraph>
              <Paragraph>
                <span>&#9675;</span> React
              </Paragraph>
            </row>
            <row>
              <Paragraph>
                <b> BackEnd</b>
              </Paragraph>
              <Paragraph>
                <span>&#9675;</span> Django
              </Paragraph>
              <Paragraph>
                <span>&#9675;</span> Node
              </Paragraph>
            </row>
            <row>
              <Paragraph>
                <b> Database</b>
              </Paragraph>
              <Paragraph>
                <span>&#9675;</span> MongoDB
              </Paragraph>
              <Paragraph>
                <span>&#9675;</span> SQL
              </Paragraph>
            </row>
            <row>
              <Paragraph>
                <b> Misc</b>
              </Paragraph>
              <Paragraph>
                <span>&#9675;</span> Git
              </Paragraph>
              <Paragraph>
                <span>&#9675;</span> Airflow, AWS
              </Paragraph>
            </row>
          </SkillTable>
        </SkillContent>
      </Layout>
    </div>
  ];
};
export default withStyles(styles)(Welcome);
