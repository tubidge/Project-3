import React from "react";
import "./style.css";

function DayEvent(props) {
  console.log(props);
  return <li>{props.milestone}</li>;
}

export default DayEvent;
