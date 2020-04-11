import React from "react";
import {
  NavItem,
  NavLink,
  Nav,
  Card,
  CardHeader,
  CardBody,
  TabContent,
  TabPane
} from "reactstrap";
import Grid from "@material-ui/core/Grid";
import { CardActions, CardContent, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
// import "bootstrap/dist/css/bootstrap.min.css";
import Navgo from "./navbar.js";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
});

const Notes = ({ classes, ...props }) => {
  const [plainTabs, setPlainTabs] = React.useState("1");
  return (
    <>
          <Navgo />
          <Typography style={{'marginTop':'75px'}} align="center" variant="h5" gutterBottom>

          </Typography>
      <Grid container spacing={3}>
        <Grid item  xs={12} sm={6}>
        <Card className="card-nav-tabs card-plain">
          <CardHeader className="card-header-danger">
            <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">
                <Nav data-tabs="tabs" tabs>
                  <NavItem>
                    <NavLink
                      className={plainTabs === "1" ? "active" : ""}
                      href="#pablo"
                      onClick={e => {
                        e.preventDefault();
                        setPlainTabs("1");
                      }}
                    >
                      Home
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={plainTabs === "2" ? "active" : ""}
                      href="#pablo"
                      onClick={e => {
                        e.preventDefault();
                        setPlainTabs("2");
                      }}
                    >
                      Updates
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={plainTabs === "3" ? "active" : ""}
                      href="#pablo"
                      onClick={e => {
                        e.preventDefault();
                        setPlainTabs("3");
                      }}
                    >
                      History
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <TabContent
              className="text-center"
              activeTab={"plainTabs" + plainTabs}
            >
              <TabPane tabId="plainTabs1">
                <p>
                  I think that’s a responsibility that I have, to push
                  possibilities, to show people, this is the level that things
                  could be at. So when you get something that has the name Kanye
                  West on it, it’s supposed to be pushing the furthest
                  possibilities. I will be the leader of a company that ends up
                  being worth billions of dollars, because I got the answers. I
                  understand culture. I am the nucleus.
                </p>
              </TabPane>
              <TabPane tabId="plainTabs2">
                <p>
                  I will be the leader of a company that ends up being worth
                  billions of dollars, because I got the answers. I understand
                  culture. I am the nucleus. I think that’s a responsibility that
                  I have, to push possibilities, to show people, this is the level
                  that things could be at. I think that’s a responsibility that I
                  have, to push possibilities, to show people, this is the level
                  that things could be at.
                </p>
              </TabPane>
              <TabPane tabId="plainTabs3">
                <p>
                  I think that’s a responsibility that I have, to push
                  possibilities, to show people, this is the level that things
                  could be at. I will be the leader of a company that ends up
                  being worth billions of dollars, because I got the answers. I
                  understand culture. I am the nucleus. I think that’s a
                  responsibility that I have, to push possibilities, to show
                  people, this is the level that things could be at.
                </p>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
        </Grid>
        <Grid item  xs={12} sm={6}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h5">👎🏼Weakness</Typography>

              <Typography variant="body2">
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
      </Grid>


    </>
  );
};
export default withStyles(styles)(Notes);
