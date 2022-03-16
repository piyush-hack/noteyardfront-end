import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import timetableContext from '../context/TimeTable/timetableContext';
import TimeTableItem from './TimeTableItem';

// const HtmlTableToJson = require('html-table-to-json');

const TimeTable = () => {

    const table = useRef(null)
    const editTd = useRef(null)
    const modalBtn = useRef(null);

    let history = useHistory();

    const [usParams, setUsParams] = useState(null)
    const [time, setTime] = useState(null)

    const context = useContext(timetableContext);
    const { updateTable, getTable, HtmlTableToJson, setTimetable, timetable, addTableCol, updateState } = context;



    const convertToJson = async () => {
        var jsonTable = await HtmlTableToJson();
        // console.log(jsonTable)
        await setTimetable(jsonTable.myrows);
        // console.log(timetable)
        await updateTable()
    }

    const openModal = async (data) => {
        modalBtn.current.click();
        // console.log(data.day)
        if(data.day === "Time"){
            editTd.current.type = "time"
        }else{
            editTd.current.type = "text"

        }
        await setUsParams(data);
        // console.log(usParams)
        editTd.current.value = data.text;
    }

    const handleOnChange = (e) => {
        setUsParams({ ...usParams, "text": e.target.value })
    }

    const updateTimeTable = async (e) => {
        e.preventDefault();
        // console.log(usParams);
        updateState(usParams.text, usParams.index, usParams.day, usParams.col);
        modalBtn.current.click();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        addTableCol(time);
    }


    useEffect(() => {

        async function start() {
            if (!localStorage.getItem("token")) {
                history.push("/login")
            } else {
                await getTable()
            }
        }
        start()

    }, [])

    return (
        <div className="container">
            <br /><br /><br />
            

            <div>
                <button ref={modalBtn} type="button" className="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#exampleModal" data-mdb-whatever="@getbootstrap" style={{ display: "none" }} >
                    Open modal
                </button>
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                                <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" />
                            </div>
                            <form onSubmit={updateTimeTable}>
                                <div className="modal-body">

                                    <div className="mb-3">
                                        <label htmlFor="content" className="col-form-label">Content:</label>
                                        <input ref={editTd} type="text" className="form-control" id="content" onChange={handleOnChange} />
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div id="table" className="table-editable">
                <span className="table-add float-right mb-3 mr-2">
                    <button className="btn text-success" ><i className="fas fa-plus fa-2x" aria-hidden="true" />
                    </button>
                    <form onSubmit={handleSubmit} className="addRowForm">
                        <input type="time" name='time' className="form-control" id="time" onChange={(e) => {
                            setTime(e.target.value);
                        }} />
                        <button type="submit" className="btn btn-light" data-mdb-ripple-color="dark">Add</button>
                    </form>
                </span>

                <br /><br />
                <table ref={table} className="table table-bordered table-responsive-md table-striped text-center">
                    <thead>
                        <tr className="bg-light-gray">
                            <th className="text-uppercase">Time
                            </th>
                            <th className="text-uppercase">Monday</th>
                            <th className="text-uppercase">Tuesday</th>
                            <th className="text-uppercase">Wednesday</th>
                            <th className="text-uppercase">Thursday</th>
                            <th className="text-uppercase">Friday</th>
                            <th className="text-uppercase">Saturday</th>
                            <th className="text-uppercase">Sunday</th>
                            <th className="text-center">Sort</th>
                            <th className="text-center">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timetable && timetable.map((tr, i) => {
                            return <TimeTableItem key={tr.Time} tr={tr} index={i} len={timetable.length} openModal={openModal} />;
                        })}
                    </tbody>
                </table>

                <button className='btn btn-primary' onClick={convertToJson}  >Save</button>
            </div>
        </div>
    )
}

export default TimeTable