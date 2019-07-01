import React from "react";
import ChatButton from "../ChatButton";

function OpenChat(props) {
  console.log(props);
  if (props.isConfigured) {
    let channels = props.channels;
    console.log(channels);
    return (
      <div>
        <ul>
          {channels.map(index => (
            <ChatButton
              key={index}
              Messenger={props.Messenger}
              channel={index}
            />
          ))}
        </ul>
      </div>
    );
  } else {
    return <div>Hello</div>;
  }
}

export default OpenChat;
