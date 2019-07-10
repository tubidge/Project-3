import React from "react";

const UserProfile = props => {
  return (
    <>
      <div className="profileSummary">
        <div className="row center-align">
          <div className="profileImageContainer">
            <img
              className="circle responsive-img z-depth-3 profilePicture"
              alt="Profile"
              src={props.userPicture}
            />
          </div>
          <div className="mt10">
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
        <hr />
        <div className="row center-align">
          <span>Completed 15/20 goals</span>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
