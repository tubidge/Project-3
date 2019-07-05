import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import API from "../../utils/API";

import "./style.css";

const GoalCard = props => {
  const [deletedGoal, setDeletedGoal] = useState("");

  useEffect(() => {}, []);

  const deleteGoal = id => {
    API.deleteGoal(id).then(res => {
      setDeletedGoal(res.data);
      console.log(deletedGoal);
    });
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
          <Modal
            className="btn red modal-trigger"
            btnName="X"
            header="Delete"
            text="Are you sure you want to delete this goal?"
            dataTarget={"deleteGoal"}
            action="Yes, I'm sure"
            goalId={goal.id}
          />
        </div>
      </li>
    ));
  };

  return (
    <>
      <div className="col l4 s12">
        <div className="card">
          <div className="card-content">
            <div className="card-title">{props.category}</div>
            <Modal
              className="btn modal-trigger green"
              btnName="Add Goal"
              header="Add a New Goal"
              text="Complete this form"
              dataTarget={"newGoalFromCard"}
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
