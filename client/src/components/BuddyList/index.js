import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ChatButton from "../ChatButton";
import Loading from "../Loading";
import M from "materialize-css";
import "./style.css";
import API from "../../utils/API";
import { DeleteBuddyModal } from "../DeleteBuddyModal";

const BuddyList = props => {
  const [buddies] = useState(props.buddies);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    configChannels();
    setLoading(false);
  }, []);

  useEffect(() => {
    M.AutoInit();
    let collapsible = document.querySelectorAll(".collapsible");
    M.Collapsible.init(collapsible);
  });

  const deleteBuddy = id => {
    API.deleteBuddy(id).then(res => {
      props.getAllData(props.userEmail);
      console.log(res);
    });
  };

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

  if (isLoading) return <Loading />;

  return (
    <>
      <section className="buddyList">
        <ul className="collapsible expandable">
          {props.buddies &&
            props.buddiesUsername.map(buddy => (
              <li key={buddy.id}>
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
                    <Link
                      to={`/buddy-profile/${buddy.buddyId}`}
                      className="username"
                    >
                      {buddy.username}
                    </Link>
                    <DeleteBuddyModal
                      className="deleteBuddyModal deleteBuddy modal-trigger"
                      dataTarget={`deleteBuddy_${buddy.id}`}
                      deleteBuddy={deleteBuddy}
                      id={buddy.id}
                    />
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
