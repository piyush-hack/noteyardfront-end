import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import noteContext from "../context/Notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Notes = () => {
    const context = useContext(noteContext);
    const { editNote, notes, setAlertScreen, getNotes } = context;
    let history = useHistory();

    const [note, setNote] = useState({ title: "", description: "", tag: "GENERAL" })

    const checkReq = (note) => {
        if (note.title.length > 4 && note.description.length > 4) {
            return true
        } else {
            setAlertScreen("Fill According to requirements . Title length > 4 &  Description length > 4", "danger")
            return false
        }
    }

    const ref = useRef(null)
    const updateNote = async (currNote) => {
        ref.current.click();
        await setNote(currNote);
    }

    const handleClick = (e) => {
        e.preventDefault();

        if (checkReq(note)) {
            editNote(note._id, note)
        }
        ref.current.click();
    };

    const handleOnchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleEditorChange = (e) => {
        if(note.description === ''){
            return
        }
        setNote({...note , "description": e })
    }

    useEffect(() => {

        async function start() {
            if (!localStorage.getItem("token")) {
                history.push("/login")
            } else {
                await getNotes();

            }
        }

        start();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (


        <div className="notes container">
            <AddNote checkReq={checkReq} />
            <div>
                <button type="button" className="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#exampleModal" ref={ref} style={{ display: "none" }}  >
                    Edit modal
                </button>

                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="eexampleModalLabel">Update Modal</h5>
                                <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form className="my-3">
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="etitle"
                                            aria-describedby="emailHelp"
                                            name="title"
                                            onChange={handleOnchange}
                                            minLength="5"
                                            value={note.title}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">
                                            Description
                                        </label>
                                        {/* <input
                                            type="text"
                                            className="form-control"
                                            id="edescription"
                                            onChange={handleOnchange}
                                            name="description"
                                            minLength="5"
                                            value={note.description}
                                        /> */}
                                    </div>
                                    <ReactQuill 
                                        onChange={handleEditorChange} value={note.description} />
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">
                                            Tag
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="etag"
                                            onChange={handleOnchange}
                                            name="tag"
                                            maxLength="10"
                                            value={note.tag}
                                            list="rec_tags"
                                            autoComplete="off"
                                            onInput={(e) => {
                                                e.target.value = e.target.value.toUpperCase()
                                            }
                                            }
                                        />
                                        <datalist id="rec_tags">
                                            <option>GENERAL</option>
                                            <option>TODO</option>
                                            <option>REMINDER</option>
                                            <option>IMPORTANT</option>
                                        </datalist>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3 justify-content-center">
                <h1>Your Notes</h1>

                <div className="container">
                    {notes && notes.length === 0 && "No Notes To Diplay"}
                </div>
                {notes && notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} />;
                })}
            </div>
        </div>

    );
};

export default Notes;
