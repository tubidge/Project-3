import React, { useEffect } from "react";
import "./style.css";
import M from "materialize-css";

function DayEvent(props) {
  useEffect(() => {
    M.AutoInit();
  }, []);
  return (
    <li
      key={props.milestone.id}
      id={props.milestone.id}
      className={props.className}
      onClick={() => props.clickMilestone(props.milestone.id)}
    >
      {props.milestone.name}
    </li>
  );
}

export default DayEvent;
