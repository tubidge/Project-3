import React from "react";
import JoinModal from "../JoinGoalModal";
import "./style.css";

const BuddyGoalCard = props => {
  return (
    <>
      {props.incompleteGoals.map(goal => (
        <div id="buddyGoalCard" key={goal.id} className="col l4 s12">
          <div className="card">
            <div className="card-content">
              <div className="card-title">{goal.name}</div>
              <p>{goal.dueDate}</p>
              <p>{goal.category}</p>
              <button onClick={props.addBuddy} className="btn">
                Join
              </button>
              <button className="btn">Follow</button>
              <JoinModal />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BuddyGoalCard;
