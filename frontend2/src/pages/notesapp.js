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
import useKeypress from "../hooks/useKeyPress";
import { Tag, TagContainer } from "../components/Body/styles.js";
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

// on enter, closetab, or clickout of title, text, or tags, and tag removal will cause text to save
// dont save if title and text are empty
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

const Notes = ({ classes, ...props }) => {
  // console.log(props);
  const titleRef = React.useRef(null);
  const textRef = React.useRef(null);
  const [plainTabs, setPlainTabs] = React.useState("1");
  const [isTitleActive, setIsTitleActive] = React.useState(false);
  let [tags, updateTags] = React.useState(["hey"]);
  const enter = useKeypress("Enter");
  var typingTimer;                //timer identifier
  var doneTypingInterval = 5000;  //time in ms, 5 second for example

  React.useEffect(() => {
    window.scrollTo(0, 0);
    //on keyup, start the countdown, saves after 5 seconds of no typing
      document.getElementById("newNoteText").addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        if (document.getElementById("newNoteText").value) {
            typingTimer = setTimeout(saveNote, doneTypingInterval, 'text');
        }
    });
  }, []);

  // focus the cursor in the input field on edit start
  // React.useEffect(() => {
  //   if (isTextActive) {
  //     textRef.current.focus();
  //   }
  // }, [isTextActive]);

  // watch the Enter key presses
  React.useEffect(() => {
    // if Enter is pressed, save the text and case the editor
    if (isTitleActive) {
      if (enter) {
        saveNote();
        console.log("enter clicked");
        document.getElementById("newNoteTitle").blur();
        document.getElementById("newNoteText").select();
        setIsTitleActive(false);
      }
    }
  }, [enter]);

  React.useEffect(() => {
    saveNote();
  }, [tags]);

  useOnClickOutside(titleRef, () => {
    if (isTitleActive) {
      console.log("outside title");
      saveNote();
      setIsTitleActive(false);
    }
  });

  React.useEffect(() => {
    const onbeforeunloadFn = () => {
      localStorage.setItem("color", "red");
      saveNote();
    };

    window.addEventListener("beforeunload", onbeforeunloadFn);
    // Clean up function on page close
    return () => {
      window.removeEventListener("beforeunload", onbeforeunloadFn);
    };
  });

  function handleit(e) {
    e.preventDefault();
    console.log(e.target.value);
    // setIsInputActive(true);
    let test = document.getElementById("dropdownmenu");
    console.log(test);
    test.setAttribute("style", "top: auto;display: block;left: auto;");
  }

  // handle which of the new note fields to highlight (title, text, tags)
  function handleNewNoteClick(e) {
    e.preventDefault();
     if (e.target.id === "newNoteTitle") {
      setIsTitleActive(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    let test2 = document.getElementById("newNoteTags");
    updateTags(tags => [...tags, test2.value]);
    test2.value = "";
  }

  function removeTag(e) {
    e.preventDefault();
    var array = [...tags];
    var index = array.indexOf(e.target.id);
    if (index !== -1) {
      array.splice(index, 1);
      updateTags(array);
    }
  }
  // send note to server to save or update save with timestamp
   function saveNote(type )  {
     console.log(type);
    let text = document.getElementById("newNoteText").value;
      let title = document.getElementById("newNoteTitle").value;
    let notedata= { text: text, title: title, tags: tags };
    console.log(notedata);
   }

  // component for the Tag
  function TheTag(props) {
    // console.log(props);
    return (
      <>
        <TagContainer>
          <Tag href="https://www.w3schools.com">{props.text}</Tag>

          <Button
            color="primary"
            onClick={e => removeTag(e)}
            style={{
              paddingLeft: "15px",
              minWidth: "0px",
              width: "fit-content"
            }}
          >
            <i id={props.text} className="far fa-times-circle"></i>
          </Button>
        </TagContainer>
      </>
    );
  }

  return (
    <>
      <Navgo />
      <Typography
        style={{ marginTop: "6vh" }}
        align="center"
        variant="h5"
        gutterBottom
      ></Typography>
      <Grid
        container
        spacing={3}
        style={{ minHeight: "95vh", backgroundColor: "gainsboro" }}
      >
        <Grid item xs={12} sm={8}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <CardMaterial variant="outlined">
                <CardContent>
                  <Input
                    ref={titleRef}
                    className="note"
                    id="newNoteTitle"
                    placeholder="Enter title"
                    type="text"
                    style={{ fontSize: "20px" }}
                    onClick={e => handleNewNoteClick(e)}
                  ></Input>
                  <textarea
                    ref={textRef}
                    className="note"
                    name="text"
                    id="newNoteText"
                    placeholder="enter note text"
                    rows="5"

                  />
                  <form onSubmit={e => handleSubmit(e)}>
                    <Input
                      className="note"
                      id="newNoteTags"
                      placeholder="Add tags"
                      type="text"
                      style={{ fontSize: "15px", width: "40%" }}

                      autoComplete="off"
                    ></Input>
                  </form>
                  <div style={{ display: "flex" }}>
                    {tags.length
                      ? tags.map((text, index) => (
                          <TheTag key={index} text={text} />
                        ))
                      : null}
                  </div>
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
                  <i className="fas fa-edit"></i>
                </Button>
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <i className="fas fa-expand"></i>
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
                  <i className="fas fa-edit"></i>
                </Button>
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <i className="fas fa-expand"></i>
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
            aria-describedby="searchinput"
            id="searchinput"
            placeholder="Search by Tag"
            type="text"
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
