import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import moment from "moment";
import API from "../../utils/API";
import ProgressBar from "../ProgressBar";
import M from "materialize-css";
import "./style.css";

const GoalCard = props => {
  const [goals, setGoals] = useState([]);
  const [reRender, setreRender] = useState(false);

  useEffect(() => {
    M.AutoInit();
    API.getAllGoals(props.userID).then(resp => {
      console.log(resp.data);
      setGoals(resp.data.currentGoals);
    });
  }, [reRender]);

  const generateIcon = () => {
    switch (props.category) {
      case "Fitness":
        return "fitness_center";
      case "Education":
        return "school";
      case "Wellness":
        return "favorite_border";
      case "Financial":
        return "attach_money";
      case "Travel":
        return "airplanemode_active";
      default:
        return null;
    }
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

  const orderRender = () => {
    setreRender(!reRender);
  };

  const sortDates = (date1, date2) => {
    if (date1.dueDate > date2.dueDate) return 1;
    if (date1.dueDate < date2.dueDate) return -1;
    return 0;
  };

  const completeGoal = id => {
    let data = {
      colName: "complete",
      info: true
    };
    API.editGoal(id, data).then(resp => {
      setreRender(!reRender);
      props.renderCal();
    });
  };

  const renderPropsForCategories = category => {
    const due = moment()
      .add(3, "days")
      .format("MM/DD/YYYY");
    const result = props.incompleteGoals.filter(
      goal => goal.category === category
    );
    result.sort(sortDates);

    return result.map(goal => {
      let total =
        goal.milestones.completed.length + goal.milestones.incomplete.length;
      let progress = goal.milestones.completed.length;
      let percentage = progress / total;
      if (moment(goal.dueDate).isAfter(due)) {
        return (
          <li key={goal.id}>
            <div className="card-panel grey lighten-4 dark-text">
              <div className="goal-card-header">
                <Link to="/goals" className="truncate goal-card-name">
                  {goal.name}
                </Link>
                {percentage === 1 ? (
                  <i
                    class="material-icons"
                    style={{
                      color: "#daae37",
                      cursor: "pointer",
                      transform: "scale(1.1)"
                    }}
                    onClick={() => completeGoal(goal.id)}
                  >
                    check_box
                  </i>
                ) : (
                  ""
                )}
              </div>
              <p>Due: {moment(goal.dueDate).format("MM/DD/YYYY")}</p>
              <ProgressBar total={total} percentage={percentage} />
            </div>
          </li>
        );
      } else {
        return (
          <li key={goal.id}>
            <div className="card-panel grey lighten-4 dark-text">
              <div className="goal-card-header">
                <Link to="/goals" className="truncate goal-card-name">
                  {goal.name}
                </Link>
                {percentage === 1 ? (
                  <i
                    class="material-icons"
                    style={{
                      color: "#daae37",
                      cursor: "pointer",
                      transform: "scale(1.1)"
                    }}
                    onClick={() => completeGoal(goal.id)}
                  >
                    check_box
                  </i>
                ) : (
                  ""
                )}
              </div>
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

  const renderGoalsForCategories = category => {
    const due = moment()
      .add(3, "days")
      .format("YYYY-MM-DD");

    const result = goals.incomplete.filter(goal => goal.category === category);
    result.sort(sortDates);

    return result.map(goal => {
      let total =
        goal.milestones.completed.length + goal.milestones.incomplete.length;
      let progress = goal.milestones.completed.length;
      let percentage = progress / total;
      if (moment(goal.dueDate).isAfter(due)) {
        return (
          <li key={goal.id}>
            <div className="card-panel grey lighten-4 dark-text">
              {goal.buddy.current.length > 0
                ? goal.buddy.current.map(buddy => (
                    <i
                      key={buddy}
                      style={{ color: "var(--blue)", marginTop: "5px" }}
                      className="material-icons right"
                    >
                      person_pin
                    </i>
                  ))
                : null}
              <div className="goal-card-header">
                <Link to="/goals" className="truncate goal-card-name">
                  {goal.name}
                </Link>

                {percentage === 1 ? (
                  <i
                    class="material-icons"
                    style={{
                      color: "#daae37",
                      cursor: "pointer",
                      transform: "scale(1.1)"
                    }}
                    onClick={() => completeGoal(goal.id)}
                  >
                    check_box
                  </i>
                ) : (
                  ""
                )}
              </div>
              <p>Due: {moment(goal.dueDate).format("MM/DD/YYYY")}</p>
              <ProgressBar total={total} percentage={percentage} />
            </div>
          </li>
        );
      } else {
        return (
          <li key={goal.id}>
            <div className="card-panel grey lighten-4 dark-text">
              <div className="goal-card-header">
                <Link to="/goals" className="truncate goal-card-name">
                  {goal.name}
                </Link>
                {percentage === 1 ? (
                  <i
                    class="material-icons"
                    style={{
                      color: "#daae37",
                      cursor: "pointer",
                      transform: "scale(1.1)"
                    }}
                    onClick={() => completeGoal(goal.id)}
                  >
                    check_box
                  </i>
                ) : (
                  ""
                )}
              </div>
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
    <div className="col l4 s12">
      <div className="card goalCard">
        <div className="card-title goalCardTitle">
          <span className="category-title">
            {props.category}
            <i className="material-icons categoryIcon">{generateIcon()}</i>
          </span>
          <Modal
            className="goalCardModal material-icons modal-trigger right tooltipped"
            btnName={"add_circle"}
            header="Add a New Goal"
            dataTarget={`newGoalFromCard_${makeid(5)}`}
            action="Add"
            userID={props.userID}
            goalCategory={props.category}
            orderRender={orderRender}
            dataPosition="top"
            dataTooltip="Add a goal to this category"
          />
        </div>
        <div className="card-content card-scrollable-content">
          {goals.incomplete ? (
            <ul>{renderGoalsForCategories(props.category)}</ul>
          ) : (
            <ul>{renderPropsForCategories(props.category)}</ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
