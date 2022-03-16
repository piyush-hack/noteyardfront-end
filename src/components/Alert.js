import React, { useContext } from 'react'
import noteContext from '../context/Notes/noteContext';

const Alert = (props) => {

    const context = useContext(noteContext);
    const { alert } = context;

    return (

        alert && alert.msg &&
        <div><div className={"pi alert alert-" + alert.type } role="alert">
           {alert.msg}
        </div></div>

    )
}

export default Alert