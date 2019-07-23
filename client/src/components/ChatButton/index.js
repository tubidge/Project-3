import React from "react";

function ChatButton(props) {
  return (
    <>
      <span
        key={props.channel}
        id={props.channel}
        onClick={event => {
          event.preventDefault();
          props.openChannel(props.channel);
        }}
      >
        <i id="chatIcon" className="material-icons">
          message
        </i>
      </span>
    </>
  );
}

export default ChatButton;
