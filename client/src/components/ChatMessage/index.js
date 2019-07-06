import React from "react";
import "./index.css";

function ChatMessage(props) {
  if (props.message === "") {
    return false;
  } else {
    if (props.userId === props.sender) {
      return (
        <div className=" float-right clearfix d-block userMessage my-2">
          <p className="float-right clearfix shadow-lg px-3">{props.message}</p>
        </div>
      );
    } else {
      return (
        <div className="float-left clearfix d-block buddyMessage my-2">
          <p className="float-left clearfix shadow-lg px-3">{props.message}</p>
        </div>
      );
    }
  }
}

export default ChatMessage;
