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
  UncontrolledDropdown,
 Container
} from "reactstrap";
import useOnClickOutside from "../hooks/useOnClickOutside";
import useKeypress from "../hooks/useKeyPress";
import { Tag, TagContainer } from "../components/Body/styles.js";
import Fab from '@material-ui/core/Fab';
import { Card as CardMaterial, CardContent, Button, Typography, Grid } from "@material-ui/core";
import Navgo from "./navbar.js";
import { withStyles } from "@material-ui/core/styles";
import Note from "../components/note.js";
import { makeAPICall } from "../api/api.js";
import { notesendpoint } from "../api/apiprefix.js";
import {styles} from './styling.js'
import {getQueryStringParams} from "./fcns.js";
import { ReactTinyLink } from 'react-tiny-link'
const { v4: uuidv4 } = require('uuid');
/* conditions for note to be saved\
1) a set interval after you stop typing in the title or text area
2) you add or remove a tag
3) on page close
***if the title or text are empty on a new note dont save
*/


const Notes = ({ classes, ...props }) => {
  // console.log(props);
  // console.log(getQueryStringParams(props.location.search));
  const titleRef = React.useRef(null);
  const isMounted = React.useRef(true);
  const firstSave = React.useRef(true);
  const makenoteID = React.useRef();
  const [plainTabs, setPlainTabs] = React.useState("1");
  const [isTitleActive, setIsTitleActive] = React.useState(false);
  let [tags, updateTags] = React.useState(["default tag"]);
  let [searchabletags, updateSearchabletags] = React.useState([]);
    let [relatedTags, updateRelatedTags] = React.useState([]);
  let [notes, updateNotes] = React.useState([]);
  let [saveres, updateSaveres] = React.useState();
  let [search, updateSearch] = React.useState("startup");
  let [tweets, updateTweets] = React.useState([]);
    let [blogs, updateBlogs] = React.useState([]);
      let [searchuser, updateSearchUser] = React.useState([]);
  const enter = useKeypress("Enter");
  var typingTimer; //timer identifier
  var typingTimer2; //timer identifier
  var doneTypingInterval = 4000; //time in ms, 5 second for example
  let [loadingInterval, updateLoading] = React.useState(10);
  let [tweetLimit, updateTweetLimit] = React.useState(1);

// save condition 1
// problem is adding event listener on load and not putting [tags] so its not updating params w/ new info
React.useEffect(() => {
  window.scrollTo(0, 0);
  // on keyup, start the countdown, saves after doneTypingInterval seconds of no typing
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

  // search query
  if(Object.keys(getQueryStringParams(props.location.search)).length !== 0){
    updateSearch(getQueryStringParams(props.location.search).tag)
  }
  // user query
  if(Object.keys(getQueryStringParams(props.location.search)).length !== 0){
    console.log(getQueryStringParams(props.location.search));
    updateSearchUser(getQueryStringParams(props.location.search).user)
  }
  getSearchableTags();
  getTweets();
  getBlogs();
}, []);

function trackScrolling() {
  const wrappedElement = document.getElementById('notesList');
  if (isBottom(wrappedElement)) {
    console.log('header bottom reached');
        document.removeEventListener('scroll', trackScrolling)
    updateLoading(loadingInterval + 1)

    console.log(loadingInterval);
    // document.removeEventListener('scroll', trackScrolling);
  }
};

function trackScrolling2() {
  const wrappedElement = document.getElementById('tweetsList');
  if (isBottom(wrappedElement)) {
    console.log('header bottom reached');
        document.removeEventListener('scroll', trackScrolling2)
    updateLoading(tweetLimit + 10)

  }
};
function isBottom(el) {
  return el.getBoundingClientRect().bottom <= window.innerHeight;
}

React.useEffect(() => {
  document.addEventListener('scroll', trackScrolling);
  // Clean up function on page close
  return () => {
    window.removeEventListener("scroll", trackScrolling);
  };
  // eslint-disable-next-line
}, [loadingInterval]);

React.useEffect(() => {
  // document.addEventListener('scroll', trackScrolling2);
    // eslint-disable-next-line
}, [tweetLimit]);

// save condition 2, use mounted to avoid run on page load
React.useEffect(() => {
  if (isMounted.current) {
    isMounted.current = false;
    return;
  } else {
    saveNote("tag");
  }
  // eslint-disable-next-line
}, [tags]);

// save condition 3
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

// get notes based on search tag, this will run on page load for default tag
  React.useEffect(() => {
    getNotes(search);
    getRelatedTags(search)
    // eslint-disable-next-line
  }, [search]);


  /*
  makes title field active when clicked on
  */
  function handleNewNoteClick(e) {
    e.preventDefault();
    if (e.target.id === "newNoteTitle") {
      setIsTitleActive(true);
    }
  }

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
      updateSearch(e.target.querySelector("input").value);
    }
    else if ( e.target.querySelector("input").id === "bloginput" ) {
      let test2 = document.getElementById("bloginput");
      // send api call , update blogs list
      test2.value = "";
    }
  }

// send note to server to save or update
async function saveNote(type) {
  console.log(tags);
  let text = document.getElementById("newNoteText").value;
  let title = document.getElementById("newNoteTitle").value;
  let taglist = [];
  let tago = document.getElementById("newNoteTagsList").children;
  for (var i = 0; i < tago.length; i++) {
    taglist.push(tago[i].getElementsByTagName("a")[0].innerHTML);
  }

  let notedata = {
    type: type,
    note: { text: text, title: title, tags: taglist, dateupdated: Date.now() }
  };
  console.log(type, notedata);
  if (firstSave.current && (text !== "" || title !== "")) {
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
      // updateSaveres(params.body.error);
    } else {
      // updateSaveres(params.title + " saved");
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

  async function getBlogs() {
    let res = await makeAPICall("GET", `${notesendpoint}/notesapp/getBlogs`);
    let status = res.status;
    let body = await res.json();
    // error
    if (status === 200) {
      updateBlogs(blogs => [...blogs, ...body.blogs]);
    }
  }

  async function getRelatedTags(tag) {
    let res = await makeAPICall("GET", `${notesendpoint}/notesapp/getRelated?tag=${tag}`);
    let status = res.status;
    let body = await res.json();
    // error
    if (status === 200) {
     updateRelatedTags(relatedTags => [...relatedTags, ...body.tags]);
    }
  }

  // async function getTitlenDate() {
  //   let res = await makeAPICall("GET", `${notesendpoint}/notesapp/getTitlesList`);
  //   let status = res.status;
  //   let body = await res.json();
  //   // error
  //   if (status === 200) {
  //     updateSearchabletags(searchabletags => [...searchabletags, ...body.tags]);
  //   }
  // }

  async function getNotes(searchterm) {
    let res = await makeAPICall("GET", `${notesendpoint}/notesapp/searchnotes?lookupBy=tag&lookupField=${searchterm}`);
    let status = res.status;
    let body = await res.json();

    if (status === 200 && body.notes.length !== 0) {
      updateNotes(notes => [...body.notes]);
    }
    else{
      updateNotes([]);
    }
  }

  async function getTweets() {
    let res = await makeAPICall("GET", `${notesendpoint}/tweet/getTweets`);
    let status = res.status;
    let body = await res.json();
    console.log(body);
    if (status === 200) {
      updateTweets(tweets => [...body.tweets]);
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

  // realated tags
  function RelatedTag(props) {

    return (
      <>
        <TagContainer>
          <Tag href={'/notes?tag=' + props.text}>{props.text}</Tag>
        </TagContainer>
      </>
    );
  }

function test(e, props){
  console.log(props);
  // console.log(e);
  updateNotes([{id: props.id,title: props.title, text: props.text, tags: props.tags}])
}
//  tweet
function Tweet(props) {

  return (
    <>
      <div
        style={{
          backgroundColor: "ghostwhite",
          borderRadius: "20px",
          padding: "10px",
          marginBottom: "20px"
        }}
        onClick={ (e) => test(e, props)}
      >
        {props.title + " "}
        {props.text}
        <br />
        {props.tags}
      </div>
    </>
  );
}


  return (
    <>
     <div className={classes.root} style={{ backgroundColor: "gainsboro" }}>
      <Navgo />

          <div style={{ maxHeight: "100px", maxWidth: "100vw", display: 'flex', justifyContent: 'center', marginBottom: '10px'}} >
            <img style={{ maxHeight: "100px", maxWidth: "100px" , borderRadius: '50%'}} alt="..." src={require("../assets/img/macmillan.png")}></img>
            <section style={{backgroundColor: "gainsboro", marginLeft: '20px'}} >
            <h3 className="title" style={{margin: '0', padding: '0' }}>Connor Towler</h3>
            <p className="category" style={{margin: '0', padding: '0' }}>
              <a href="http://thenubes.ddns.net"> Website</a>
            </p>
            <form onSubmit={e => handleSubmit(e)}>
              <Input

                aria-describedby="searchinput"
                id="searchinput"
                placeholder="Search by Tag"
                type="text"
                onChange={e => handleChange(e)}
              ></Input>
            </form>
            </section>

          </div>


      <Grid
        container
        spacing={3}
      >
        <Grid item xs={12} sm={8}>

          <Card  variant="outlined">
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
                  <div style={{ display: "flex", flexWrap: 'wrap' }} id='newNoteTagsList'>
                    {tags.length
                      ? tags.map((text, index) => (
                          <TheTag key={index} text={text} />
                        ))
                      : null}
                  </div>
                </CardContent>
              </CardMaterial>
              </CardContent>
                  </Card>
              <Typography align="center" variant="h5" style={{backgroundColor: 'white', margin: 'auto', borderRadius: '50px', width: '30%', marginBottom: '20px'}}>
                {search}
              </Typography>
                  <Card>
              <CardContent>
              <div id="notesList">
                {notes.length
                  ? notes.slice(0,loadingInterval).map((note, index) => (
                      <Note
                        key={uuidv4()}
                        title={note.title}
                        text={note.text}
                        tags={note.tags}
                        link={note.link}
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
          <Card className="card-nav-tabs card-plain" style={{maxHeight: '90vh', overflow: 'auto'}}>
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
                          document.removeEventListener('scroll', trackScrolling)
                          updateLoading(10);
                          setPlainTabs("2");
                        }}
                      >
                        Twitter
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
                        Notes
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={plainTabs === "4" ? "active" : ""}
                        onClick={e => {
                          e.preventDefault();
                          setPlainTabs("4");
                        }}
                      >
                        Blogs
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={plainTabs === "5" ? "active" : ""}
                        onClick={e => {
                          e.preventDefault();
                          setPlainTabs("5");
                        }}
                      >
                        Videos
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

                  <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {relatedTags.length
                      ? relatedTags.map((tag, index) => (
                          <RelatedTag key={tag+index} text={tag} />
                        ))
                      : null}
                      </div>
                </TabPane>
                <TabPane tabId="plainTabs2">
                  <div id="tweetsList">
                    {tweets.length
                      ? tweets.slice(0,100).map((tweet, index) => (
                          <Tweet key={tweet.id} id={tweet.id} title={tweet.title} text={tweet.text} tags={tweet.tags} />
                        ))
                      : null}
                  </div>

                </TabPane>
                <TabPane tabId="plainTabs3">
                <p style={{borderTop: 'grey', borderTopStyle: 'solid'}}>here are a list of tags you can search for</p>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                  {searchabletags.length
                    ? searchabletags.map((tag, index) => (
                        <RelatedTag key={tag+index} text={tag} />
                      ))
                    : null}
                    </div>
                </TabPane>
                <TabPane tabId="plainTabs4">
                <form onSubmit={e => handleSubmit(e)}>
                  <Input
                  className='addblog'

                    id="bloginput"
                    placeholder="Add Blog"
                    type="text"
                    onChange={e => handleChange(e)}
                  ></Input>
                </form>
                <p style={{borderBottom: 'grey', borderBottomStyle: 'solid', marginTop: '10px'}}></p>

                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                  {blogs.length
                    ? blogs.map((blog, index) => (
                      <ReactTinyLink
                      onClick={e => updateNotes([blog])}
                      key={blog.id+index}
                        cardSize="small"
                        showGraphic={true}
                        maxLine={2}
                        minLine={1}
                        url={blog.link}
                      />
                      ))
                    : null}
                    </div>
                    <ReactTinyLink


                      cardSize="large"
                      showGraphic={true}
                      maxLine={2}
                      minLine={1}
                      url={"https://www.youtube.com/watch?v=lJTsfcmesR4"}
                    />
                </TabPane>

              </TabContent>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
      <Fab
        variant="extended"
        size="small"
        color="primary"
        className={classes.fab}
        onClick={event => {console.log(event)}}
href={'/vis'}
      >

        <i className="fa fa-arrow-right" aria-hidden="true"> Visualize Thoughts</i>
      </Fab>
      </div>
    </>
  );
};
export default withStyles(styles)(Notes);
