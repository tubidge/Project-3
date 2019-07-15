import React from "react";
import "./style.css";
import ProgressFiller from "../ProgressFiller";

function ProgressBar(props) {
  if (props.total == 0) {
    return (
      <div>
        <p>Status: N/A</p>
      </div>
    );
  } else {
    let percentage = props.percentage * 100;
    return (
      <div className="progress-bar">
        <ProgressFiller percentage={percentage} />
      </div>
    );
  }
}

export default ProgressBar;
