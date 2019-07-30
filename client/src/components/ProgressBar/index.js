import React from "react";
import "./style.css";
import ProgressFiller from "../ProgressFiller";

function ProgressBar(props) {
  if (props.total === 0) {
    if (props.header === "goal-page") {
      return (
        <div>
          <p className="white-text" style={{ textAlign: "center" }}>
            set milestones to see goal progress
          </p>
        </div>
      );
    } else if (props.header === "goal-card") {
      return (
        <div>
          <p className="white-text" style={{ textAlign: "center" }}>
            no milestones
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <p style={{ color: "grey" }}>No milestones</p>
        </div>
      );
    }
  } else {
    let percentage = props.percentage * 100;
    return (
      <div className="progressBar">
        <ProgressFiller percentage={percentage} />
      </div>
    );
  }
}

export default ProgressBar;
