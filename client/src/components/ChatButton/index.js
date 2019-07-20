import React from "react";
import { Link } from "react-router-dom";

function ChatButton(props) {
  return (
    <>
      <Link
        to="#"
        key={props.channel}
        id={props.channel}
        onClick={event => {
          event.preventDefault();
          props.openChannel(props.channel);
        }}
      >
        <i className="material-icons">message</i>
      </Link>
    </>
  );
}

export default ChatButton;
