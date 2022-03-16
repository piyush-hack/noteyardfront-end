import React, { useContext } from 'react'
import noteContext from '../context/Notes/noteContext';
import parse from 'html-react-parser';

const NoteItem = (props) => {

    const context = useContext(noteContext);
    const { delNote } = context;

    const { note } = props;
    return (
        <div className='col-md-3 my-3 mx-3 '>
            <div className="card" >
                <div className={"card-body "  + props.note._id.slice(0 , 6) }>

                    <h5 className="card-title">{note.title}</h5>
                    <span className="position-absolute top-0 end-0 badge bg-danger">
                        {note.tag}
                        <span className="visually-hidden">unread messages</span>
                    </span>

                    <p className="card-text">{ parse(note.description) }</p>
                    <button onClick={() => { delNote(note._id) }} className="btn btn-danger mx-2"><i className="fa fa-trash-alt" ></i></button>
                    <button className="btn btn-primary mx-2" onClick={() => {
                        props.updateNote(note)
                    }}><i className="fa fa-edit"></i></button>

                </div>
            </div>

        </div>
    )
}

export default NoteItem