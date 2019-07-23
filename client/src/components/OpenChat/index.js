import React from "react";
// import ChatButton from "../ChatButton";
import BuddyList from "../BuddyList";

function OpenChat(props) {
  if (props.isConfigured) {
    let channels = props.channels;
    return (
      <div>
        <BuddyList
          myBuddies={props.myBuddies}
          userEmail={props.userEmail}
          userID={props.userID}
          makeid={props.makeid}
          allBuddies={props.allBuddies}
          buddies={props.buddies}
          channels={channels}
          emails={props.buddiesEmail}
          openChannel={props.openChannel}
        />
      </div>
    );
  } else {
    return null;
  }
}
export default OpenChat;
