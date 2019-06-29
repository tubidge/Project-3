import React, { useState, useEffect } from "react";
import * as SendBird from "sendbird";

function useChannel(props) {
  console.log(props);
  const [channel, setChannel] = useState();

  useEffect(() => {
    console.log(props);
    let userIds = [];

    userIds.push(props.user);
    userIds.push(props.buddy);
    console.log(userIds);
    props.sb.GroupChannel.createChannelWithUserIds(userIds, false, function(
      groupChannel,
      error
    ) {
      if (error) {
        return;
      }
      console.log(groupChannel);
      setChannel(groupChannel);
    });
  }, []);

  return channel;
}

export default useChannel;
