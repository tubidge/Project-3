import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import moment from "moment";
import API from "../../utils/API";
import ProgressBar from "../ProgressBar";
import "./style.css";

const GoalCard = props => {
  const [goals, setGoals] = useState([]);
  const [reRender, setreRender] = useState(false);

  useEffect(() => {
    API.getAllGoals(props.userID).then(resp => {
      // console.log(resp);
      setGoals(resp.data.currentGoals);
    });
  }, [reRender]);

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
    // console.log(id);
    // console.log("running");
    API.editGoal(id, data).then(resp => {
      // console.log(resp);
      setreRender(!reRender);
      props.renderCal();
    });
  };

  const renderPropsForCategories = category => {
    const due = moment()
      .add(3, "days")
      .format("YYYY-MM-DD");
    // console.log(props.incompleteGoals);
    const result = props.incompleteGoals.filter(
      goal => goal.category === category
    );

    // console.log(result);
    result.sort(sortDates);
    // console.log(result);

    return result.map(goal => {
      // console.log(goal);
      // console.log(due);
      let total =
        goal.milestones.completed.length + goal.milestones.incomplete.length;
      // console.log(total);
      let progress = goal.milestones.completed.length;
      let percentage = progress / total;
      // console.log(percentage);
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
                      color: "#d4ac0d",
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
              <p>Due: {goal.dueDate}</p>
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
                      color: "#d4ac0d",
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

    // console.log(result);
    result.sort(sortDates);
    // console.log(result);

    return result.map(goal => {
      // console.log(goal);
      // console.log(due);
      let total =
        goal.milestones.completed.length + goal.milestones.incomplete.length;
      // console.log(total);
      let progress = goal.milestones.completed.length;
      let percentage = progress / total;
      // console.log(percentage);
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
                      color: "#d4ac0d",
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
              <p>Due: {goal.dueDate}</p>
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
                      color: "#d4ac0d",
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
    <>
      <div className="col l4 s12">
        <div className="card goalCard">
          <div className="card-title">
            <span className="category-title">{props.category}</span>
            <Modal
              style={{
                marginRight: "5px",
                marginTop: "5px",
                color: "#d4ac0d",
                fontSize: "35px"
              }}
              className="material-icons modal-trigger right tooltipped"
              btnName={"add_circle"}
              header="AddNew"
              text="Complete this form"
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
    </>
  );
};

export default GoalCard;
