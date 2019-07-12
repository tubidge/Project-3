import React from "react";
import "./style.css";

function Milestone(props) {
  return (
    <li>
      <p className="milestone-name">{props.name}</p>
      <div className="col s6">
        <span>Frequency: {props.frequency}</span>
      </div>
      <div className="col s6">
        <span>Due: {props.due}</span>
      </div>
      <br />
      <hr />
    </li>
  );
}

export default Milestone;
