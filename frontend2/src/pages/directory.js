import React from "react";
import Navgo from "./navbar.js";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styling.js";

const Directory = ({ classes, ...props }) => {
  let [users, updateUsers] = React.useState(["macmillan", "eriktorenberg", "hero-image-1"]);

  // async function getUsers() {
  //   let res = await makeAPICall("GET", `${apiprefix}/apidb/login`);
  //   let status = res.status;
  //   let body = await res.json();
  //   // error
  //   if (status === 200) {
  //     body.forEach((loopuser, i) => {
  //         setState(state => ( {[user]: false, ...state }))
  //     });
  //     // array.remove(body,function(n) {return n === user;})
  //     // body = body.slice(0,5)
  //     updateUsers(body);
  //
  //   }
  // }

  // user profile card
  function Profile(props) {
    console.log(props);
    return (
      <>
            <div
              className="notemobile"
              style={{
                maxHeight: "120px",
                maxWidth: "100vw",
                justifyContent: "center",
                margin: "10px",
                display: 'inline-block'
              }}
            >
              <div
                style={{
                  backgroundColor: "gainsboro",
                  display: "flex",
                  padding: "10px",
                    borderRadius: "20px"
                }}
              >
                <img
                  style={{
                    maxHeight: "100px",
                    maxWidth: "100px",
                    minHeight: "100px",
                    minWidth: "100px",
                    borderRadius: "50%"
                  }}
                  alt="..."
                  src={require("../assets/img/" + props.user +".png")}
                ></img>

                <section
                  style={{ backgroundColor: "gainsboro", marginLeft: "20px" }}
                >
                  <h3 className="title" style={{ margin: "0", padding: "0" }}>
                    {props.user}
                  </h3>
                  <p className="category" style={{ margin: "0", padding: "0" }}>
                    <a href={'http://thenubes.ddns.net/notes?user=' + props.user}> Website</a>
                  </p>
                </section>
              </div>
            </div>

    </>);
  }

  // <div style={{display: 'flex', flexWrap: 'wrap'}}>
  //   {searchabletags.length
  //     ? searchabletags.map((tag, index) => (
  //         <RelatedTag key={tag+index} text={tag} />
  //       ))
  //     : null}
  //     </div>

  return (
    <>
      <div className={classes.root} style={{ backgroundColor: "white" }}>
        <Navgo />
        <Typography align="center" variant="h2" gutterBottom>
          Explore the thoughts of
        </Typography>
        <div style={{ display: "flex", flexWrap: 'wrap' }} id='newNoteTagsList'>
          {users.length
            ? users.map((user, index) => (
                <Profile key={index} user={user} />
              ))
            : null}
        </div>
          </div>
    </>
  );
};

export default withStyles(styles)(Directory);
