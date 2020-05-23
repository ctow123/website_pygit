import React from "react";
import {
  NavItem,
  NavLink,
  Nav,
  Card,
  CardHeader,
  CardBody,
  TabContent,
  TabPane,
  Input,
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
import { Card as CardMaterial, CardContent, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
// import "bootstrap/dist/css/bootstrap.min.css";
import Navgo from "./navbar.js";
import { withStyles } from "@material-ui/core/styles";
import Note from "../components/note.js";
import { makeAPICall } from "../api/api.js";
import { apiprefix, notesendpoint } from "../api/apiprefix.js";
const { v4: uuidv4 } = require('uuid');

// conditions for note to be saved, you change the title and press enter or select outside the title box
// you stop typing in the textbox for 5 seconds or you add or remove a tag
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
  const [count, setCount] = React.useState(0);
  const titleRef = React.useRef(null);
  const isMounted = React.useRef(true);
  const firstSave = React.useRef(true);
  const makenoteID = React.useRef();
  const [plainTabs, setPlainTabs] = React.useState("1");
  const [isTitleActive, setIsTitleActive] = React.useState(false);
  let [tags, updateTags] = React.useState(["hey"]);
  let [searchabletags, updateSearchabletags] = React.useState([]);
  let [notes, updateNotes] = React.useState([]);
  let [saveres, updateSaveres] = React.useState();
  let [search, updateSearch] = React.useState("startup");
  const enter = useKeypress("Enter");
  var typingTimer; //timer identifier
  var typingTimer2; //timer identifier
  var doneTypingInterval = 4000; //time in ms, 5 second for example

  React.useEffect(() => {
    window.scrollTo(0, 0);
    // on keyup, start the countdown, saves after 5 seconds of no typing
    document.getElementById("newNoteText").addEventListener("keyup", () => {
      clearTimeout(typingTimer);
      if (document.getElementById("newNoteText").value) {
        // eslint-disable-next-line
        typingTimer = setTimeout(saveNote, doneTypingInterval, "text");
      }
    });
    document.getElementById("newNoteTitle").addEventListener("keyup", () => {
      clearTimeout(typingTimer2);
      if (document.getElementById("newNoteTitle").value) {
        // eslint-disable-next-line
        typingTimer2 = setTimeout(saveNote, doneTypingInterval, "title");
      }
    });
    // fetching notes based on default start up tag.
    // updateNotes(notes => [
    //   ...notes,
    //   {
    //     title: "netflix",
    //     text: "this will not work",
    //     tags: ["reed", "marc"],
    //     id: 90
    //   }
    // ]);
    // updateNotes(notes => [
    //   ...notes,
    //   {
    //     title: "upstarts",
    //     text: "ride the wave",
    //     tags: ["travis", "grenalt"],
    //     id: 10
    //   }
    // ]);
    //get list of tags searchable in the database
    getSearchableTags();


  }, []);

  // watch the Enter key presses, if enter is pressed in title box, switch to textbox
  React.useEffect(() => {
    if (isTitleActive) {
      if (enter) {
        document.getElementById("newNoteTitle").blur();
        document.getElementById("newNoteText").focus();
        setIsTitleActive(false);
      }
    }
    // eslint-disable-next-line
  }, [enter]);

  // save the note when tags change
  React.useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
      return;
    } else {
      saveNote("tags");
    }
    // eslint-disable-next-line
  }, [tags]);

  React.useEffect(() => {
    getNotes(search);
    // eslint-disable-next-line
  }, [search]);

  // save the note when page closes
  React.useEffect(() => {
    const onbeforeunloadFn = () => {
      saveNote("close");
    };
    window.addEventListener("beforeunload", onbeforeunloadFn);
    // Clean up function on page close
    return () => {
      window.removeEventListener("beforeunload", onbeforeunloadFn);
    };
    // eslint-disable-next-line
  });

  // makes title field inactive when other object is clicked on
  useOnClickOutside(titleRef, () => {
    if (isTitleActive) {
      setIsTitleActive(false);
    }
  });

  /*
   */
  function handleChange(e) {
    e.preventDefault();
    // setIsInputActive(true);
    // let test = document.getElementById("dropdownmenu");
    // console.log(test);
    // test.setAttribute("style", "top: auto;display: block;left: auto;");
  }

  /*
  makes title field active when clicked on
  */
  function handleNewNoteClick(e) {
    e.preventDefault();
    if (e.target.id === "newNoteTitle") {
      setIsTitleActive(true);
    }
  }

  /* handle tag and search submissions
   */
  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.querySelector("input").id === "newNoteTags") {
      let test2 = document.getElementById("newNoteTags");
      updateTags(tags => [...tags, test2.value]);
      test2.value = "";
    } else if (
      e.target.querySelector("input").id === "searchinput" ||
      e.target.querySelector("input").id === "searchinputmobile"
    ) {
      getNotes(e.target.querySelector("input").value);
      // updateSearch(e.target.querySelector("input").value);
    }
  }

  // send note to server to save or update
  async function saveNote(type) {
    let text = document.getElementById("newNoteText").value;
    let title = document.getElementById("newNoteTitle").value;
    let notedata = {
      type: type,
      note: { text: text, title: title, tags: tags, dateupdated: Date.now() }
    };
    console.log(type, notedata);
    if (firstSave.current && ( text !== '' || title !== '')) {
      firstSave.current = false;
      let res = await makeAPICall(
        "POST",
        `${notesendpoint}/notesapp/makenote`,
        notedata
      );
      let status = res.status;
      let body = await res.json();
      // error
      if (status !== 200 && status !== 201) {
        updateSaveres(body.error);
      }
      // success
      else {
        makenoteID.current = body.noteid;
        return { noteid: body.noteid, message: body.message, status: status };
      }
    } else {
      let res = await makeAPICall(
        "PUT",
        `${notesendpoint}/notesapp/editnote/${makenoteID.current}`,
        notedata
      );
      let status = res.status;
      let body = await res.json();
      if (status !== 200 && status !== 201) {
        return { body: body, status: status };
      } else {
        return { body: body, status: status };
      }
    }
  }

  function savehandling(params) {
    if (params.status !== 200 && params.status !== 201) {
      updateSaveres(params.body.error);
    } else {
      updateSaveres(params.title + " saved");
    }
  }

  async function getSearchableTags() {
    let res = await makeAPICall("GET", `${notesendpoint}/notesapp/getTagsList`);
    let status = res.status;
    let body = await res.json();
    // error
    if (status === 200) {
      updateSearchabletags(searchabletags => [...searchabletags, ...body.tags]);
    }
  }

  async function getNotes(searchterm) {
    let res = await makeAPICall("GET", `${notesendpoint}/notesapp/searchnotes?lookupBy=tag&lookupField=${searchterm}`);
    let status = res.status;
    let body = await res.json();
    console.log(body);
    if (status === 200 && body.notes.length !== 0) {
      updateNotes(notes => [...body.notes]);
    }
    else{
      updateNotes([]);
    }
  }
  // component for the Tag
  function TheTag(props) {
    // console.log(props);

    function removeTag(e) {
      e.preventDefault();
      var array = [...tags];
      var index = array.indexOf(e.target.id);
      if (index !== -1) {
        array.splice(index, 1);
        updateTags(array);
      }
    }
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
        style={{ marginTop: "70px" }}
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
          <form onSubmit={e => handleSubmit(e)}>
            <Input
              className="notemobile"
              id="searchinputmobile"
              placeholder="Search by Tag"
              type="text"
              onChange={e => handleChange(e)}
              style={{
                marginBottom: "10px",
                marginLeft: "auto",
                marginRight: "auto",
                width: "80%"
              }}
            ></Input>
          </form>
          <Card className={classes.root} variant="outlined">
            <Typography align="center" variant="body1">
              {saveres}
            </Typography>
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
              <Typography align="center" variant="h5">
                {search}
              </Typography>
              <div>
                {notes.length
                  ? notes.map((note, index) => (
                      <Note
                        key={uuidv4()}
                        title={note.title}
                        text={note.text}
                        tags={note.tags}
                        id={note.id}
                        onSave={savehandling}
                      />
                    ))
                  : null}
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <form onSubmit={e => handleSubmit(e)}>
            <Input
              aria-describedby="searchinput"
              id="searchinput"
              placeholder="Search by Tag"
              type="text"
              onChange={e => handleChange(e)}
            ></Input>
          </form>
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
                        Traditional
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
                  <p>here are a list of tags you can search for</p>
                  {searchabletags.length
                    ? searchabletags.map((tag, index) => (
                        <p key={tag+index}>{tag}
                        </p>
                      ))
                    : null}

                </TabPane>
                <TabPane tabId="plainTabs2">
                        <p>#valuations</p>
                  <p>
                    are a function of sales. how fast can you grow. paying 5
                    dollars for 1 dollor of sales for the fact that the customer
                    will bring much more LTV and you can grow the base fast
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
