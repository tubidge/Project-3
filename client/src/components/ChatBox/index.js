import React, { useEffect } from "react";
import "./index.css";
import ChatMessage from "../ChatMessage";
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
    <div className="card mt-5">
      <div className="card-header d-flex justify-content-between text-white shadow-lg bg-success rounded">
        <h4 className="ml-4">{props.name}</h4>
        <div>
          <i onClick={props.exit} className="fas fa-times text-white" />
        </div>
      </div>
      <div className="card-body scroll-box mx-3 messageContent">
        {props.messages.map(index => {
          return (
            <ChatMessage
              key={index.messageId}
              userId={props.userId}
              sender={index._sender.userId}
              message={index.message}
            />
          );
        })}
        <div id="testing" style={{ float: "right" }} />
      </div>
      <div className="card-footer text-muted py-0 shadow-lg bg-success rounded">
        <form className="py-0">
          <div className="form-group d-flex justify-content-between px-0">
            <label htmlFor="messageField" />
            <textarea
              className="form-control mt-2"
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
