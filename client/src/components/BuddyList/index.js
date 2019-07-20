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
        <ul className="w3-ul w3-card-4">
          {buddies &&
            buddies.map(buddy => (
              <li key={props.makeid(5)} className="w3-bar">
                <span className="w3-right">
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
                  className="w3-bar-item w3-circle"
                  style={{ width: "85px" }}
                />
                <div className="w3-bar-item">
                  <Link to={`/buddy-profile/${buddy.buddyId}`}>
                    {buddy.username}
                  </Link>
                  <br />
                  {buddy.buddyGoal}
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
