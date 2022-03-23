import React from "react";
import loading from "../loading.gif";


const Spinner = (props) => {
  return (
    <div
      className={!props.spinClass ? "spinner" : props.spinClass }
      style={{ display: props.show ? "block" : "none" }}
    >
      <img src={loading} alt={loading} />
    </div>
  );
}

export default Spinner
