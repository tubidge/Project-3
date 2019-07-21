import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import "./style.css";

const UserProfile = props => {
  const fade = useSpring({
    from: {
      opacity: 0
    },
    opacity: 1
  });

  return (
    <animated.div style={fade}>
      <div className="profileSummary">
        <div className="row center-align">
          <div className="profileImageContainer">
            <img
              className="circle responsive-img z-depth-3"
              alt="Profile"
              src={props.userPicture}
            />
          </div>
          {!props.buddyProfile && <Link to="/profile">Edit Picture</Link>}
          <div>
            {props.username}
            <br />
            {props.email}
          </div>
        </div>
        <div className="row center-align">
          <div className="col s6">
            <span className="mb10">Goals</span>
            <br />
            <span>{props.incompleteGoals.length}</span>
          </div>
          <div className="col s6">
            <span className="mb10">Buddies</span>
            <br />
            <span>{props.buddies ? props.buddies.length : "0"}</span>
          </div>
        </div>
        <hr style={{ width: "100%" }} />
        <div className="row center-align">
          <span>Completed 15/20 goals</span>
        </div>
      </div>
    </animated.div>
  );
};

export default UserProfile;
