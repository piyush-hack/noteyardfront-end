import React, { useContext } from 'react'
import timetableContext from '../context/TimeTable/timetableContext';

const TimeTableItem = (props) => {
    const context = useContext(timetableContext);
    const { delTableCol, sortRows } = context;

    const { tr, index, len, openModal } = props
    return (
        <tr >
            <td className="align-middle time" onClick={async e => {
                // console.log(e, e.currentTarget, e.currentTarget.textContent)
                const text = e.currentTarget.textContent;
                await openModal({ text: text, index: index, day: "Time" });
            }
            }  >{tr.Time}</td>
            <td>
                <span className="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Monday", col: 0 });
                }
                }  >{tr.Monday[0]}</span>
                <div className="margin-10px-top font-size14" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Monday", col: 1 });
                }
                }  >{tr.Monday[1]}</div>
                <div className="font-size13 text-light-gray" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Monday", col: 2 });
                }
                }  >{tr.Monday[2]}</div>
            </td>
            <td>
                <span className="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Tuesday", col: 0 });
                }
                }  >{tr.Tuesday[0]}</span>
                <div className="margin-10px-top font-size14" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Tuesday", col: 1 });
                }
                }  >{tr.Tuesday[1]}</div>
                <div className="font-size13 text-light-gray" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Tuesday", col: 2 });
                }
                }  >{tr.Tuesday[2]}</div>
            </td>
            <td>
                <span className="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Wednesday", col: 0 });
                }
                }  >{tr.Wednesday[0]}</span>
                <div className="margin-10px-top font-size14" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Wednesday", col: 1 });
                }
                } >{tr.Wednesday[1]}</div>
                <div className="font-size13 text-light-gray"  onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Wednesday", col: 2 });
                }
                } >{tr.Wednesday[2]}</div>
            </td>
            <td>
                <span className="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Thursday", col: 0 });
                }
                } >{tr.Thursday[0]}</span>
                <div className="margin-10px-top font-size14" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Thursday", col: 1 });
                }
                }  >{tr.Thursday[1]}</div>
                <div className="font-size13 text-light-gray" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Thursday", col: 2 });
                }
                }  >{tr.Thursday[2]}</div>
            </td>
            <td>
                <span className="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Friday", col: 0 });
                }
                }  >{tr.Friday[0]}</span>
                <div className="margin-10px-top font-size14" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Friday", col: 1 });
                }
                }  >{tr.Friday[1]}</div>
                <div className="font-size13 text-light-gray" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Friday", col: 2 });
                }
                }  >{tr.Friday[2]}</div>
            </td>
            <td>
                <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Saturday", col: 0 });
                }
                } >{tr.Saturday[0]}</span>
                <div className="margin-10px-top font-size14" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Saturday", col: 1 });
                }
                } >{tr.Saturday[1]}</div>
                <div className="font-size13 text-light-gray" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Saturday", col: 2 });
                }
                } >{tr.Saturday[2]}</div>
            </td>
            <td>
                <span className="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Sunday", col: 0 });
                }
                } >{tr.Sunday[0]}</span>
                <div className="margin-10px-top font-size14" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Sunday", col: 1 });
                }
                } >{tr.Sunday[1]}</div>
                <div className="font-size13 text-light-gray" onClick={async e => {
                    const text = e.currentTarget.textContent;
                    await openModal({ text: text, index: index, day: "Sunday", col: 2 });
                }
                } >{tr.Sunday[2]}</div>
            </td>
            <td>
                <span className="table-up edit"><button className="btn btn-sm indigo-text mx-1" disabled={index - 1 < 0} onClick={() => { sortRows(index, index - 1) }} ><i className="fas fa-long-arrow-alt-up" aria-hidden="true" /></button></span>
                <span className="table-down edit"><button className="btn btn-sm indigo-text" disabled={index + 1 >= len} onClick={() => { sortRows(index, index + 1) }}><i className="fas fa-long-arrow-alt-down" aria-hidden="true" /></button></span>
            </td>
            <td>
                <span className="table-remove edit"><button type="button" className="btn btn-danger btn-rounded btn-sm my-0" onClick={() => { delTableCol(tr.Time) }}>
                    Remove
                </button></span>
            </td>

        </tr>
    )
}

export default TimeTableItem