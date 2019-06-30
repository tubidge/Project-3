import React from "react";
import ChatButton from "../ChatButton";

function OpenChat(props) {
  console.log(props);
  if (!props.isConfigured) {
    return null;
  } else {
    return (
      <>
        {props.channels.forEach(index => {
          console.log(index);
          console.log(ChatButton);
          return (
            <ChatButton getConnection={props.getConnection} channel={index} />
          );
        })}
      </>
    );
  }
}

export default OpenChat;
