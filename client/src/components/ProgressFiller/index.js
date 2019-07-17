import React from "react";
import "./style.css";

function ProgressFiller(props) {
  return (
    <div
      className="progress-filler"
      style={{ width: `${props.percentage}%` }}
    />
  );
}

export default ProgressFiller;
