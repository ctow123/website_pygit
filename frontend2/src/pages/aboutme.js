import React, { useState, useEffect } from "react";
import Navgo from "./navbar.js";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardActions, CardContent, Button } from "@material-ui/core";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  centered: {
    margin: 'auto',
    'margin-bottom': '20px',
    maxWidth: '600px'
  },
  root: {
flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing(2),
  },
  pos: {
  marginBottom: 12,
},
});


const Aboutme = ({ classes, ...props }) => {
    // console.log(props);
    useEffect(() => {
      // console.log(currentUser);
    }, []); // the []) ensures hook only called on mount not every page refresh
    const [spacing, setSpacing] = React.useState(2);
    const handleChange = event => {
      setSpacing(Number(event.target.value));
    };
    const bull = <span className={classes.bullet}>•</span>;
  return (
    <div className={classes.root} style={{ backgroundColor: "white" }}>
      <Navgo {...props} />
      <Typography style={{'marginTop':'60px'}} align="center" variant="body1" gutterBottom>
        Information on me ... I have made remarks I don't agree with{" "}
      </Typography>
      <Grid container spacing={3}>
         <Grid item xs={6}>
             <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography variant="h5">
                    👍🏼 Strengths
                  </Typography>
                  <Typography variant="body2" >
                    <b>Run Through a Wall</b>
                    <br />
                    {'will run through any wall to achieve the goal if the conviction is high enough'}
                    <br/ >
                    <b>Big Bold Bets</b>
                    <br />
                    {'plant seeds for bets 5 to 7 years out or more '}
                    <br />
                    <b>Systems Thinking</b>
                    <br />
                    {'reduce complexity into a set of systems, think about the fundamentals of each'}
                    <br />
                  </Typography>
                </CardContent>
            </Card>
         </Grid>
         <Grid item xs={6}>
         <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h5">
                👎🏼Weakness
              </Typography>

              <Typography variant="body2" >
              <b>Run Through a Wall</b>
              <br />
              {'may cause toe-stepping, may ignore other opinions '}
              <br/ >
              <b>Confrontational</b>
              <br />
              {'principaled confrontation is good, sometimes the old needs to be ushered out'}
              <br />
              <b>Operating without context</b>
              <br />
              {'without the why, doing something for its own sake is tough for me'}
              <br />
              </Typography>
            </CardContent>
        </Card>
         </Grid>
         <Grid item xs={6}>
         <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h5">
                🛠Principles
              </Typography>

              <Typography variant="body2" >
              <b>Bias for action</b>
              <br />
              {'at the end of the day, all that matters is raw execution'}
              <br/ >
              <b>Go for the Gold, Settle for the silver</b>
              <br />
              {'there is no point in doing something if youre not giving 110%'}
              <br />
              <b>Ignore the noise</b>
              <br />
              {'insanity is common place in crowds, follow your thoughts'}
              <br />
              </Typography>
            </CardContent>
        </Card>
         </Grid>
         <Grid item xs={6}>
         <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h5">
                📚Top Books
              </Typography>
              <Typography variant="body2" >
              <b>Zero to One</b>
              <br />
              {'by Peter Thiel'}
              <br/ >
              <b>Elon Musk: A Quest for a Fantastic Future</b>
              <br />
              {'by Ashlee Vance'}
              <br />
              <b>What you do is Who you are</b>
              <br />
              {'by Ben Horowitz'}
              <br />
              <b>Shoe Dog</b>
              <br />
              {'by Phil Knight'}
              <br />
              </Typography>
            </CardContent>
        </Card>
         </Grid>
         <Grid item xs={6}>
         <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h5">
                🙏🏼 Favorite Quote
              </Typography>
              <Typography variant="body2" >
              {'the cowards never started, the weak quit along the way, and that leaves you and me'}
              <br />
              </Typography>
            </CardContent>
        </Card>
         </Grid>
         <Grid item xs={6}>
         <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h5">
                📲Points of Contact
              </Typography>
              <Typography variant="body2" >
              <b>Email</b>
              <br />
              {'connor.towler@gmail.com'}
              <br />
              <b>Twitter</b>
              <br />
              {'@ctow123'}
              <br />
              </Typography>
            </CardContent>
        </Card>
         </Grid>
       </Grid>
    </div>
  );
};

export default (withStyles(styles)(Aboutme));
