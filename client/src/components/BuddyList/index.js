import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ChatButton from "../ChatButton";
import Loading from "../Loading";
import M from "materialize-css";
import API from "../../utils/API";
import DeleteBuddyModal from "../DeleteBuddyModal";
import "./style.css";

const BuddyList = props => {
  const [buddies] = useState(props.buddies);
  const [isLoading, setLoading] = useState(true);
  const [buddyGoals, setBuddyGoals] = useState([]);

  useEffect(() => {
    configChannels();
    getBuddyGoals();
  }, []);

  useEffect(() => {
    M.AutoInit();
    let collapsible = document.querySelectorAll(".collapsible");
    M.Collapsible.init(collapsible);
  });

  const getBuddyGoals = () => {
    API.getBuddyComponent(props.userID).then(res => {
      console.log(res.data.buddies);
      setBuddyGoals(res.data.buddies);
      setLoading(false);
    });
  };

  const deleteBuddy = id => {
    API.deleteBuddy(id).then(res => {
      props.getAllData(props.userEmail);
      getBuddyGoals(props.userID);
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

  const getUnique = (arr, comp) => {
    const unique = arr
      .map(e => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e])
      .map(e => arr[e]);
    return unique;
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <section className="buddyList">
        <ul className="collapsible expandable">
          {buddyGoals &&
            getUnique(buddyGoals, "username").map(buddy => (
              <li key={buddy.id}>
                <div className="collapsible-header">
                  <div className="col s3">
                    <img
                      src={buddy.image}
                      alt={buddy.username}
                      className="circle responsive-img buddyProfileImg"
                    />
                  </div>
                  <div className="col s7 left-align">
                    <Link
                      to={`/buddy-profile/${buddy.id}`}
                      className="username"
                    >
                      {buddy.username}
                    </Link>
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
                  <div key={buddy.id}>
                    {buddy.joinedGoals.map(goal => (
                      <div key={goal.id}>
                        <DeleteBuddyModal
                          btnName="x"
                          className="right deleteBuddyModal deleteBuddy modal-trigger btn-blue btn btn-small"
                          dataTarget={`deleteBuddy_${goal.id}`}
                          deleteBuddy={deleteBuddy}
                          id={goal.id}
                          endDate={goal.endDate}
                        />
                        <span className="buddyGoalName brandedText truncate">
                          {goal.buddyGoalName}
                        </span>
                        <br />
                        <span className="userGoalName">
                          {goal.userGoalName}
                        </span>
                      </div>
                    ))}
                  </div>
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
