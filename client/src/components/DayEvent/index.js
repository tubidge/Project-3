import React from "react";
import "./style.css";

function DayEvent(props) {
  return (
    <li
      key={props.milestone.id}
      id={props.milestone.id}
      className="day-event-item"
      onClick={() => props.clickMilestone(props.milestone.id)}
    >
      {props.milestone.name}
    </li>
  );
}

export default DayEvent;
