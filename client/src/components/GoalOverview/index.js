import React, { useEffect, useState } from "react";
import "./style.css";
import ProgressBar from "../ProgressBar";
import moment from "moment";
import Loading from "../../components/Loading";
import API from "../../utils/API";

function GoalOverview(props) {
  console.log(props);
  const [currentGoals, setCurrentGoals] = useState();
  const [pastGoals, setPastGoals] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentView, setCurrentView] = useState();

  useEffect(() => {
    getData();
  }, [currentIndex]);
  const getData = () => {
    console.log(props);
    API.getGoalCategory(props.userId, props.category).then(resp => {
      console.log("_+_+_+_+_+_+_+_+_+_+_+_");
      console.log(resp.data.currentGoals);
      setCurrentGoals(resp.data.currentGoals);
      setPastGoals(resp.data.pastGoals);
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
      props.renderGoalsForCategory(props.category, resp.data.currentGoals);
    });
  };

  const next = () => {
    let add;

    let max = currentGoals.length - 2;
    console.log(max);
    if (currentIndex < 0) {
      add = currentGoals.length - 1;
    } else {
      add = currentIndex - 1;
    }

    if (add > max) {
      console.log("running");
      add = 1;
    }
    console.log(add);

    setCurrentIndex(add);
  };

  const prev = () => {
    let sub;
    console.log(currentIndex);
    console.log(currentGoals.length);
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

  if (currentGoals) {
    return (
      <>
        <div className="row">
          <div className="col s12">
            <div className="card goal-overview-card">
              <div className="card-content">
                <h3 style={{ textAlign: "center" }}>Current Goals</h3>
                <div id="currentGoal-row">
                  {currentGoals.length > 2 ? (
                    <i
                      className="material-icons"
                      style={{
                        fontSize: "4rem",
                        cursor: "pointer",
                        color: "#d4ac0d "
                      }}
                      onClick={prev}
                    >
                      arrow_back
                    </i>
                  ) : (
                    ""
                  )}
                  {currentView
                    ? currentView.map(goal => {
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
                              <div className="card-content">
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
                                  onClick={() =>
                                    props.renderGoalDetail(goal.id)
                                  }
                                >
                                  exit_to_app
                                </i>
                              </div>
                            </div>
                          </>
                        );
                      })
                    : ""}
                  {currentGoals.length > 2 ? (
                    <i
                      className="material-icons"
                      style={{
                        fontSize: "4rem",
                        cursor: "pointer",
                        color: "#d4ac0d "
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
        <div className="row">
          <div className="col s12">
            <div className="card goal-overview-card">
              <div className="card-content">
                <h3 style={{ textAlign: "center" }}>Past Goals</h3>
                <div id="pastGoal-row">
                  {pastGoals
                    ? pastGoals.map(goal => {
                        return (
                          <div className="card overview-goal">
                            <div className="card-content">
                              <div className="card-title">{goal.name}</div>
                            </div>
                          </div>
                        );
                      })
                    : ""}
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
