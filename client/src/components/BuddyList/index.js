import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";
import ChatButton from "../ChatButton";

const BuddyList = props => {
  const [buddies] = useState(props.allBuddies);
  const fade = useSpring({
    from: {
      opacity: 0
    },
    opacity: 1
  });

  useEffect(() => {
    configChannels();
    // console.log(props.channels);
  }, []);

  const configChannels = () => {
    props.channels.forEach(index => {
      let channel = index;
      // console.log(channel);
      buddies.forEach(index => {
        if (index.email === channel.user) {
          return index.channel === channel;
        }
      });
    });
  };

  const getJoinedGoals = username => {
    return props.allBuddies
      .filter(index => index.username === username)
      .map(index => (
        <span key={`${index.buddyId}_${props.makeid(5)}`}>
          <span className="buddyInfo truncate">{index.buddyGoal}</span>
          <i className="tiny material-icons">call_missed_outgoing</i>
          <span className="userGoal">{index.userGoal}</span>
        </span>
      ));
  };

  return (
    <animated.div style={fade}>
      <section id="buddiesList">
        <ul className="collection">
          {buddies &&
            props.buddies.map(buddy => (
              <li key={buddy.buddyId} className="collection-item avatar">
                <img
                  src={buddy.image}
                  alt={buddy.username}
                  className="circle"
                />
                <span className="title">
                  <Link to={`/buddy-profile/${buddy.buddyId}`}>
                    {buddy.username}
                  </Link>
                </span>
                <div id="buddyGoal">
                  <p>{getJoinedGoals(buddy.username)}</p>
                </div>
                <Link to="#" className="secondary-content">
                  <ChatButton
                    key={buddy.buddyId}
                    openChannel={props.openChannel}
                    channel={buddy.channel}
                    user={buddy.email}
                    username={buddy.username}
                  />
                </Link>
              </li>
            ))}
          {!props.buddies && null}
        </ul>
      </section>
    </animated.div>
  );
};

export default BuddyList;
