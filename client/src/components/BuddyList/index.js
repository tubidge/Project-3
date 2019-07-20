import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";
import ChatButton from "../ChatButton";

const BuddyList = props => {
  const [buddies, setBuddies] = useState(props.buddies);

  useEffect(() => {
    getBuddyGoalData();
    // console.log(props.channels);
    configChannels();
  }, []);

  const getBuddyGoalData = () => {
    let temp = [];
    const goalIds = props.myBuddies.map(index => ({
      buddyGoalId: index.buddyGoal,
      userGoalId: index.goalId
    }));
    goalIds.map(index => {
      API.getGoal(index.buddyGoalId).then(res => {
        temp.push(res.data);
        console.log(temp);
      });
    });
  };

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
    <>
      <section id="buddiesList">
        <ul className="collection">
          {buddies &&
            buddies.map(buddy => (
              <li className="collection-item avatar">
                <img
                  src={buddy.image}
                  alt={buddy.username}
                  className="circle"
                />
                <span className="title">
                  {" "}
                  <Link to={`/buddy-profile/${buddy.buddyId}`}>
                    {buddy.username}
                  </Link>
                </span>
                <p>
                  <span className="buddyInfo">{buddy.buddyGoal}</span> <br />
                  Second Line
                </p>
                <Link to="#!" className="secondary-content">
                  <ChatButton
                    key={buddy.channel}
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
    </>
  );
};

export default BuddyList;
