import React from "react";

function ChatButton(props) {
  console.log(props);
  return (
    <>
      <button
        id={props.channel}
        type="button"
        className="btn btn-outline-success"
        onClick={() => {
          props.getConnection(props.channel);
        }}
      >
        chat button
      </button>
    </>
  );
}

export default ChatButton;
