import React, { useEffect, useState } from "react";
import "./style.css";
import ProgressBar from "../ProgressBar";
import moment from "moment";
import Loading from "../../components/Loading";
import API from "../../utils/API";
import ConfirmModal from "../ConfirmModal";
import Modal from "../Modal";
import M from "materialize-css";

function GoalOverview(props) {
  console.log(props);
  const [currentGoals, setCurrentGoals] = useState();
  //   const [pastGoals, setPastGoals] = useState(props.pastGoals);
  const [pastView, setPastView] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentView, setCurrentView] = useState();
  const [modalOpen, setmodalOpen] = useState(false);
  const [reRender, setreRender] = useState(false);
  const [search, setSearch] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  useEffect(() => {
    M.AutoInit();
    let modals = document.querySelectorAll(".modal");
    let options = {
      dismissible: false,
      inDuration: 200,
      outDuration: 400
    };
    var instances = M.Modal.init(modals, options);
    getData();
  }, [currentIndex, reRender, props.category]);

  const getData = () => {
    console.log(props);
    API.getGoalCategory(props.userId, props.category).then(resp => {
      setCurrentGoals(resp.data.currentGoals);

      if (resp.data.currentGoals.length > 3) {
        let arr = [];
        for (var i = currentIndex; i < [currentIndex + 3]; i++) {
          console.log(i);
          if (i < 0) {
            console.log("first");
            let num = resp.data.currentGoals.length - 1;
            arr.push(resp.data.currentGoals[num]);
          } else if (i > resp.data.currentGoals.length - 1) {
            console.log("second");
            arr.push(resp.data.currentGoals[0]);
          } else {
            console.log("third");
            arr.push(resp.data.currentGoals[i]);
          }
        }
        console.log(arr);
        setCurrentView(arr);
      } else if (resp.data.currentGoals.length > 0) {
        setCurrentView(resp.data.currentGoals);
      } else {
        setCurrentView(false);
      }
      console.log(props.pastGoals.length);
      if (props.pastGoals.length > 0) {
        setPastView(props.pastGoals);
      } else {
        setPastView(false);
      }

      props.renderGoalsForCategory(props.category, resp.data.currentGoals);
    });
  };

  const next = () => {
    let add;
    console.log(currentIndex);
    console.log(currentGoals.length);
    let max = currentGoals.length - 2;
    let num = currentGoals.length - 1;
    console.log(max);
    if (currentIndex > num) {
      add = 1;
    } else {
      add = currentIndex + 1;
    }

    if (add > max) {
      console.log("running");
      add = 0;
    }
    console.log(add);

    setCurrentIndex(add);
  };

  const prev = () => {
    let sub;

    let max = currentGoals.length - 2;
    console.log(max);
    if (currentIndex < 0) {
      sub = currentGoals.length - 1;
    } else {
      sub = currentIndex - 1;
    }

    if (sub > max) {
      console.log("running");
      sub = 1;
    }
    console.log(sub);
    setCurrentIndex(sub);
  };

  const deleteGoal = id => {
    console.log(id);
    setSelectedGoal(id);
    openConfirmModal();
  };

  const openConfirmModal = () => {
    console.log("modal opening");

    setmodalOpen(true);
  };

  const close = header => {
    if (header !== "cancel") {
      setmodalOpen(false);
      setreRender(!reRender);
    } else {
      // setreRender(!reRender);
      setmodalOpen(false);

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
        console.log(resp);
        setPastView(resp.data);
        document.getElementsByClassName("searchGoalBtn").value = "";
      });
    } else {
      console.log("show toast for validation");
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
    }
  };

  if (currentGoals) {
    console.log(currentView);
    return (
      <>
        {modalOpen ? (
          <ConfirmModal
            goalId={selectedGoal}
            message="This will delete your goal and any of its milestones"
            type="Delete Goal"
            render={close}
          />
        ) : (
          ""
        )}
        <div className="row">
          <div className="col s12">
            <div className="card goal-overview-card">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Modal
                  style={{
                    marginLeft: "10px",
                    marginTop: "20px",
                    color: "#d4ac0d",
                    fontSize: "35px"
                  }}
                  className="material-icons modal-trigger right tooltipped"
                  btnName={"add_circle"}
                  header="AddNew"
                  text="Complete this form"
                  dataTarget={`newGoalFromCard_${makeid(5)}`}
                  action="Add"
                  userID={props.userId}
                  goalCategory={props.category}
                  orderRender={orderRender}
                  dataPosition="top"
                  dataTooltip="Add a goal to this category"
                />

                <p
                  style={{
                    marginRight: "10px",
                    fontSize: "1.5rem"
                  }}
                >
                  {moment().format("MM-DD-YYYY")}
                </p>
              </div>
              <div className="card-content">
                <div className="row">
                  <h3 style={{ textAlign: "center", margin: "0px" }}>
                    {props.category} Goals
                  </h3>
                </div>

                <div id="currentGoal-row">
                  <div>
                    {currentGoals.length > 3 ? (
                      <i
                        className="material-icons"
                        style={{
                          fontSize: "4rem",
                          cursor: "pointer",
                          color: "#d4ac0d ",
                          marginTop: "180%"
                        }}
                        onClick={prev}
                      >
                        arrow_back
                      </i>
                    ) : (
                      ""
                    )}
                  </div>
                  {currentView ? (
                    currentView.map(goal => {
                      return (
                        <>
                          <div className="card overview-goal">
                            <div className="row">
                              <div
                                className="col s12"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  marginRight: "3px",
                                  marginTop: "3px"
                                }}
                              >
                                <i
                                  className="material-icons"
                                  data-id={goal.id}
                                  onClick={() => deleteGoal(goal.id)}
                                  style={{
                                    color: "white",
                                    fontSize: "2rem",
                                    cursor: "pointer"
                                  }}
                                >
                                  delete_forever
                                </i>
                              </div>
                            </div>
                            <div
                              className="card-content"
                              style={{ marginBottom: "25px" }}
                            >
                              <div
                                className="card-title"
                                style={{ marginBottom: "0px" }}
                              >
                                {goal.name}
                              </div>
                              <p
                                style={{
                                  textAlign: "center",
                                  color: "white",
                                  fontSize: "1.25rem"
                                }}
                              >
                                by
                              </p>
                              <p
                                className="goal-overview-p"
                                style={{
                                  color: "white",
                                  textAlign: "center",
                                  fontSize: "1.25rem"
                                }}
                              >
                                {goal.dueDate}
                              </p>
                              <ProgressBar
                                style={{
                                  marginBottom: "2rem",
                                  marginTop: "2rem"
                                }}
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
                                className="material-icons"
                                style={{
                                  color: "white",
                                  textAlign: "center",
                                  fontSize: "3.25rem",
                                  marginTop: "2rem",
                                  cursor: "pointer"
                                }}
                                onClick={() => props.renderGoalDetail(goal.id)}
                              >
                                exit_to_app
                              </i>
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
                        className="material-icons"
                        style={{
                          fontSize: "4rem",
                          cursor: "pointer",
                          color: "#d4ac0d ",
                          marginTop: "180%"
                        }}
                        onClick={next}
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
        <div className="row">
          <div className="col s12">
            <div className="card past-overview-card">
              <div className="card-content">
                <h3 style={{ textAlign: "center" }}>Past Goals</h3>
                <div className="row">
                  <form>
                    <div className="col s8 l4">
                      <div className="input-field">
                        <input
                          placeholder={`Search for past goals`}
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
                            style={{ marginTop: "10px" }}
                            className="btn searchGoalBtn"
                            type="submit"
                            onClick={searchGoal}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col s8 l5 offset-l2">
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
                              style={{ marginTop: "10px" }}
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
                  {pastView.length ? (
                    pastView.map(goal => {
                      return (
                        <div className="card overview-goal">
                          <div className="row">
                            <div
                              className="col s12"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginRight: "3px",
                                marginTop: "3px"
                              }}
                            >
                              <i
                                className="material-icons"
                                data-id={goal.id}
                                onClick={() => deleteGoal(goal.id)}
                                style={{
                                  color: "white",
                                  fontSize: "2rem",
                                  cursor: "pointer"
                                }}
                              >
                                delete_forever
                              </i>
                            </div>
                          </div>
                          <div
                            className="card-content"
                            style={{ marginBottom: "25px" }}
                          >
                            <div
                              className="card-title"
                              style={{ marginBottom: "0px" }}
                            >
                              {goal.name}
                            </div>
                            <p
                              style={{
                                textAlign: "center",
                                color: "white",
                                fontSize: "1.25rem"
                              }}
                            >
                              by
                            </p>
                            <p
                              className="goal-overview-p"
                              style={{
                                color: "white",
                                textAlign: "center",
                                fontSize: "1.25rem"
                              }}
                            >
                              {goal.dueDate}
                            </p>
                            {/* <ProgressBar
                              style={{
                                marginBottom: "2rem",
                                marginTop: "2rem"
                              }}
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
                            /> */}

                            <i
                              className="material-icons"
                              style={{
                                color: "white",
                                textAlign: "center",
                                fontSize: "3.25rem",
                                marginTop: "2rem",
                                cursor: "pointer"
                              }}
                              onClick={() => props.renderGoalDetail(goal.id)}
                            >
                              exit_to_app
                            </i>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div>
                      {" "}
                      <h4 style={{ textAlign: "center", marginTop: "5rem" }}>
                        {search ? "No Results" : "You have no past goals"}
                      </h4>{" "}
                    </div>
                  )}
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
