import React, { useContext, useState } from "react";
import TimeTableContext from "./timetableContext";
import $ from 'jquery';
import noteContext from "../Notes/noteContext";

const TimeTableState = (props) => {

    const context = useContext(noteContext);
    const { host, setProgress, setAlertScreen } = context;

    const intial = [
        {
            "Time": "--:--",
            "Monday": [
                "----",
                "--:-----:--",
                "---- ----"
            ],
            "Tuesday": [
                "----",
                "--:-----:--",
                "---- ----"
            ],
            "Wednesday": [
                "----",
                "--:-----:--",
                "---- ----"
            ],
            "Thursday": [
                "----",
                "--:-----:--",
                "---- ----"
            ],
            "Friday": [
                "----",
                "--:-----:--",
                "---- ----"
            ],
            "Saturday": [
                "----",
                "--:-----:--",
                "---- ----"
            ],
            "Sunday": [
                "----",
                "--:-----:--",
                "---- ----"
            ]
        }
    ];

    const [timetable, setTimetable] = useState(intial);

    const getTimetable = async () => {
        return timetable;
    };

    const getTable = async () => {
        await callAPI("GET", `${host}/api/auth/gettimetable`)
            .then(async data => {
                if (!data.error) {
                    await setTimetable(data.routine.timetable)
                    await setAlertScreen("DATA RETRIVED", "success")
                } else {
                    setTimetable(null)
                }
                setProgress(100)
                // console.log(data); // JSON data parsed by `data.json()` call

            });
    }

    const updateState = async (text, index, day, col) => {
        if (day === "Time") {
            // console.log("time")
            let newTimetable = JSON.parse(JSON.stringify(timetable));
            newTimetable[index][day] = text;

            await setTimetable(newTimetable);
            // console.log(timetable)
        } else {

            let newTimetable = JSON.parse(JSON.stringify(timetable));
            // console.log("day", day, newTimetable, newTimetable[index][day], newTimetable[index][day][col])

            console.log(newTimetable[index][day])
            if (!newTimetable[index][day] || typeof newTimetable[index][day] === "string") {
                newTimetable[index][day] = [text];
            } else {
                newTimetable[index][day][col] = text;
            }

            await setTimetable(newTimetable);
            console.log(timetable)
        }
    }

    const updateTable = async () => {
        // console.log(timetable)
        await callAPI("POST", `${host}/api/auth/settimetable`, { timetable: timetable })
            .then(async data => {
                if (!data.error) {
                    await setTimetable(data.routine.timetable)
                    await setAlertScreen("DATA UPDATED", "success")
                } else {
                    setTimetable(null)
                }
                setProgress(100)
                // console.log(data); // JSON data parsed by `data.json()` call

            });
    }

    const sortRows = async (position, op) => {

        console.log(position, op)

        if (op >= 0 && op < timetable.length) {

            let newTimetable = JSON.parse(JSON.stringify(timetable));

            let temp = newTimetable[position];
            newTimetable[position] = newTimetable[op]
            newTimetable[op] = temp;

            console.log(position, op, newTimetable)
            await setTimetable(newTimetable)
            console.log(timetable)
        }

    }

    const HtmlTableToJson = async () => {
        var myRows = [];
        var $headers = $("th");
        await $("tbody tr").each(function (index) {
            var $cells = $(this).find("td");
            myRows[index] = {};
            $cells.each(function (cellIndex) {
                if (cellIndex < ($cells.length - 2)) {
                    var $entry = $(this).children()
                    var array;
                    if ($entry.length > 0) {
                        array = $entry.map(function (e) {
                            return $(this).html()
                        }).get();
                    } else {
                        array = $(this).html()
                    }
                    myRows[index][$($headers[cellIndex]).text()] = array;
                }
            });
        });
        var myObj = {};
        myObj.myrows = myRows;
        // console.log(myObj);
        return myObj
    }


    const addTableCol = async (time) => {
        let traceFieldIndex = await timetable.findIndex(field => {
            return field.Time && field.Time === time.toString();
        });

        if (time && traceFieldIndex === -1) {
            if (timetable && timetable.length > 0) {
                let newTimetable = JSON.parse(JSON.stringify(timetable));
                // let newRow = timetable[timetable.length - 1];
                let newRow = {
                    "Time": "09:00am",
                    "Monday": [
                        ".",
                        ".",
                        "."
                    ],
                    "Tuesday": [
                        ".",
                        ".",
                        "."
                    ],
                    "Wednesday": [
                        ".",
                        ".",
                        "."
                    ],
                    "Thursday": [
                        ".",
                        ".",
                        "."
                    ],
                    "Friday": [
                        ".",
                        ".",
                        "."
                    ],
                    "Saturday": [
                        ".",
                        ".",
                        "."
                    ],
                    "Sunday": [
                        ".",
                        ".",
                        "."
                    ]
                }
                newRow.Time = time;
                console.log(newTimetable)
                await newTimetable.push(newRow);
                // console.log(newTimetable)
                await setTimetable(newTimetable);
            } else {
                let newTimetable = [{
                    "Time": time,
                    "Monday": [
                        ".",
                        ".",
                        "."
                    ],
                    "Tuesday": [
                        ".",
                        ".",
                        "."
                    ],
                    "Wednesday": [
                        ".",
                        ".",
                        "."
                    ],
                    "Thursday": [
                        ".",
                        ".",
                        "."
                    ],
                    "Friday": [
                        ".",
                        ".",
                        "."
                    ],
                    "Saturday": [
                        ".",
                        ".",
                        "."
                    ],
                    "Sunday": [
                        ".",
                        ".",
                        "."
                    ]
                }]
                await setTimetable(newTimetable);
            }
        } else {
            setAlertScreen("Enter A Unique Time", "danger")
        }


        // console.log("timetable" , timetable)
    }

    const delTableCol = async (time) => {
        let newTimetable = await timetable.filter((timetable) => {
            return timetable.Time !== time
        })

        await setTimetable(newTimetable)
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
        <TimeTableContext.Provider value={{ getTimetable, HtmlTableToJson, setTimetable, timetable, delTableCol, addTableCol, getTable, updateTable, sortRows, updateState }}>
            {props.children}
        </TimeTableContext.Provider>
    );
};

export default TimeTableState;
