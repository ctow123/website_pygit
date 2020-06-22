import React from "react";
import { Input } from "reactstrap";
import {
  Card as CardMaterial,
  CardActions,
  CardHeader,
  CardContent,
  Button
} from "@material-ui/core";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { Tag, TagContainer } from "./Body/styles.js";
import { makeAPICall } from "../api/api.js";
import { apiprefix, notesendpoint } from "../api/apiprefix.js";
import Typography from "@material-ui/core/Typography";

// this class requires certain field in the props
// {title, text, tags, id } must all be defined by the props passed into this object
const Note = ({ classes, ...props }) => {
  // console.log(props);
  const isMounted = React.useRef(true);
  const titleRef = React.useRef(null);
  const [isTitleActive, setIsTitleActive] = React.useState(false);
  let [tags, updateTags] = React.useState(props.tags);
  let [title, updateTitle] = React.useState(props.title);
  let [text, updateText] = React.useState(props.text);
    let [saveres, updateSaveres] = React.useState('');
  var typingTimer;
    var typingTimer2;
  var doneTypingInterval = 3000; //time in ms, 5 second for example

  React.useEffect(() => {
    // on keyup, start the countdown, saves after doneTypingInterval seconds of no typing
    document
      .getElementById(`${"newNoteText" + props.id}`)
      .addEventListener("keyup", () => {
        clearTimeout(typingTimer);
        if (document.getElementById(`${"newNoteText" + props.id}`).value) {
          // eslint-disable-next-line
          typingTimer = setTimeout(saveNote, doneTypingInterval, "text");
        }
      });
      document
        .getElementById(`${"newNoteTitle" + props.id}`)
        .addEventListener("keyup", () => {
          clearTimeout(typingTimer2);
          if (document.getElementById(`${"newNoteTitle" + props.id}`).value) {
            // eslint-disable-next-line
            typingTimer2 = setTimeout(saveNote, doneTypingInterval, "title");
          }
        });
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
      return;
    } else {
      saveNote("tag");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  // handle which of the new note fields to highlight (title, text, tags)
  function handleNewNoteClick(e) {
    e.preventDefault();
    if (e.target.id === `${"newNoteTitle" + props.id}`) {
      setIsTitleActive(true);
    }
  }

  useOnClickOutside(titleRef, () => {
    if (isTitleActive) {
      setIsTitleActive(false);
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    let test2 = document.getElementById(`${"newNoteTags" + props.id}`);
    updateTags(tags => [...tags, test2.value]);
    test2.value = "";
  }


  // send note to server to save or update save with timestamp
  async function saveNote(type) {
    let taglist = [];
    let tago = document.getElementById("newNoteTagsList" + props.id).children;
    for (var i = 0; i < tago.length; i++) {
      taglist.push(tago[i].getElementsByTagName("a")[0].innerHTML);
    }

    let notedata = {
      type: type,
      note: {      text: document.getElementById(`${"newNoteText" + props.id}`).value,
            title: document.getElementById(`${"newNoteTitle" + props.id}`).value,
            tags: taglist, dateupdated: Date.now()}
    };
    console.log(type, notedata);
    try{
    let res = await makeAPICall(
      "PUT",
      `${notesendpoint}/notesapp/editnote/${props.id}`,
      notedata
    );
    let status = res.status;
    let body = await res.json();
    if (status !== 200 && status !== 201) {
      props.onSave({ body: body, status: status });
    } else {
      props.onSave({ body: body, status: status, title: props.title });
      updateSaveres('saving...')
    }
  }
  catch(err){
    props.onSave({body: err.toString(), status: 400});
  }
  }

  // handle input change
  function handleChange(e) {
    if (e.target.id === `${"newNoteText" + props.id}`) {
      updateText(e.target.value);
    } else if (e.target.id === `${"newNoteTitle" + props.id}`) {
      updateTitle(e.target.value);
    }
  }

  // component for the Tag
  function TheTag(props) {

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
    <div style={{ paddingTop: "20px" }}>
      <CardMaterial variant="outlined">
      <Typography align="center" variant="body1">
        {saveres}
      </Typography>
        <CardContent>
        <Button style={{marginLeft: '85%'}}>
        <i className="fa fa-trash" ></i>
        </Button>
          <Input
            ref={titleRef}
            className="note"
            id={"newNoteTitle" + props.id}
            placeholder="Enter title"
            value={title}
            type="text"
            style={{ fontSize: "20px" }}
            onClick={e => handleNewNoteClick(e)}
            onChange={e => handleChange(e)}
          ></Input>
          <textarea
            className="note"
            name="text"
            value={text}
            id={"newNoteText" + props.id}
            onChange={e => handleChange(e)}
            placeholder="enter note text"
            rows="5"
          />
          <form onSubmit={e => handleSubmit(e)}>
            <Input
              className="note"
              id={"newNoteTags" + props.id}
              placeholder="Add tags"
              type="text"
              style={{ fontSize: "15px", width: "40%" }}
              autoComplete="off"
            ></Input>
          </form>
          <div id={"newNoteTagsList" + props.id} style={{ display: "flex" , flexWrap: 'wrap'}}>
            {tags.length
              ? tags.map((text, index) => <TheTag key={index} text={text} />)
              : null}
          </div>
        </CardContent>
      </CardMaterial>
    </div>
  );
};

export default Note;
