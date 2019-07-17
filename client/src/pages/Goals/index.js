import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";
import GoalDetail from "../../components/GoalDetail";
import MilestoneColumn from "../../components/MilestoneColumn";
import Milestone from "../../components/Milestone";
import Buddy from "../../components/Buddy";
import BuddyColumn from "../../components/BuddyColumn";
import Footer from "../../components/Footer";
import M from "materialize-css";
import "./style.css";
import API from "../../utils/API";

const Goals = props => {
  const { loading, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [incompleteGoals, setIncompleteGoals] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [, setGoalInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [allBuddies, setAllBuddies] = useState();

  useEffect(() => {
    M.AutoInit();
    getAllData();
  }, []);

  const getAllData = () => {
    API.getUserByEmail(user.email).then(resp => {
      console.log(resp.data);
      let userData = resp.data;
      API.getAllGoals(userData.id).then(res => {
        console.log(res.data);
        let goalData = res.data;
        setGoalInfo(goalData);
        setUserInfo(userData);
        if (userData.buddies) {
          setAllBuddies(userData.buddies.allBuddies);
        }
        setIncompleteGoals(goalData.currentGoals.incomplete);
        setCategories(
          goalData.currentGoals.incomplete
            .map(goal => goal.category)
            .reduce(
              (unique, item) =>
                unique.includes(item) ? unique : [...unique, item],
              []
            )
        );
        setIsLoading(false);
        console.log(incompleteGoals);
      });
    });
  };

  const renderGoalsForCategory = category => {
    const result = incompleteGoals.filter(goal => goal.category === category);
    return result.map(goal => (
      <a key={goal.id} href={`#${goal.id}"`}>
        <li className="goal-tab center-align">{goal.name}</li>
      </a>
    ));
  };

  const renderGoalDetail = id => {
    const result = incompleteGoals.filter(goal => goal.id === id);
    return result.map(goal => (
      <GoalDetail
        milestone="Test Milestone for Education"
        name={goal.name}
        due={goal.dueDate}
        desc={goal.description}
      />
    ));
  };

  return (
    <div>
      <section className="container">
        <div className="row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s2 offset-s2">
                <a href="#Fitness">Fitness</a>
              </li>
              <li className="tab col s2">
                <a href="#Wellness">Wellness</a>
              </li>
              <li className="tab col s2">
                <a href="#Financial">Financial</a>
              </li>
              <li className="tab col s2">
                <a href="#Education">Education</a>
              </li>
              <li className="tab col s2">
                <a href="#Travel">Travel</a>
              </li>
            </ul>
          </div>

          <div id="Fitness">
            <div className="col s2">
              <ul className="goal-tabs">{renderGoalsForCategory("Fitness")}</ul>
            </div>
          </div>

          <div id="Wellness">
            <div className="col s2">
              <ul className="goal-tabs">
                {renderGoalsForCategory("Wellness")}
              </ul>
            </div>
          </div>

          <div id="Financial">
            <div className="col s2">
              <ul className="goal-tabs">
                {renderGoalsForCategory("Financial")}
              </ul>
            </div>
          </div>

          <div id="Education">
            <div className="col s2">
              <ul className="goal-tabs">
                {renderGoalsForCategory("Education")}
              </ul>
            </div>
          </div>

          <div id="Travel">
            <div className="col s2">
              <ul className="goal-tabs">{renderGoalsForCategory("Travel")}</ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Goals;
