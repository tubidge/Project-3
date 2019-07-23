import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import JoinGoalModal from "../JoinGoalModal";
import M from "materialize-css";
import API from "../../utils/API";
import "./style.css";

const BuddyGoalCard = props => {
  const slideDown = useSpring({
    from: {
      marginTop: -1000
    },
    to: {
      marginTop: 0
    }
  });

  const renderFollowBtn = (id, name) => {
    let ids = [];
    props.following.forEach(index => {
      ids.push(index.id);
    });

    if (ids.includes(id)) {
      return (
        <button
          onClick={() => follow(id, name)}
          className="btn followBtn_BuddyCard"
        >
          <i className="material-icons left followIcon">directions_run</i>
          Unfollow
        </button>
      );
    } else {
      return (
        <button
          onClick={() => follow(id, name)}
          className="btn followBtn_BuddyCard"
        >
          <i className="material-icons left followIcon">directions_run</i>
          Follow
        </button>
      );
    }
  };

  const follow = (id, name) => {
    API.addFollower({
      follower: props.userId,
      GoalId: id
    }).then(res => {
      if (res) {
        M.toast({ html: `Following '${name}'` });
      }
    });
  };

  const unFollow = id => {
    API.deleteFollower(id).then(res => {
      console.log(res);
    });
  };

  const makeid = l => {
    let text = "";
    let char_list =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < l; i++) {
      text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return text;
  };

  return (
    <animated.div style={slideDown}>
      {props.incompleteGoals.map(goal => (
        <div id="buddyGoalCard" key={goal.id} className="col l4 s12">
          <div className="card rounded">
            <div className="card-content">
              <div className="card-title">{goal.name}</div>
              <p>Category: {goal.category}</p>
              <p>Due Date: {goal.dueDate}</p>
              <div className="card-action buddyCardBtnDiv">
                <JoinGoalModal
                  className="modal-trigger joinGoalBtn btn"
                  btnName={"Join goal"}
                  dataTarget={`joinGoal_${goal.id}`}
                  currentUserGoals={props.currentUserGoals}
                  addBuddy={props.addBuddy}
                  buddyName={props.buddyName}
                  userId={props.userId}
                  buddyGoalName={goal.name}
                  buddyId={props.buddyId}
                  buddyGoalId={goal.id}
                />
                {renderFollowBtn(goal.id, goal.name)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </animated.div>
  );
};

export default BuddyGoalCard;
