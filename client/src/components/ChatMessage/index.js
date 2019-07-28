import React, { useState, useEffect } from "react";
import "./style.css";

function ChatMessage(props) {
  const [buddyUsername, setBuddyUsername] = useState("");

  useEffect(() => {
    props.buddies.filter(buddy => {
      if (buddy.email === props.sender) {
        setBuddyUsername(buddy.username);
      }
      return buddy.username;
    });
  }, []);

  if (props.message === "") {
    return false;
  } else {
    if (props.userId === props.sender) {
      return (
        <div className="clearfix userMessage">
          <span id="meIndicator" className="right">
            Me
          </span>
          <p className="clearfix z-depth-1">{props.message}</p>
        </div>
      );
    } else {
      return (
        <div className="float-left clearfix buddyMessage">
          <span id="buddyIndicator" className="left">
            {buddyUsername}
          </span>
          <p className="float-left clearfix z-depth-1">{props.message}</p>
        </div>
      );
    }
  }
}
export default ChatMessage;
