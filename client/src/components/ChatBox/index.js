import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import "./style.css";
import ChatMessage from "../ChatMessage";
// This chatbox should render a card that takes in props for the current channel and sends those props to a hook that then populates the card
// and allows for new messages to be sent

function ChatBox(props) {
  const [buddyUsername, setBuddyUsername] = useState("");
  useEffect(() => {
    document.getElementById("testing").scrollIntoView(true);
    console.log("messages changes");
  }, [props.messages.length]);

  useEffect(() => {
    findBuddyUsername();
    document
      .getElementById("messageField")
      .addEventListener("keydown", function(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
          event.preventDefault();
          document.getElementById("sendMessage").click();
        }
      });
  }, []);

  const findBuddyUsername = () => {
    props.buddies.filter(buddy => {
      props.messages.filter(message => {
        if (message._sender.userId === buddy.email) {
          console.log(buddy.username);
          return buddy.username;
        }
      });
    });
  };

  return (
    <div id="chatBox">
      <div className="card">
        <div className="card-content">
          <span className="card-title">
            Chat with your <span className="buddyInfoInvert">Buddy</span>
            <i className="material-icons right" onClick={props.exit}>
              close
            </i>
          </span>
        </div>
        <div className="messageContent">
          {props.messages.map(index => {
            return (
              <>
                <ChatMessage
                  buddies={props.buddies}
                  all={props.messages}
                  key={index.messageId}
                  userId={props.userId}
                  sender={index._sender.userId}
                  message={index.message}
                />
              </>
            );
          })}
          <div id="testing" style={{ float: "right" }} />
        </div>
        <div className="card-footer">
          <form>
            <div className="input-field">
              <label htmlFor="messageField" />
              <textarea
                placeholder="Motivate your Buddy..."
                className="materialize-textarea"
                name="messageBody"
                id="messageField"
                onChange={props.handleInput}
              />
              <div className="card-action right-align">
                <span
                  className="btn"
                  id="sendMessage"
                  onClick={props.submitNewMessage}
                >
                  Send
                  <i className="material-icons right">send</i>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ChatBox;
