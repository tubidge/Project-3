import React from "react";
import ChatButton from "../ChatButton";

function OpenChat(props) {
  if (props.isConfigured) {
    let channels = props.channels;

    return (
      <div>
        <ul>
          {channels.map(index => (
            <ChatButton
              key={index.connection}
              openChannel={props.openChannel}
              channel={index.connection}
              user={index.user}
            />
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
}

export default OpenChat;
