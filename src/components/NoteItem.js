import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/Notes/noteContext";
import parse from "html-react-parser";

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { delNote } = context;
    const { note } = props;
    const [checked, setChecked] = useState(false);

    const expand = (cardid, expbtnId, ntId) => {
        if (document.getElementById(cardid)) {
            console.log(document.getElementById(cardid).style.minWidth);
            if (document.getElementById(cardid).style.minWidth !== "100%") {
                document.getElementById(cardid).style.minWidth = "100%";
                document.getElementById(ntId).style.minHeight = "365px";
                document.getElementById(
                    expbtnId
                ).innerHTML = `<i class="fa fa-compress" aria-hidden="true"></i>
                `;
            } else {
                document.getElementById(cardid).style.minWidth = "0%";
                document.getElementById(ntId).style.minHeight = "180px";

                document.getElementById(
                    expbtnId
                ).innerHTML = `<i class="fa fa-expand" aria-hidden="true"></i>
                `;
            }
        }
    };

    const handleCheckBox = (e, noteId) => {
        console.log(e.target.checked)
        if (e.target.checked) {
            localStorage.setItem("blognoteid", note._id);
            setChecked(true);
        } else {
            if (localStorage.getItem("blognoteid") === noteId) {
                localStorage.removeItem("blognoteid");
            }
            setChecked(false);
        }
    };

    useEffect(() => {
        setChecked(localStorage.getItem("blognoteid") !== null &&
            localStorage.getItem("blognoteid") === note._id
            ? true
            : false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <div className="col-md-3 my-3 mx-3 " id={"col-" + props.note._id}>
            <div className="card notecard">
                <div className={"card-body " + props.note._id.slice(0, 6)}>
                    <h5 className="card-title">{note.title}</h5>
                    <span className="position-absolute top-0 end-0 badge bg-danger">
                        {note.tag}
                        <span className="visually-hidden"></span>
                    </span>

                    <p className="card-text notetxt" id={"nt-" + props.note._id}>
                        {parse(note.description)}
                    </p>
                    <button
                        onClick={() => {
                            delNote(note._id);
                        }}
                        className="btn btn-danger mx-2"
                    >
                        <i className="fa fa-trash-alt"></i>
                    </button>
                    <button
                        className="btn btn-primary mx-2"
                        onClick={() => {
                            props.updateNote(note);
                        }}
                    >
                        <i className="fa fa-edit"></i>
                    </button>
                    <button
                        className=" btn btn-outline-dark btn-rounded expand"
                        id={"exp-" + props.note._id}
                        data-mdb-ripple-color="dark"
                        onClick={() =>
                            expand(
                                "col-" + props.note._id,
                                "exp-" + props.note._id,
                                "nt-" + props.note._id
                            )
                        }
                    >
                        <i className="fa fa-expand" aria-hidden="true"></i>
                    </button>
                    {note.tag === "BLOG NOTE" && (
                        <div className="position-absolute top-0 start-0">
                            {/* <span className=" badge bg-info">
                                {note._id}
                                <span className="visually-hidden"></span>
                            </span> */}
                            <input
                                className="form-check-input blogNote"
                                type="checkbox"
                                value=""
                                onChange={(e) => handleCheckBox(e, note._id)}
                                aria-label="..."
                                checked={checked}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default NoteItem;
