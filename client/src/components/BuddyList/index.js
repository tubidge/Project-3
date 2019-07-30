import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ChatButton from "../ChatButton";
import Loading from "../Loading";
import M from "materialize-css";
import "./style.css";

const BuddyList = props => {
  const [buddies] = useState(props.buddies);
  const [isLoading, setLoading] = useState(true);
  const [joinedGoals, setJoinedGoals] = useState([]);

  const temp = [];

  useEffect(() => {
    getJoinedGoals();
    setLoading(false);
  }, []);

  useEffect(() => {
    configChannels();
  }, []);

  useEffect(() => {
    M.AutoInit();
    let collapsible = document.querySelectorAll(".collapsible");
    M.Collapsible.init(collapsible);
  }, []);

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

  const getJoinedGoals = () => {
    props.buddiesUsername.map(buddy => {
      buddies.map(index => {
        if (index.username === buddy.username) {
          temp.push({
            username: index.username,
            id: index.buddyId,
            buddyGoal: index.buddyGoal,
            userGoal: index.userGoal
          });
        }
      });
    });
    setJoinedGoals(temp);
    setLoading(false);
  };

  if (isLoading) return <Loading />;

  return (
    // <animated.div style={fade}>
    //   <section className="buddyList">
    //     <ul className="collection">
    //       {buddies &&
    //         props.buddiesUsername.map(buddy => (
    //           <li key={buddy.buddyId} className="collection-item avatar">
    //             <img
    //               src={buddy.image}
    //               alt={buddy.username}
    //               className="circle"
    //             />
    //             <span>
    //               <Link to={`/buddy-profile/${buddy.buddyId}`}>
    //                 {buddy.username}
    //               </Link>
    //             </span>
    //             <div>
    //               <p>{getJoinedGoals(buddy.username)}</p>
    //             </div>
    //             <Link to="#" className="secondary-content">
    //               <ChatButton
    //                 key={buddy.buddyId}
    //                 openChannel={props.openChannel}
    //                 channel={buddy.channel}
    //                 user={buddy.email}
    //                 username={buddy.username}
    //               />
    //             </Link>
    //           </li>
    //         ))}
    //       {!props.buddies && null}
    //     </ul>
    //   </section>
    // </animated.div>
    <>
      <section className="buddyList">
        <ul className="collapsible expandable">
          {props.buddiesUsername &&
            props.buddiesUsername.map(buddy => (
              <li key={buddy.buddyId}>
                <div className="collapsible-header">
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
                <div className="collapsible-body">
                  {joinedGoals.map(index =>
                    index.username === buddy.username ? (
                      <div key={`${index.buddyId}_${props.makeid(5)}`}>
                        <p className="truncate brandedText buddyGoal">
                          {index.buddyGoal}
                        </p>
                        <span className="userGoal">{index.userGoal}</span>
                      </div>
                    ) : null
                  )}
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
