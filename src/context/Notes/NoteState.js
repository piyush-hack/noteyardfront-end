import React, { useState } from "react";
import NoteContext from "./noteContext";
import $ from 'jquery';

const NoteState = (props) => {

  // const host = "http://localhost:5000"
  async function url(serverurl) {
    await fetch(serverurl)
      .then(async response => {
        // console.log("response", response); 
        return response
      })
      .then(async data => {
        // console.log("object", data); 
        return data
      })
      .catch(async (error) => {
        // console.log('Error:', error , serverurl);
        // console.clear();
        return null;
      });
  }

  // 2nd host -> https://noteyard-backend.herokuapp.com
  // console.log(url("https://noteyard-backend.herokuapp.com"))
  const host = url("https://noteyard-backend.herokuapp.com") != null ? "https://noteyard-backend.herokuapp.com" : "https://noteyardbackend.herokuapp.com";

  // console.log(host)
  
  const notesIntial = [
    {
      "_id": "loader621a4251d12050488372a61f",
      "user": "621a4009d12050488372a61a",
      "title": "Testing",
      "description": "first Test desc ",
      "tag": "code",
      "date": "2022-02-26T15:08:01.856Z",
      "__v": 0
    },
    {
      "_id": "loader621b210911594b2519a16a0b",
      "user": "621a4009d12050488372a61a",
      "title": "Test 2",
      "description": "Test desc",
      "tag": "General",
      "date": "2022-02-27T06:58:17.099Z",
      "__v": 0
    },
    {
      "_id": "loader621a4251d12050488372a61fa",
      "user": "621a4009d12050488372a61a",
      "title": "Testing",
      "description": "first Test desc ",
      "tag": "code",
      "date": "2022-02-26T15:08:01.856Z",
      "__v": 0
    },
  ]

  const [notes, setNotes] = useState(notesIntial)

  const [alert, setAlert] = useState({ msg: "", type: "" })

  const [progress, setProgress] = useState(0)




  const setAlertScreen = (msg, type) => {
    setAlert({ msg: msg, type: type })

    setTimeout(() => {
      setAlert(null, null);
    }, 3000);
  }

  $(window).scroll(function () {
    if ($(this).scrollTop() > 135) {
      $('.alert').addClass('fixed');
    } else {
      $('.alert').removeClass('fixed');
    }
  });


  const getNotes = async (note) => {

    await callAPI("GET", `${host}/api/notes/fetchallnotes`)
      .then(async data => {
        if (!data.error) {
          await setNotes(data)
          await setAlertScreen("DATA RETRIVED", "success")
        } else {
          setNotes(null)
        }
        setProgress(100)
        // console.log(data); // JSON data parsed by `data.json()` call

      });
  }


  // callAPI("GET", `${host}/api/notes/fetchallnotes`)
  //   .then(async data => {
  //     //console.log(data); // JSON data parsed by `data.json()` call
  //     setNotes(data)
  //   });


  //Add a note

  const addNote = async (note) => {
    //console.log("adding a note", note)
    await callAPI("POST", `${host}/api/notes/addnote`, note)
      .then(data => {
        if (!data.errors) {

          setNotes(notes.concat(data))
          setAlertScreen("Addedd Successfully", "success")

        } else {
          console.log(data);
          setAlertScreen("REQUEST FAILED. Check console for more", "danger")
        }
        setProgress(100)

      });

  }


  // Del note
  const delNote = async (id) => {
    //console.log("del a note", id);
    await callAPI("DELETE", `${host}/api/notes/deletenote/${id}`, {})
      .then(async data => {
        if (!data.errors) {
          let newNotes = await notes.filter((note) => {
            return note._id !== id
          })

          await setNotes(newNotes)
          setAlertScreen("Deleted Successfully.", "success")
        } else {
          console.log(data);
          setAlertScreen("REQUEST FAILED. Check console for more", "danger")
        }
        setProgress(100)

      });

  }


  //Edit note
  const editNote = async (id, note) => {

    const data = {
      title: note.title,
      description: note.description,
      tag: note.tag,
    }
    await callAPI("PUT", `${host}/api/notes/updatenote/${id}`, data)
      .then(async data => {
        //console.log(data); // JSON data parsed by `data.json()` call
        if (!data.errors) {
          setAlertScreen("Edited Successfully", "success")

        } else {
          console.log(data);
          setAlertScreen("REQUEST FAILED. Check console for more", "danger")
        }
      });

    let newNotes = JSON.parse(JSON.stringify(notes));

    await newNotes.every(async (element, i) => {
      if (newNotes[i]._id === id) {
        newNotes[i].title = note.title;
        newNotes[i].description = note.description;
        newNotes[i].tag = note.tag;
        return true;
      } else {
        return false;
      }
    });

    setNotes(newNotes);
    setProgress(100)

  }

  async function callAPI(method = 'POST', url = '', data = {}) {
    // Default options are marked with *
    // console.log(localStorage.getItem('token'))
    setProgress(30)
    try {
      if (method !== "GET") {
        const response = await fetch(url, {
          method: method, // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token') || null,
          },
          body: JSON.stringify(data)
        });
        setProgress(80)
        return response.json();
      } else {
        const response = await fetch(url, {
          method: method, // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token') || null,
          }
        });
        setProgress(80)
        return response.json();
      }
    } catch (error) {
      console.log(error)
      setAlertScreen("REQUEST FAILED. Check console for more", "danger")
    }


  }


  return (
    <NoteContext.Provider value={{ notes, addNote, delNote, editNote, alert, setAlertScreen, getNotes, host, setProgress, progress }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;