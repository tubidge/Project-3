import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";
import GoalDetail from "../../components/GoalDetail";
import MilestoneColumn from "../../components/MilestoneColumn";
import Milestone from "../../components/Milestone";
import Buddy from "../../components/Buddy";
import BuddyColumn from "../../components/BuddyColumn";
import M from "materialize-css";
import "./style.css";
import API from "../../utils/API";

const Goals = props => {
  const { loading, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [incompleteGoals, setIncompleteGoals] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [goalInfo, setGoalInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [allBuddies, setAllBuddies] = useState();
  const [currentGoal, setCurrentGoal] = useState(false);
  const [reRender, setreRender] = useState(false);

  useEffect(() => {
    M.AutoInit();
    getAllData();
  }, [currentGoal, reRender]);

  const getAllData = () => {
    console.log("function running");
    console.log(user.email);

    API.getGoalPageInfo(user.email).then(resp => {
      console.log(resp);
      let userData = resp.data;
      setUserInfo(userData);
      setGoalInfo(userData.activeGoals);
      if (userData.buddies) {
        setAllBuddies(userData.buddies.allBuddies);
      }
      setIncompleteGoals(userData.activeGoals.incomplete);
      setCategories(
        userData.activeGoals.incomplete
          .map(goal => goal.category)
          .reduce(
            (unique, item) =>
              unique.includes(item) ? unique : [...unique, item],
            []
          )
      );
      setIsLoading(false);
    });
  };

  const renderGoalsForCategory = category => {
    const result = incompleteGoals.filter(goal => goal.category === category);
    return result.map(goal => (
      <a key={goal.id} href={`#${goal.id}"`}>
        <li
          className="goal-tab center-align"
          onClick={
            (() => {
              setCurrentGoal(false);
            },
            () => {
              console.log(currentGoal);
              renderGoalDetail(goal.id);
            })
          }
        >
          {goal.name}
        </li>
      </a>
    ));
  };

  const renderGoalDetail = id => {
    const result = incompleteGoals.filter(goal => goal.id === id);
    console.log(result);

    setCurrentGoal(result[0]);
  };

  const handleClick = () => {
    setCurrentGoal(false);
  };

  const orderRender = () => {
    console.log("goal page render");
    setreRender(!reRender);
  };
  return (
    <>
      <section className="container">
        <div className="row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s2 offset-s2">
                <a href="#Fitness" onClick={handleClick}>
                  Fitness
                </a>
              </li>
              <li className="tab col s2">
                <a href="#Wellness" onClick={handleClick}>
                  Wellness
                </a>
              </li>
              <li className="tab col s2">
                <a href="#Financial" onClick={handleClick}>
                  Financial
                </a>
              </li>
              <li className="tab col s2">
                <a href="#Education" onClick={handleClick}>
                  Education
                </a>
              </li>
              <li className="tab col s2">
                <a href="#Travel" onClick={handleClick}>
                  Travel
                </a>
              </li>
            </ul>
          </div>

          <div id="Fitness">
            <div className="col s2">
              <ul className="goal-tabs">{renderGoalsForCategory("Fitness")}</ul>
            </div>
            <div className="col s10">
              {currentGoal ? (
                <GoalDetail
                  userId={userInfo.id}
                  goal={currentGoal}
                  orderRender={orderRender}
                />
              ) : (
                ""
              )}
            </div>
          </div>

          <div id="Wellness">
            <div className="col s2">
              <ul className="goal-tabs">
                {renderGoalsForCategory("Wellness")}
              </ul>
            </div>
            <div className="col s10">
              {currentGoal ? (
                <GoalDetail
                  userId={userInfo.id}
                  goal={currentGoal}
                  orderRender={orderRender}
                />
              ) : (
                ""
              )}
            </div>
          </div>

          <div id="Financial">
            <div className="col s2">
              <ul className="goal-tabs">
                {renderGoalsForCategory("Financial")}
              </ul>
            </div>
            <div className="col s10">
              {currentGoal ? (
                <GoalDetail
                  userId={userInfo.id}
                  goal={currentGoal}
                  orderRender={orderRender}
                />
              ) : (
                ""
              )}
            </div>
          </div>

          <div id="Education">
            <div className="col s2">
              <ul className="goal-tabs">
                {renderGoalsForCategory("Education")}
              </ul>
            </div>
            <div className="col s10">
              {currentGoal ? (
                <GoalDetail
                  userId={userInfo.id}
                  goal={currentGoal}
                  orderRender={orderRender}
                />
              ) : (
                ""
              )}
            </div>
          </div>

          <div id="Travel">
            <div className="col s2">
              <ul className="goal-tabs">{renderGoalsForCategory("Travel")}</ul>
            </div>
            <div className="col s10">
              {currentGoal ? (
                <GoalDetail
                  userId={userInfo.id}
                  goal={currentGoal}
                  orderRender={orderRender}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Goals;
