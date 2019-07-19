import React from "react";
import JoinGoalModal from "../JoinGoalModal";
import "./style.css";

const BuddyGoalCard = props => {
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
    <>
      {props.incompleteGoals.map(goal => (
        <div id="buddyGoalCard" key={goal.id} className="col l4 s12">
          <div className="card">
            <div className="card-content">
              <div className="card-title">{goal.name}</div>
              <div className="goalSummary">
                <p>Category: {goal.category}</p>
                <p>Due Date: {goal.dueDate}</p>
              </div>
              <JoinGoalModal
                className="modal-trigger material-icons"
                btnName={"add_circle"}
                dataTarget={`joinGoal_${goal.id}}`}
                currentUserGoals={props.currentUserGoals}
                addBuddy={props.addBuddy}
                buddyName={props.buddyName}
                userId={props.userId}
                buddyGoalName={goal.name}
                buddyId={props.buddyId}
                buddyGoalId={goal.id}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BuddyGoalCard;
