import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ChatButton from "../ChatButton";
import Loading from "../Loading";
import M from "materialize-css";
import "./style.css";

const BuddyList = props => {
  const [buddies] = useState(props.buddies);
  const [isLoading, setLoading] = useState(true);
  // const [, setJoinedGoals] = useState([]);
  // const [showJoinedGoals, setShowJoinedGoals] = useState(false);

  // const temp = [];

  useEffect(() => {
    configChannels();
    setLoading(false);
  }, []);

  useEffect(() => {
    M.AutoInit();
    let collapsible = document.querySelectorAll(".collapsible");
    M.Collapsible.init(collapsible);
  });

  const configChannels = () => {
    props.channels.forEach(index => {
      let channel = index;
      buddies.forEach(index => {
        if (index.email === channel.user) {
          return index.channel === channel;
        }
      });
    });
  };

  // const getJoinedGoals = username => {
  //   buddies.map(index => {
  //     if (index.username === username) {
  //       temp.push({
  //         username: index.username,
  //         id: index.buddyId,
  //         buddyGoal: index.buddyGoal,
  //         userGoal: index.userGoal
  //       });
  //     }
  //   });
  //   console.log(temp);
  //   setShowJoinedGoals(!showJoinedGoals);
  //   return setJoinedGoals(temp);
  // };

  if (isLoading) return <Loading />;

  return (
    <>
      <section className="buddyList">
        <ul className="collapsible expandable">
          {props.buddies &&
            props.buddiesUsername.map(buddy => (
              <li key={buddy.buddyId}>
                <div
                  style={{ cursor: "default" }}
                  className="collapsible-header"
                >
                  <div className="col s3">
                    <img
                      src={buddy.image}
                      alt={buddy.username}
                      className="circle responsive-img buddyProfileImg"
                    />
                  </div>
                  <div className="col s7 left-align">
                    <span>
                      <Link
                        to={`/buddy-profile/${buddy.buddyId}`}
                        className="username"
                      >
                        {buddy.username}
                      </Link>
                    </span>
                  </div>
                  <div className="col s2">
                    <span>
                      <Link to="#" className="chatBtn">
                        <ChatButton
                          key={buddy.buddyId}
                          openChannel={props.openChannel}
                          channel={buddy.channel}
                          user={buddy.email}
                          username={buddy.username}
                        />
                      </Link>
                    </span>
                  </div>
                </div>
                {/* <div className="collapsible-body">
                  <Link to="#" onClick={() => getJoinedGoals(buddy.username)}>
                    {!showJoinedGoals ? "See Goals" : "Hide Goals"}
                  </Link>
                  {showJoinedGoals
                    ? joinedGoals.map(index => (
                        <div key={index.userGoal}>{index.buddyGoal}</div>
                      ))
                    : null}
                </div> */}
              </li>
            ))}
          {!props.buddies && null}
        </ul>
      </section>
    </>
  );
};

export default BuddyList;
