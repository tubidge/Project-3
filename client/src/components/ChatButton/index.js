import React from "react";

function ChatButton(props) {
  console.log(props);
  return (
    <button
      key={props.channel}
      id={props.channel}
      type="button"
      className="btn btn-outline-success"
      onClick={function(event) {
        event.preventDefault();
        props.Messenger.getChannel(props.channel);
      }}
    >
      chat button
    </button>
  );
}

export default ChatButton;
