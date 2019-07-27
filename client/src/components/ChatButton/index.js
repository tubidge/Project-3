import React from "react";
import "./style.css";

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
        <i className="material-icons icon_Chat">message</i>
      </span>
    </>
  );
}

export default ChatButton;
