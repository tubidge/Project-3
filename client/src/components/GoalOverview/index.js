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
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    console.log(props);
    API.getGoalCategory(props.userId, props.category).then(resp => {
      console.log(resp);
      setCurrentGoals(resp.data.currentGoals);
      setPastGoals(resp.data.pastGoals);
      props.renderGoalsForCategory(props.category, resp.data.currentGoals);
    });
  };
  return (
    <>
      <div className="row">
        <div className="col s12">
          <div className="card goal-overview-card">
            <div className="card-content">
              <h3 style={{ textAlign: "center" }}>Current Goals</h3>
              <div id="currentGoal-row">
                {currentGoals
                  ? currentGoals.map(goal => {
                      return (
                        <div className="card overview-goal">
                          <div className="card-content">
                            <div className="card-title">{goal.name}</div>
                            <div>
                              <a
                                className=" btn"
                                onClick={() => props.renderGoalDetail(goal.id)}
                              >
                                View Goal
                              </a>
                            </div>
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
}
export default GoalOverview;
