import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";
import ChatButton from "../ChatButton";

const BuddyList = props => {
  const [buddies, setBuddies] = useState(props.buddies);

  const getUnique = (arr, comp) => {
    const unique = arr
      .map(e => e[comp])
      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])
      .map(e => arr[e]);
    return unique;
  };

  useEffect(() => {
    console.log("======================================");
    console.log(props.buddies);
    console.log(props.channels);
    configChannels();
  }, []);

  const configChannels = () => {
    props.channels.forEach(index => {
      let channel = index;
      console.log(channel);
      buddies.forEach(index => {
        if (index.email === channel.user) {
          return index.channel === channel;
        }
      });
    });
    console.log("BUDDIES=========================");
    console.log(buddies);
  };

  return (
    <>
      <section id="buddiesList">
        <Link
          to={{
            pathname: "/buddies",
            state: {
              user: props.userEmail
            }
          }}
          className="link"
        >
          Find Buddies
        </Link>
        <ul class="w3-ul w3-card-4">
          {buddies &&
            buddies.map(buddy => (
              <li key={props.makeid(5)} className="w3-bar">
                <span class="w3-right">
                  <ChatButton
                    key={buddy.channel}
                    openChannel={props.openChannel}
                    channel={buddy.channel}
                    user={buddy.email}
                    username={buddy.username}
                  />
                </span>

                <img
                  src={buddy.image}
                  class="w3-bar-item w3-circle"
                  style={{ width: "85px" }}
                />
                <div class="w3-bar-item">
                  <Link to={`/buddy-profile/${buddy.buddyId}`}>
                    {buddy.username}
                  </Link>
                </div>
              </li>
            ))}
          {!props.buddies && null}
        </ul>
      </section>
    </>
  );
};

export default BuddyList;
