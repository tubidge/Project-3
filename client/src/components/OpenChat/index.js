import React from "react";
import BuddyList from "../BuddyList";

function OpenChat(props) {
  if (props.isConfigured) {
    let channels = props.channels;
    return (
      <div>
        <BuddyList
          getAllData={props.getAllData}
          userEmail={props.userEmail}
          userID={props.userID}
          makeid={props.makeid}
          buddies={props.buddies}
          buddiesUsername={props.buddiesUsername}
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
