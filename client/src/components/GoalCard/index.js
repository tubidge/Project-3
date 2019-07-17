import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import "./style.css";
import moment from "moment";
import ProgressBar from "../ProgressBar";

const GoalCard = props => {
  const [goal, setGoals] = useState([]);

  useEffect(() => {
    setGoals(props.incompleteGoals);
    console.log(goal);
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
    const due = moment()
      .add(3, "days")
      .format("YYYY-MM-DD");

    const result = props.incompleteGoals.filter(
      goal => goal.category === category
    );

    return result.map(goal => {
      console.log(goal);
      console.log(due);
      let total =
        goal.milestones.completed.length + goal.milestones.incomplete.length;
      console.log(total);
      let progress = goal.milestones.completed.length;
      let percentage = progress / total;
      console.log(percentage);
      if (moment(goal.dueDate).isAfter(due)) {
        return (
          <li key={goal.id}>
            <div className="card-panel grey lighten-4 dark-text">
              <Link to="/goals" className="truncate goal-card-name">
                {goal.name}
              </Link>
              <p>Due: {goal.dueDate}</p>
              <ProgressBar total={total} percentage={percentage} />
            </div>
          </li>
        );
      } else {
        return (
          <li key={goal.id}>
            <div className="card-panel grey lighten-4 dark-text">
              <div className="goal-due-alert">
                <i className="material-icons">error</i>
              </div>
              <Link to="/goals" className="truncate goal-card-name">
                {goal.name}
              </Link>
              <p>
                Due: <span className="alert-goal-dueDate">{goal.dueDate}</span>
              </p>
              <ProgressBar total={total} percentage={percentage} />
            </div>
          </li>
        );
      }
    });
  };

  return (
    <>
      <div className="col l4 s12">
        <div className="card goalCard">
          <div className="card-title center-line">
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
          <div className="card-content card-scrollable-content">
            <ul>{renderGoalsForCategories(props.category)}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalCard;
