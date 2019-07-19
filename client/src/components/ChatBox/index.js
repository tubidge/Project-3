import React, { useState, useEffect } from "react";
import "./style.css";
import ChatMessage from "../ChatMessage";
import API from "../../utils/API";
// This chatbox should render a card that takes in props for the current channel and sends those props to a hook that then populates the card
// and allows for new messages to be sent

function ChatBox(props) {
  console.log(props.messages);

  useEffect(() => {
    document.getElementById("testing").scrollIntoView(true);
    console.log("messages changes");
  }, [props.messages.length]);

  useEffect(() => {
    document
      .getElementById("messageField")
      .addEventListener("keydown", function(event) {
        if (event.keyCode == 13 && !event.shiftKey) {
          event.preventDefault();
          document.getElementById("sendMessage").click();
        }
      });
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="ml-4">Chat with {props.messages[0]._sender.userId}</h4>
        <div>
          <i onClick={props.exit} className="fas fa-times text-white" />
        </div>
      </div>
      <div className="card-body scroll-box messageContent">
        {props.messages.map(index => {
          return (
            <ChatMessage
              all={props.messages}
              key={index.messageId}
              userId={props.userId}
              sender={index._sender.userId}
              message={index.message}
            />
          );
        })}
        <div id="testing" style={{ float: "right" }} />
      </div>
      <div className="card-footer rounded">
        <form className="py-0">
          <div className="form-group">
            <label htmlFor="messageField" />
            <textarea
              className="form-control"
              name="messageBody"
              id="messageField"
              rows="1"
              onChange={props.handleInput}
            />
            <i
              id="sendMessage"
              onClick={props.submitNewMessage}
              className="far fa-paper-plane text-white ml-4 mt-3"
            />{" "}
          </div>
        </form>
      </div>
    </div>
  );
}
export default ChatBox;
