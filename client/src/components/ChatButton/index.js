import React from "react";

function ChatButton(props) {
  return (
    <>
      <button
        key={props.channel}
        id={props.channel}
        type="button"
        className="btn btn-outline-success"
        onClick={event => {
          event.preventDefault();
          props.openChannel(props.channel);
        }}
      >
        {props.user}
      </button>
    </>
  );
}

export default ChatButton;
