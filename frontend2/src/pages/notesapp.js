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
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
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


const Notes = ({ classes, history, ...props }) => {
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
let [titles, updateTitles] = React.useState([]);
let [blogs, updateBlogs] = React.useState([]);
let [searchuser, updateSearchUser] = React.useState('');
// let [blogs, updateBlogs] = React.useState([]);
const enter = useKeypress("Enter");
var typingTimer; //timer identifier
var typingTimer2; //timer identifier
var doneTypingInterval = 3000; //time in ms, 5 second for example
let [loadingInterval, updateLoading] = React.useState(10);
let [tweetLimit, updateTweetLimit] = React.useState(100);

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
  const onbeforeunloadFn = () => {
    saveNote("close");
  };
  window.addEventListener("beforeunload", onbeforeunloadFn);
  // Clean up function on page close
  return () => {
    window.removeEventListener("beforeunload", onbeforeunloadFn);
  };
  // eslint-disable-next-line
}, []);


function trackScrollGeneric(elemID, updateVal, updateFcn, removeName, interval) {
  let wrappedElement = document.getElementById(elemID);
  if (isBottom(wrappedElement)) {
    console.log('generic bottom reached');
    document.removeEventListener("scroll", removeName);
    updateFcn(updateVal + interval)
    console.log(updateVal);
  }
}

// returns true if bottom of element is reached
function isBottom(el) {
    return (
      el.getBoundingClientRect().bottom <= window.innerHeight &&
      el.getBoundingClientRect().bottom !== 0
    );
}

function tweet2(){
  trackScrollGeneric('tweetContainer', tweetLimit, updateTweetLimit, tweet2, 50)
}
function noteScroll(){
    trackScrollGeneric('notesList', loadingInterval, updateLoading, noteScroll, 10)
}


React.useEffect(() => {
  document.addEventListener('scroll', noteScroll, false );
  // Clean up function on page close
  return () => {
    window.removeEventListener("scroll", noteScroll);
  };
  // eslint-disable-next-line
}, [loadingInterval]);

React.useEffect(() => {
   document.getElementById('test').addEventListener('scroll', tweet2);
   return () => {
     document.getElementById('test').removeEventListener("scroll", tweet2);
   };
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
  if (Object.keys(getQueryStringParams(props.location.search)).length !== 0) {
    updateSearchUser(getQueryStringParams(props.location.search).user);
    if (
      typeof getQueryStringParams(props.location.search).tag !== "undefined"
    ) {
      updateSearch(getQueryStringParams(props.location.search).tag);
    }
    if (
      typeof getQueryStringParams(props.location.search).search !== "undefined"
    ) {
      updateSearch(getQueryStringParams(props.location.search).search);
    }
  }
  if (searchuser !== "") {
    if (
      typeof getQueryStringParams(props.location.search).tag !== "undefined"
    ) {
      getNotes(search, "tag");
    } else {
      getNotes(search);
    }
    getRelatedTags(search);
  }
  // eslint-disable-next-line
}, [search]);


  React.useEffect(() => {
    if (searchuser !== ""){
      getSearchableTags();
      getTweets();
      getBlogs();
      getTitles()
    }
    // eslint-disable-next-line
  }, [searchuser]);


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
      history.push('/notes' + `?user=${searchuser}&search=${e.target.querySelector("input").value}`)
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
  let text = document.getElementById("newNoteText").value;
  let title = document.getElementById("newNoteTitle").value;
  let taglist = [];
  let tago = document.getElementById("newNoteTagsList").children;
  for (var i = 0; i < tago.length; i++) {
    taglist.push(tago[i].getElementsByTagName("a")[0].innerHTML);
  }

  let notedata = {
    type: type,
    note: { text: text, title: title, tags: taglist, type: 'note', dateupdated: Date.now() },
    user: getQueryStringParams(props.location.search).user
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
      console.log(body);
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
    let res = await makeAPICall("GET", `${notesendpoint}/notesapp/getTagsList?user=${searchuser}`);
    let status = res.status;
    let body = await res.json();
    console.log(body);
    if (status === 200) {
      updateSearchabletags(searchabletags => [...searchabletags, ...body.tags]);
    }
  }

  async function getBlogs() {
    let res = await makeAPICall("GET", `${notesendpoint}/notesapp/getBlogs?user=${searchuser}`);
    let status = res.status;
    let body = await res.json();
    // error
    if (status === 200) {
      updateBlogs(blogs => [...blogs, ...body.blogs]);
    }
    else{
      console.log(body);
    }
  }

  async function getRelatedTags(tag) {
    let res = await makeAPICall("GET", `${notesendpoint}/notesapp/getRelated?user=${searchuser}&tag=${tag}`);
    let status = res.status;
    let body = await res.json();
    // error
    if (status === 200) {
     updateRelatedTags(relatedTags => [...relatedTags, ...body.tags]);
    }
    else {
      console.log(body);
    }
  }

// title object has id, tags, text, title, date (which is rly date updated)
  async function getTitles() {
    let res = await makeAPICall("GET", `${notesendpoint}/notesapp/getTitlesList?user=${searchuser}`);
    let status = res.status;
    let body = await res.json();
    if (status === 200) {
      updateTitles(titles => [...titles, ...body.titles]);
    }
    else {
      console.log(body);
    }
  }

  async function getNotes(searchterm, type) {
    let res
    if (typeof type === 'undefined'){
      res = await makeAPICall("GET", `${notesendpoint}/notesapp/searchnotes?user=${searchuser}&lookupField=${searchterm}`);
    }
    else{
      res = await makeAPICall("GET", `${notesendpoint}/notesapp/searchnotes?user=${searchuser}&lookupBy=tag&lookupField=${searchterm}`);
    }
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
    let res = await makeAPICall("GET", `${notesendpoint}/tweet/getTweets?user=${searchuser}`);
    let status = res.status;
    let body = await res.json();
    console.log(body);
    if (status === 200) {
      updateTweets(tweets => [...body.tweets]);
    }

  }
  // --------------------------------- COMPONENETS ---------------------------
  // component for the Tag in new note
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
          <Tag>{props.text}</Tag>

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
          <Tag href={'/notes?user='+ searchuser+'&tag=' + props.text}>{props.text}</Tag>
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
          marginBottom: "20px",
          minWidth: '100%'
        }}
        onClick={ (e) => test(e, props)}
      >
        {props.title + " "}
        <text style={{lineHeight: '1em', maxHeight: '2em', overflow: 'hidden', '-webkit-line-clamp': '2', display: '-webkit-box'}}>
        {props.text}
        </text>
        <br />
        {props.tags.length
          ? props.tags.map((tag, index) => (
            <text> {tag} </text>
            ))
          : null}
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
            <h3 className="title" style={{margin: '0', padding: '0' }}>{searchuser}</h3>
            <p className="category" style={{margin: '0', padding: '0' }}>
              <a href={"/notes?user=" + searchuser}> Website</a>
            </p>
            <form onSubmit={e => handleSubmit(e)}>
              <Input
                aria-describedby="searchinput"
                id="searchinput"
                placeholder="Search by Title, Text, Tag"
                type="text"
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
                        {...props}
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
          <Card className="card-nav-tabs card-plain" >
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
                        Tags
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </div>
            </CardHeader>
            <CardBody id='test' style={{maxHeight: '70vh', height: '70%', overflow: 'auto'}} >
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
                <TabPane id='tweetContainer' tabId="plainTabs2">
                  <div id="tweetsList" >
                    {tweets.length
                      ? tweets.slice(0,tweetLimit).map((tweet, index) => (
                          <Tweet key={tweet.id} id={tweet.id} title={tweet.title} text={tweet.text} tags={tweet.tags} />
                        ))
                      : null}
                  </div>

                </TabPane>
                <TabPane tabId="plainTabs3">
                <p style={{borderTop: 'grey', borderTopStyle: 'solid'}}>Titles of your notes</p>
                <div id='miniNotesList' style={{display: 'flex', flexWrap: 'wrap'}}>
                  {titles.length
                    ? titles.map((title, index) => (
                      title.title !== '' ?
                        <Tweet key={title+index} id={title.id} title={title.title} text={title.text} tags={title.tags} /> : null
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
                <TabPane tabId="plainTabs5">
                <p style={{borderTop: 'grey', borderTopStyle: 'solid'}}>here are a list of tags you can search for</p>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                  {searchabletags.length
                    ? searchabletags.map((tag, index) => (
                        <RelatedTag key={tag+index} text={tag} />
                      ))
                    : null}
                    </div>
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
href={'/vis?user=' + searchuser}
      >

        <i className="fa fa-arrow-right" aria-hidden="true"> Visualize Thoughts</i>
      </Fab>
      </div>
    </>
  );
};
export default withStyles(styles)(Notes);
