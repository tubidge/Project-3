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
        <div className="card-panel grey lighten-4 dark-text">
          <Link to="/goals" className="truncate">
            {goal.name}
          </Link>
          <Modal
            className="modal-trigger material-icons"
            btnName="edit"
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
          />
          <Modal
            className="modal-trigger material-icons"
            btnName="check"
            header="Complete"
            text="Mark as complete?"
            dataTarget={`markComplete_${goal.id}`}
            action="Yes, I'm done!"
            goalId={goal.id}
            getAllData={props.getAllData}
          />
        </div>
      </li>
    ));
  };

  return (
    <>
      <div className="col l4 s12">
        <div className="card goalCard">
          <div className="card-content">
            <div className="card-title">
              <span>{props.category}</span>
              <Modal
                style={{
                  marginLeft: "7px",
                  color: "#ffc400",
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
              />
            </div>
            <ul>{renderGoalsForCategories(props.category)}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalCard;
