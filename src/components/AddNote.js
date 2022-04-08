import React, { useContext, useRef, useState } from "react";
import noteContext from "../context/Notes/noteContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "GENERAL" })

    const ref = useRef(null)



    const handleClick = (e) => {
        e.preventDefault();

        if (props.checkReq(note)) {
            addNote(note)
        }
        ref.current.click();
    };

    const handleOnchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleEditorChange = (e) => {
        setNote({ ...note, "description": e })
    }

    return (
        <div>
            <div>
                <button type="button " className="btn btn-primary my-3" data-mdb-toggle="modal" data-mdb-target="#addModal" ref={ref} >
                    Add Note
                </button>
                {/* Modal */}
                <div className="modal fade" id="addModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add A Note</h5>
                                <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div className="my-3">
                                    <form className="my-3">
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="title"
                                                aria-describedby="emailHelp"
                                                name="title"
                                                minLength="5"
                                                onChange={handleOnchange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">
                                                Description
                                            </label>
                                            {/* <input
                                                type="text"
                                                className="form-control"
                                                id="description"
                                                onChange={handleOnchange}
                                                name="description"
                                                minLength="5"
                                            /> */}
                                        </div>
                                        <ReactQuill
                                            onChange={handleEditorChange} />
                                        <div className="mb-3">
                                            <label htmlFor="tag" className="form-label">
                                                Tag
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="tag"
                                                onChange={handleOnchange}
                                                name="tag"
                                                maxLength="15"
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
                                                <option>BLOG NOTE</option>
                                            </datalist>

                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={handleClick}
                                >
                                    Add Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default AddNote;
