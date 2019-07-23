import React, { useEffect } from "react";
import "./style.css";
import M from "materialize-css";

function DayEvent(props) {
  useEffect(() => {
    M.AutoInit();
    let options = {
      enterDelay: 800
    };
    var elems = document.querySelectorAll(".tooltipped");
    var instances = M.Tooltip.init(elems, options);
  }, []);
  return (
    <li
      key={props.milestone.id}
      id={props.milestone.id}
      className={props.className}
      onClick={() => props.clickMilestone(props.milestone.id)}
      data-position={props.dataPosition}
      data-tooltip={props.dataTooltip.name}
    >
      {props.milestone.name}
    </li>
  );
}

export default DayEvent;
