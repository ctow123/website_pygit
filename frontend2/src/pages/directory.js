import React from "react";
import Navgo from "./navbar.js";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styling.js";
import { makeAPICall } from "../api/api.js";
import { apiprefix, notesendpoint } from "../api/apiprefix.js";

const Directory = ({ classes, ...props }) => {
  let [users, updateUsers] = React.useState([]);

  React.useEffect(() => {
    getUsers()
  }, []);

  async function getUsers() {
    let res = await makeAPICall("GET", `${apiprefix}/apidb/login`);
    let status = res.status;
    let body = await res.json();
    if (status === 200) {
      updateUsers(body);
    }
  }
  // user profile card
  function Profile(props) {
    return (
      <>
            <div
              className="notemobile"
              style={{
                maxHeight: "120px",
                maxWidth: "100vw",
                justifyContent: "center",
                marginBottom: "10px",
                marginRight: '10px',
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
                  src={`${props.user}.png`}
                  onError={(e)=>{e.target.onerror = null; e.target.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAe1BMVEX///8AAAAEBAQKCgoQEBD4+PgUFBTm5uYbGxvu7u719fUwMDDi4uIqKirKysr7+/ujo6NxcXGHh4ePj49hYWFDQ0Pa2tpPT0+zs7M2NjYlJSU7OztVVVXQ0NCbm5uVlZW+vr52dnYgICCqqqpISEh/f39oaGjCwsJaWlrp4v/mAAAFF0lEQVR4nO2ci5qiMAyFEVRu3tDRARVF1NH3f8JlnJu7nyOnnbSNO/kfoPRA0yZpgucJgiAIgiD8CsLTZJqd58Uy6gZ+xw/60XKYrtbZdJKXsevJYSSn2VMadO4RzbPNiLWcJM8K/66GK9Jsz1NMuJ3DIr7EVK6n/Q+9yVxVxDtRNnI9+S8Wu76mjAv1buBawYX88BMVF/yz+89SFT+WcWGVO5Vx0jWNGxTuvsrgmU7GK2dHtjK7f+5pEBzH9mUsiIzjb4qFbR1T5dMPI9hYlZEQW8c168SejsXQnI7GcQlt6ci7JnU0R70lQ5kYMo8v+laOlIlpGQ2BBSU2dDTfxPjq2ljR0eksDUdduXH7+GBldBdeGN6vrnkyqCNe2tPR6Zhz7MeETjtA35iZHK3qaJwVQzpKa4b+wd6Ijp5RB+smSyPhyc66jk7HhE9vf2E1RD16IRo71vI8248GceIlcVjmm2yunv6akevIFWfQPd9K7ZYzxfcRkVtJqvT8YvKtgzGYKn0X6o1Lyeddne6O1dsqSJkTC1HwTep21yJ+woejjXsVLCSDvNY9nBOjNXc4T91FPb1FBI64otSxQHUs8cAOVeJTuo4voI6hyoIuwdVFuG8l4CMVw1PQ8F7ohOyxJyonDLC9K6UTssaE3D89bhBD54lP5m+BK+uoPvIMGrikEoKtrFTDK0qgTzKhEoKtLK3cYIaMrPGpbwO9trPW0CNkaKq8UIk8zNdMcSIvicpvhCxS74N4HnJhRLX/QpdTutlz5C3VREKQLOlQd3DkdO/S6IAcxqnu6IgBBjRCoFNE+zYjBAb3aYQgedJIe/TEnhDkONTdszxvDIxOtLSQROlWe/QYGL1PI2S6e3laH+bFsO5/6zwq+72fDAAhVNvvNUk4KEdVvt9sp8fs5fx8WKXLqPuDaBTZtQgDEnNUgJCD60kiTAEhhLGuOZA9kcyNN0kNCDFzb0ULFCJYr0XTAIkQiXxGsyDZRup8vAmgwhZtz9oeCZT+JcsGmQM5RIw4KMRg98T8TxGwAIH/5ovdVfDfs7aQDoO1TkRUWCGFdnrGFiVYikeWwDZECd6066T4bQJf6VauZ3qfEVr58Ox6pvfJ0WKBrrVqfy1mcOEXa0vv4WUo+mk/C4R4Q9PQYkOMMid0u2oMhLOTtcHrIv3K9WS/JwYLDy4wNvQRkvr5QD8tbhylfj/64lIqQqXqUru9iCpUKpWlPtvU4nin8jn6+rcthhkodfWmPH43cIOTUsGyzQZXNbZKzQF8kz9QIdMHcLGtddS6rAu25hErmXnGNkAPVVoc+C4rL1RpylqxXVZeqNDh4Lv4awVIrLCuaraHebNfrXAda57/p3oDD6Is/3dDEegy6kLKOTZHc+0NmYFOQzpC1E8MGIfmr6COSc38xhbt9Ttw3q0aQvASh3350hnTsXM9zzagDoRHqMzAjnTWp+AFrP+HbwbuEyiWYm8fnndCdDC/G7yAOIum/wtEwQBwsnz3v8lsB+nQeQADgX5xUbP2d9+JgZXFNtd+DeAuFq7nCAFcojOPQN5pz5zQ/+jEBL12E8lczxECcHwr13OEaK+sDh5iZXm7ViGPsWcBsSH78PaN9nP9AeKQV9rvER7jFAEarfne5giCIAiCIAiCIAiCwJ/W1MMrrieJIEK4IUK4IUK4IUK4IUK4IUK4IUK4IUK4IUK4IUK4IUK4IUK4IUK4IUK4IUK4IUK48d8IEQRBEH4jfwDmOUj99+ZLdQAAAABJRU5ErkJggg=="}}
                ></img>

                <section
                  style={{ backgroundColor: "gainsboro", marginLeft: "20px" }}
                >
                  <h3 className="title" style={{ margin: "0", padding: "0" , wordBreak: 'break-all'}}>
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
