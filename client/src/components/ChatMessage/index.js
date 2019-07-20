import React from "react";
import "./style.css";

function ChatMessage(props) {
  // console.log(props.all);
  if (props.message === "") {
    return false;
  } else {
    if (props.userId === props.sender) {
      return (
        <div className="clearfix userMessage">
          <p className="clearfix z-depth-1">{props.message}</p>
        </div>
      );
    } else {
      return (
        <div className="float-left clearfix buddyMessage">
          <p className="float-left clearfix z-depth-1">{props.message}</p>
        </div>
      );
    }
  }
}
export default ChatMessage;
