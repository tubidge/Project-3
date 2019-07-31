import React, { useEffect, useState } from "react";
import "./style.css";
import ProgressBar from "../ProgressBar";
import moment from "moment";
import API from "../../utils/API";
import ConfirmModal from "../ConfirmModal";
import Modal from "../Modal";
import M from "materialize-css";

function GoalOverview(props) {
  const [currentGoals, setCurrentGoals] = useState();
  //   const [pastGoals, setPastGoals] = useState(props.pastGoals);
  const [pastView, setPastView] = useState([]);
  const [pastIndex, setPastIndex] = useState(0);
  const [, setSelectedGoal] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentView, setCurrentView] = useState();

  const [reRender, setreRender] = useState(false);
  const [search, setSearch] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  // const [confirmMessage, setConfirmMessage] = useState();
  // const [confirmType, setConfirmType] = useState();

  useEffect(() => {
    M.AutoInit();

    getData();
  }, [
    currentIndex,
    reRender,
    props.category,
    pastIndex,
    props.pastGoals.length
  ]);

  const getData = () => {
    API.getGoalCategory(props.userId, props.category).then(resp => {
      setCurrentGoals(resp.data.currentGoals);

      if (resp.data.currentGoals) {
        if (resp.data.currentGoals.length > 3) {
          let arr = [];
          for (var i = currentIndex; i < [currentIndex + 3]; i++) {
            if (i < 0) {
              let num = resp.data.currentGoals.length - 1;
              arr.push(resp.data.currentGoals[num]);
            } else if (i > resp.data.currentGoals.length - 1) {
              arr.push(
                resp.data.currentGoals[i - resp.data.currentGoals.length]
              );
            } else {
              arr.push(resp.data.currentGoals[i]);
            }
          }

          setCurrentView(arr);
        } else if (resp.data.currentGoals.length > 0) {
          setCurrentView(resp.data.currentGoals);
        } else {
          setCurrentView(false);
        }
      }

      if (props.pastGoals.length > 3) {
        let arr = [];
        for (var j = pastIndex; j < [pastIndex + 3]; j++) {
          if (j < 0) {
            let num = props.pastGoals.length - 1;
            arr.push(props.pastGoals[num]);
          } else if (j > props.pastGoals.length - 1) {
            arr.push(props.pastGoals[j - props.pastGoals.length]);
          } else {
            arr.push(props.pastGoals[j]);
          }
        }

        setPastView(arr);
      } else if (props.pastGoals.length) {
        setPastView(props.pastGoals);
      } else {
        setPastView(false);
      }

      //   console.log(">>>>>>>>>>>>>>>");
      //   console.log(props.category);
      //   console.log(resp.data.currentGoals);

      //   props.renderGoalsForCategory(props.category, resp.data.currentGoals);
    });
  };

  const next = () => {
    let add;

    let max = currentGoals.length - 1;
    // let num = currentGoals.length - 1;

    if (currentIndex < 0) {
      add = currentGoals.length - 2;
    } else {
      add = currentIndex - 1;
    }

    if (add > max) {
      add = 0;
    }

    setCurrentIndex(add);
  };

  const prev = () => {
    let sub;

    let max = currentGoals.length - 1;

    if (currentIndex < 0) {
      sub = currentGoals.length - 1;
    } else {
      sub = currentIndex + 1;
    }

    if (sub > max) {
      sub = 0;
    }

    setCurrentIndex(sub);
  };

  const pastNext = () => {
    let add;

    let max = props.pastGoals.length - 1;

    if (pastIndex < 0) {
      add = props.pastGoals.length - 2;
    } else {
      add = pastIndex - 1;
    }

    if (add > max) {
      add = 0;
    }

    setPastIndex(add);
  };

  const pastPrev = () => {
    let sub;

    let max = props.pastGoals.length - 1;

    if (pastIndex < 0) {
      sub = props.pastGoals.length - 1;
    } else {
      sub = pastIndex + 1;
    }

    if (sub > max) {
      sub = 0;
    }

    setPastIndex(sub);
  };

  const close = header => {
    if (header !== "cancel") {
      setreRender(!reRender);
      props.orderRender();
    } else {
      // setreRender(!reRender);

      setSelectedGoal(false);
    }
  };

  const orderRender = () => {
    setreRender(!reRender);
  };

  const searchDateRange = event => {
    event.preventDefault();
    let results = [];

    props.pastGoals.forEach(index => {
      if (
        moment(index.dueDate).isBefore(end) &&
        moment(index.dueDate).isAfter(start)
      ) {
        results.push(index);
      } else {
        return false;
      }
    });

    setPastView(results);
  };

  const searchGoal = event => {
    event.preventDefault();
    if (search && search !== "") {
      API.getGoalSearch(props.userId, search).then(resp => {
        setPastView(resp.data);
        document.getElementsByClassName("searchGoalBtn").value = "";
      });
    } else {
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

  const handleInput = event => {
    let name = event.target.name;
    let value = event.target.value;

    switch (name) {
      case "search":
        setSearch(value);
        break;
      case "startDate":
        setStart(value);
        break;
      case "endDate":
        setEnd(value);
        break;
      default:
        break;
    }
  };

  // const completeGoal = (id, name) => {
  //   setSelectedGoal(id);
  //   setConfirmMessage(`This will complete your goal journey for '${name}'`);
  //   setConfirmType("Complete");
  //   openConfirmModal();
  // };

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

  if (currentGoals) {
    return (
      <>
        {/* {modalOpen ? (
          <ConfirmModal
            goalId={selectedGoal}
            message={confirmMessage}
            type={confirmType}
            render={close}
          />
        ) : (
          ""
        )} */}
        <div className="row">
          <div className="col s12">
            <div id="goalOverview" className="card goal-overview-card">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Modal
                  className="addGoal_GoalPage material-icons modal-trigger right tooltipped"
                  btnName={"add_circle"}
                  header="Add a New Goal"
                  text="Complete this form"
                  dataTarget={`newGoalFromCard_${makeid(5)}`}
                  action="Add"
                  userID={props.userId}
                  goalCategory={props.category}
                  orderRender={orderRender}
                  dataPosition="top"
                  dataTooltip="Add a goal to this category"
                />

                <span className="date_GoalPage">
                  {moment().format("MM/DD/YYYY")}
                </span>
              </div>
              <div className="card-content">
                <div className="row">
                  <h3 className="center-align">
                    <span className="goalCategory_GoalPage">
                      {props.category} Goals
                    </span>
                  </h3>
                </div>

                <div id="currentGoal-row">
                  <div>
                    {currentGoals.length > 3 ? (
                      <i
                        className="material-icons arrows_GoalPage"
                        onClick={prev}
                      >
                        arrow_back
                      </i>
                    ) : null}
                  </div>
                  {currentView ? (
                    currentView.map(goal => {
                      return (
                        <>
                          <div className="white-text card overview-goal">
                            <div className="row">
                              <div className="col s6">
                                <i className="material-icons categoryIcon_GoalPage">
                                  {generateIcon()}
                                </i>
                              </div>
                              <div
                                className="col s6"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end"
                                }}
                              >
                                {/* <i
                                  className="material-icons delete_GoalPage"
                                  data-id={goal.id}
                                  onClick={() => deleteGoal(goal.id)}
                                >
                                  delete_forever
                                </i> */}

                                <ConfirmModal
                                  className="delete_GoalPage material-icons modal-trigger"
                                  btnName={"delete_forever"}
                                  dataTarget={`newGoalFromCard_${makeid(5)}`}
                                  goalId={goal.id}
                                  message={`This will delete ${
                                    goal.name
                                  } and any of it's milestones`}
                                  type="Delete Goal"
                                  render={close}
                                  orderRender={orderRender}
                                />
                              </div>
                            </div>
                            <div className="card-content">
                              <div className="card-title goalName_GoalPage">
                                {goal.name}
                              </div>
                              <p style={{ marginBottom: "4px" }}>Due</p>
                              <p className="dueDate_GoalPage">
                                <span>
                                  {moment(goal.dueDate).format("MM/DD/YYYY")}
                                </span>
                              </p>
                              <ProgressBar
                                header="goal-card"
                                total={
                                  goal.milestones.completed.length +
                                  goal.milestones.incomplete.length
                                }
                                percentage={
                                  goal.milestones.completed.length /
                                  [
                                    goal.milestones.completed.length +
                                      goal.milestones.incomplete.length
                                  ]
                                }
                              />

                              <i
                                className="material-icons viewGoalDetail_GoalPage"
                                onClick={() => props.renderGoalDetail(goal.id)}
                              >
                                exit_to_app
                              </i>
                              <div>
                                <ConfirmModal
                                  className="addGoal_GoalPage material-icons modal-trigger"
                                  btnName={"check_box"}
                                  dataTarget={`newGoalFromCard_${makeid(5)}`}
                                  goalId={goal.id}
                                  message={`This will complete your goal journey for '${
                                    goal.name
                                  }'`}
                                  type="Complete"
                                  render={close}
                                  orderRender={orderRender}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <h4>
                      You have no current {props.category.toLowerCase()} goals
                    </h4>
                  )}
                  <div>
                    {currentGoals.length > 3 ? (
                      <i
                        className="material-icons arrows_GoalPage"
                        onClick={next}
                      >
                        arrow_forward
                      </i>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <div className="card past-overview-card">
              <div className="card-content">
                <h3
                  style={{ marginTop: "10px", marginBottom: "20px" }}
                  className="center-align"
                >
                  <span className="goalCategory_GoalPage">Past Goals</span>
                </h3>
                <div className="row">
                  <form>
                    <div className="col s8 l4">
                      <div className="input-field">
                        <input
                          placeholder={`Search your previous goals`}
                          id="searchGoals"
                          type="search"
                          name="search"
                          onChange={handleInput}
                        />
                        <i className="material-icons">close</i>
                      </div>{" "}
                    </div>
                    <div className="col s1 l1">
                      <div className="input-field">
                        <div className="input-group-append">
                          <button
                            className="btn searchGoalBtn"
                            type="submit"
                            onClick={searchGoal}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col s6 offset-s1">
                      <div>
                        <div className="input-field col s5">
                          <input
                            id="goalStart"
                            name="startDate"
                            type="date"
                            className="validate"
                            placeholder=""
                            onChange={handleInput}
                          />
                          <label htmlFor="goalStart">Start Date</label>
                        </div>

                        <div className="input-field col s5">
                          <input
                            id="goalEnd"
                            name="endDate"
                            type="date"
                            className="validate"
                            onChange={handleInput}
                          />
                          <label htmlFor="goalEnd">End Date</label>
                        </div>
                        <div className="input-field col s2">
                          <div className="input-group-append">
                            <button
                              className="btn searchDatesBtn"
                              type="submit"
                              onClick={searchDateRange}
                            >
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div id="pastGoal-row">
                  <div>
                    {props.pastGoals.length > 3 ? (
                      <i
                        style={{ color: "#bbb" }}
                        className="material-icons arrows_GoalPage"
                        onClick={pastPrev}
                      >
                        arrow_back
                      </i>
                    ) : (
                      ""
                    )}
                  </div>
                  {pastView.length ? (
                    pastView.map(goal => {
                      return (
                        <div className="card overview-goal white-text">
                          <div className="row">
                            <div className="col s6">
                              <i
                                style={{ color: "#bbb" }}
                                className="material-icons categoryIcon_GoalPage"
                              >
                                {generateIcon()}
                              </i>
                            </div>
                            <div
                              className="col s6"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end"
                              }}
                            >
                              {/* <i
                                style={{ color: "#bbb" }}
                                className="material-icons delete_GoalPage"
                                data-id={goal.id}
                                onClick={() => deleteGoal(goal.id)}
                              >
                                delete_forever
                              </i> */}

                              <ConfirmModal
                                className="delete_GoalPage material-icons modal-trigger right tooltipped"
                                btnName={"delete_forever"}
                                dataTarget={`newGoalFromCard_${makeid(5)}`}
                                goalId={goal.id}
                                message={`This will delete ${
                                  goal.name
                                } and any of it's milestones`}
                                type="Delete Goal"
                                render={close}
                                orderRender={orderRender}
                              />
                            </div>
                          </div>
                          <div className="card-content">
                            <div
                              style={{ borderBottom: "1px dashed #bbb" }}
                              className="card-title"
                            >
                              {goal.name}
                            </div>
                            <p style={{ marginBottom: "4px" }}>
                              Original Due Date
                            </p>
                            <p className="dueDate_GoalPage">
                              <span
                                style={{
                                  background: "#bbb"
                                }}
                              >
                                {moment(goal.dueDate).format("MM/DD/YYYY")}
                              </span>
                            </p>
                            <p>{goal.complete ? "completed" : "incomplete"}</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div>
                      <h4>
                        {search ? "No Results" : "You have no past goals"}
                      </h4>
                    </div>
                  )}
                  <div>
                    {props.pastGoals.length > 3 ? (
                      <i
                        style={{ color: "#bbb" }}
                        className="material-icons arrows_GoalPage"
                        onClick={pastNext}
                      >
                        arrow_forward
                      </i>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return "";
  }
}
export default GoalOverview;
