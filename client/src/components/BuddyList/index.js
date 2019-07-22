import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";
import ChatButton from "../ChatButton";

const BuddyList = props => {
  // const [buddies, setBuddies] = useState(props.buddies);
  const [buddies, setBuddies] = useState(props.allBuddies);
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
                  <p>
                    {props.allBuddies
                      .filter(index => index.username === buddy.username)
                      .map(index => (
                        <>
                          <li key={index.buddyId}>
                            <span className="buddyInfo truncate">
                              {index.buddyGoal}
                            </span>
                            <i className="tiny material-icons">
                              call_missed_outgoing
                            </i>
                            <span className="userGoal">{index.userGoal}</span>
                          </li>
                        </>
                      ))}
                  </p>
                </div>
                <Link to="#" className="secondary-content">
                  <ChatButton
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
