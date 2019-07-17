import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import "./style.css";

const GoalCard = props => {
  const [, setGoals] = useState([]);

  useEffect(() => {
    setGoals(props.incompleteGoals);
  });

  const makeid = l => {
    let text = "";
    let char_list =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < l; i++) {
      text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return text;
  };

  const renderGoalsForCategories = category => {
    const result = props.incompleteGoals.filter(
      goal => goal.category === category
    );
    return result.map(goal => (
      <li key={goal.id}>
        <div className="goal-color card-panel grey lighten-4 dark-text">
          <div className="goal-due-alert">
            <i className="material-icons">error</i>
          </div>
          <Link to="/goals" className="truncate goal-card-name">
            {goal.name}
          </Link>
          <p>Due: {goal.dueDate}</p>
          {/* <Modal
            style={{ marginRight: "20px" }}
            className="modal-trigger"
            btnName="Edit"
            header="Edit"
            text="Edit Goal"
            dataTarget={`editGoal_${goal.id}`}
            action="Save Changes"
            goalId={goal.id}
            goalName={goal.name}
            goalCategory={goal.category}
            goalDueDate={goal.dueDate}
            getAllData={props.getAllData}
          />
          <Modal
            className="modal-trigger material-icons"
            btnName="delete"
            header="Delete"
            text="Are you sure you want to delete this goal?"
            dataTarget={`deleteGoal_${goal.id}`}
            action="Yes, I'm sure"
            goalId={goal.id}
            getAllData={props.getAllData}
          /> */}
        </div>
      </li>
    ));
  };

  return (
    <>
      <div className="col l4 s12">
        <div className="card goalCard">
          <div className="card-title center-align">
            <span>{props.category}</span>
            <Modal
              style={{
                marginRight: "5px",
                color: "#d4ac0d",
                fontSize: "35px"
              }}
              className="material-icons modal-trigger right"
              btnName={"add_circle"}
              header="AddNew"
              text="Complete this form"
              dataTarget={`newGoalFromCard_${makeid(5)}`}
              action="Add"
              userID={props.userID}
              getAllData={props.getAllData}
              goalCategory={props.category}
            />
          </div>
          <div className="goal-card-content card-scrollable-content">
            <ul>{renderGoalsForCategories(props.category)}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalCard;
