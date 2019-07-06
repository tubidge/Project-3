import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import "./style.css";

const GoalCard = props => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    setGoals(props.incompleteGoals);
    console.log(goals);
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
        <div className="card-panel teal">
          <span data-target={goal.id} className="white-text modal-trigger">
            {goal.name}
          </span>
          <br />
          <Modal
            className="btn red modal-trigger"
            btnName="X"
            header="Delete"
            text="Are you sure you want to delete this goal?"
            dataTarget={`deleteGoal_${goal.id}`}
            action="Yes, I'm sure"
            goalId={goal.id}
            getAllData={props.getAllData}
          />
          <Modal
            className="btn black modal-trigger"
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
        </div>
      </li>
    ));
  };

  return (
    <>
      <div className="col l4 s12">
        <div className="card goalCard">
          <div className="card-content">
            <div className="card-title">{props.category}</div>
            <Modal
              className="btn modal-trigger green"
              btnName="Add Goal"
              header="Add a New Goal"
              text="Complete this form"
              dataTarget={`newGoalFromCard_${makeid(5)}`}
              action="Add"
              userID={props.userID}
            />
            <ul>{renderGoalsForCategories(props.category)}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalCard;
