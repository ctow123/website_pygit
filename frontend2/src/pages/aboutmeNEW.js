import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import Navgo from "./navbar.js";
import Typography from "@material-ui/core/Typography";
import { Card, CardActions, CardContent } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
// core components
import ProfilePageHeader from "../components/Headers/ProfilePageHeader.js";
import DefaultFooter from "../components/Footers/DefaultFooter.js";

const ProfilePage = ({ classes, ...props }) => {
  const [pills, setPills] = React.useState("2");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    // cleanup called on page close
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });
  return (
    <>
      <Navgo />
      <div className="wrapper">
        <ProfilePageHeader />
        <div className="section">
          <Container>
            <div className="button-container">
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
            </div>
            <h3 className="title">About me</h3>
            <h5
              style={{ color: "rgb(44,44,44)", fontWeight: 400 }}
              className="description"
            >
              Hi there, I'm Connor and I created a website mostly
              for fun and so people could learn a little about me. I love things around data, engineering, products, and growth.
              Currently, I'm a CS student at Virginia Tech.
              However, most of my efforts are devoted to learning full stack development & investing
              as I love building and learning about systems. Outside of CS related things,
              I love investing (the angel & VC style), reading, playing tennis, hiking,
              surfing and occasionally making a short film
              with some friends. Twitter DMs are always open.
            </h5>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Card style={{'box-shadow': '0px 5px 25px 0px rgba(0, 0, 0, 0.2'}}>
                  <CardContent>
                    <Typography variant="h5">👍🏼 Strengths</Typography>
                    <Typography>
                      <b>Run Through a Wall</b>
                      <br />
                      {
                        "will run through any wall to achieve the goal if the conviction is high enough"
                      }
                      <br />
                      <b>Big Bold Bets</b>
                      <br />
                      {"plant seeds for bets 5 to 7 years out or more "}
                      <br />
                      <b>Systems Thinking</b>
                      <br />
                      {
                        "reduce complexity into a set of systems, think about the fundamentals of each"
                      }
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card style={{'box-shadow': '0px 5px 25px 0px rgba(0, 0, 0, 0.2'}}>
                  <CardContent>
                    <Typography variant="h5">👎🏼Weakness</Typography>

                    <Typography>
                      <b>Run Through a Wall</b>
                      <br />
                      {"may cause toe-stepping, may ignore other opinions "}
                      <br />
                      <b>Confrontational</b>
                      <br />
                      {
                        "principaled confrontation is good, sometimes the old needs to be ushered out"
                      }
                      <br />
                      <b>Operating without context</b>
                      <br />
                      {
                        "without the why, doing something for its own sake is tough for me"
                      }
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card style={{'box-shadow': '0px 5px 25px 0px rgba(0, 0, 0, 0.2'}}>
                  <CardContent>
                    <Typography variant="h5">🛠Principles</Typography>

                    <Typography>
                      <b>Bias for action</b>
                      <br />
                      {
                        "at the end of the day, all that matters is raw execution"
                      }
                      <br />
                      <b>Go for the Gold, Settle for the silver</b>
                      <br />
                      {
                        "there is no point in doing something if youre not giving 110%"
                      }
                      <br />
                      <b>Ignore the noise</b>
                      <br />
                      {
                        "insanity is common place in crowds, follow your thoughts"
                      }
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card style={{'box-shadow': '0px 5px 25px 0px rgba(0, 0, 0, 0.2'}}>
                  <CardContent>
                    <Typography variant="h5">📚Top Books</Typography>
                    <Typography>
                      <b>Zero to One</b>
                      <br />
                      {"by Peter Thiel"}
                      <br />
                      <b>Elon Musk: A Quest for a Fantastic Future</b>
                      <br />
                      {"by Ashlee Vance"}
                      <br />
                      <b>What you do is Who you are</b>
                      <br />
                      {"by Ben Horowitz"}
                      <br />
                      <b>Shoe Dog</b>
                      <br />
                      {"by Phil Knight"}
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card style={{'box-shadow': '0px 5px 25px 0px rgba(0, 0, 0, 0.2'}}>
                  <CardContent>
                    <Typography variant="h5">🙏🏼 Favorite Quote</Typography>
                    <Typography>
                      {
                        "the cowards never started, the weak quit along the way, and that leaves you and me"
                      }
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card style={{'box-shadow': '0px 5px 25px 0px rgba(0, 0, 0, 0.2'}}>
                  <CardContent>
                    <Typography variant="h5">📲Points of Contact</Typography>
                    <Typography>
                      <b>Email</b>
                      <br />
                      {"connor.towler@gmail.com"}
                      <br />
                      <b>Twitter</b>
                      <br />
                      <a href="https://twitter.com/ctow123">@ctow123</a>
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Row>
              <Col className="ml-auto mr-auto" md="6">
                <h4 className="title text-center">My Portfolio</h4>
                <div className="nav-align-center">
                  <Nav
                    className="nav-pills-info nav-pills-just-icons"
                    pills
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={pills === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          setPills("1");
                        }}
                      >
                        <i className="now-ui-icons design_image"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          setPills("2");
                        }}
                      >
                        <i className="now-ui-icons location_world"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "3" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          setPills("3");
                        }}
                      >
                        <i className="now-ui-icons sport_user-run"></i>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Col>
              <TabContent className="gallery" activeTab={"pills" + pills}>
                <TabPane tabId="pills1">
                  <Col className="ml-auto mr-auto" md="10">
                    <Row className="collections">
                      <Col md="6">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../assets/img/bg1.jpg")}
                        ></img>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../assets/img/bg3.jpg")}
                        ></img>
                      </Col>
                      <Col md="6">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../assets/img/bg8.jpg")}
                        ></img>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../assets/img/bg7.jpg")}
                        ></img>
                      </Col>
                    </Row>
                  </Col>
                </TabPane>
                <TabPane tabId="pills2">
                  <Col className="ml-auto mr-auto" md="10">
                    <Row className="collections">
                      <Col md="6">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../assets/img/bg6.jpg")}
                        ></img>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../assets/img/bg11.jpg")}
                        ></img>
                      </Col>
                      <Col md="6">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../assets/img/bg7.jpg")}
                        ></img>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../assets/img/bg8.jpg")}
                        ></img>
                      </Col>
                    </Row>
                  </Col>
                </TabPane>
                <TabPane tabId="pills3">
                  <Col className="ml-auto mr-auto" md="10">
                    <Row className="collections">
                      <Col md="6">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../assets/img/bg3.jpg")}
                        ></img>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../assets/img/bg8.jpg")}
                        ></img>
                      </Col>
                      <Col md="6">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../assets/img/bg7.jpg")}
                        ></img>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../assets/img/bg6.jpg")}
                        ></img>
                      </Col>
                    </Row>
                  </Col>
                </TabPane>
              </TabContent>
            </Row>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default ProfilePage;
