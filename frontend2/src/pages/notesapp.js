import React from "react";
import {
  NavItem,
  NavLink,
  Nav,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  TabContent,
  TabPane,
  Form,
  FormGroup,
  Input,
  FormText,
  ButtonGroup,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";
import useOnClickOutside from "../hooks/useOnClickOutside";
import Grid from "@material-ui/core/Grid";
import {
  Card as CardMaterial,
  CardActions,
  CardContent,
  Button
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
// import "bootstrap/dist/css/bootstrap.min.css";
import Navgo from "./navbar.js";
import { withStyles } from "@material-ui/core/styles";

// on enter, closetab, or clickout will cause text to save

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  child: {
    ...theme.mixins.gutters()
  }
});

function handleit(e) {
  e.preventDefault();
  console.log(e.target.value);
  let test = document.getElementById("dropdownmenu");
  console.log(test);
  test.setAttribute("style", "top: auto;display: block;left: auto;");
}

const Notes = ({ classes, ...props }) => {
  console.log(props);
  const inputRef = React.useRef(null);
  const [plainTabs, setPlainTabs] = React.useState("1");
  const [isInputActive, setIsInputActive] = React.useState(false);
  // focus the cursor in the input field on edit start
  React.useEffect(() => {
  window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  React.useEffect(() => {
    const onbeforeunloadFn = () => {
      localStorage.setItem("color", "red");
    };

    window.addEventListener("beforeunload", onbeforeunloadFn);
    // Clean up function on page close
    return () => {
      window.removeEventListener("beforeunload", onbeforeunloadFn);
    };
  });

  useOnClickOutside(inputRef, () => {
  if (isInputActive) {
    // save the value and close the editor
    // props.onSetText(inputValue);
    console.log('outside');
    setIsInputActive(false);
    let test2 = document.getElementById("newNote");
    test2.setAttribute("style", "border: 0;");
  }
});

  function handleNewNote(e) {
    e.preventDefault();
    setIsInputActive(true);
    let test2 = document.getElementById("newNote");
    test2.setAttribute("style", "border: 1px solid #E3E3E3;");
  }

  return (
    <>
      <Navgo />
      <Typography
        style={{ marginTop: "75px" }}
        align="center"
        variant="h5"
        gutterBottom
      ></Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <CardMaterial variant="outlined">
                <CardContent             ref={inputRef}   >
                  <Input
                    aria-describedby="emailHelp"

                    id="newNote"
                    placeholder="Enter email"
                    type="text"
                    value={"new note title"}
                    style={{ fontSize: "14px", border: "0px" }}
                    onChange={e => handleNewNote(e)}
                    onClick={e => handleNewNote(e)}

                  ></Input>
                  <textarea
                    name="description"
                    placeholder="Description for the task"
                    rows="5"
                    value={"text area"}
                    onChange={handleNewNote}
                  />

                  <CardText>#hashtags</CardText>
                </CardContent>
              </CardMaterial>
              <Typography variant="h5">#startups</Typography>
              <CardHeader
                style={{ justifyContent: "flex-end", display: "flex" }}
              >
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <i class="fas fa-edit"></i>
                </Button>
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <i class="fas fa-expand"></i>
                </Button>
              </CardHeader>

              <CardMaterial variant="outlined">
                <CardContent>
                  <CardTitle>startups</CardTitle>
                  <CardText>hye testing</CardText>
                </CardContent>
              </CardMaterial>

              <CardHeader
                style={{ justifyContent: "flex-end", display: "flex" }}
              >
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <i class="fas fa-edit"></i>
                </Button>
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <i class="fas fa-expand"></i>
                </Button>
              </CardHeader>

              <CardMaterial variant="outlined">
                <CardContent>
                  <CardTitle>startups</CardTitle>
                  <CardText>hye testing</CardText>
                </CardContent>
              </CardMaterial>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Input
            aria-describedby="emailHelp"
            id="exampleInputEmail1"
            placeholder="Enter email"
            type="email"
            onChange={handleit}
          ></Input>

          <DropdownMenu
            id={"dropdownmenu"}
            aria-labelledby="dropdownMenuButton"
          >
            <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
              Action
            </DropdownItem>
            <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
              Another action
            </DropdownItem>
            <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
              Something else here
            </DropdownItem>
          </DropdownMenu>
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
                        Related
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
                        Date
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
                        Traditional Folders
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
                  <p>#culture</p>
                  <p>
                    I think that’s a responsibility that I have, to push
                    possibilities, to show people, this is the level that things
                    could be at. So when you get something that has the name
                    Kanye West on it, it’s supposed to be pushing the furthest
                    possibilities. I will be the leader of a company that ends
                    up being worth billions of dollars, because I got the
                    answers. I understand culture.
                  </p>
                  <p>#valuations</p>
                  <p>
                    are a function of sales. how fast can you grow. paying 5
                    dollars for 1 dollor of sales for the fact that the customer
                    will bring much more LTV and you can grow the base fast
                  </p>
                </TabPane>
                <TabPane tabId="plainTabs2">
                  <p>
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers. I understand
                    culture. I am the nucleus. I think that’s a responsibility
                    that I have, to push possibilities, to show people, this is
                    the level that things could be at. I think that’s a
                    responsibility that I have, to push possibilities, to show
                    people, this is the level that things could be at.
                  </p>
                </TabPane>
                <TabPane tabId="plainTabs3">
                  <p>
                    I think that’s a responsibility that I have, to push
                    possibilities, to show people, this is the level that things
                    could be at. I will be the leader of a company that ends up
                    being worth billions of dollars, because I got the answers.
                    I understand culture. I am the nucleus. I think that’s a
                    responsibility that I have, to push possibilities, to show
                    people, this is the level that things could be at.
                  </p>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default withStyles(styles)(Notes);
