import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";

import API from "../../utils/API";

import Loading from "../../components/Loading";
import UserProfile from "../../components/UserProfile";
import BuddyList from "../../components/BuddyList";
import GoalCard from "../../components/GoalCard";

import M from "materialize-css";
import "./style.css";

const Dashboard = () => {
  const { loading, user } = useAuth0();

  const [userInfo, setUserInfo] = useState({});
  const [, setGoalInfo] = useState({});
  const [incompleteGoals, setIncompleteGoals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [buddies, setAllBuddies] = useState([]);

  useEffect(() => {
    M.AutoInit();
    API.getUserByEmail(user.email).then(resp => {
      console.log(resp.data);
      let userData = resp.data;
      API.getAllGoals(userData.id).then(res => {
        console.log(res.data);
        let goalData = res.data;
        setGoalInfo(goalData);
        setUserInfo(userData);
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
        if (userData.buddies.allBuddies) {
          setAllBuddies(userData.buddies.allBuddies);
        }
      });
    });
  }, []);

  const makeid = l => {
    let text = "";
    let char_list =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < l; i++) {
      text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return text;
  };

  const renderGoals = () => {
    return incompleteGoals.map(goal => (
      <div className="col s6" key={goal.id}>
        <div className="card">
          <div className="card-content">
            <span className="card-title">{goal.name}</span>
            <Link to="#">Category: {goal.category}</Link>
            <br />
            <Link to="#">Due Date: {goal.dueDate}</Link>
            <br />
            <button className="btn">Edit Goal</button>
            <button className="btn">Delete Goal</button>
            <div>
              <div className="card-title">Milestones</div>
              {goal.milestones.incomplete.map(milestone => (
                <div key={milestone.id}>
                  <p>Name: {milestone.name}</p>
                  <p>Frequency: {milestone.frequency}</p>
                  <p>Due Date: {milestone.dueDate}</p>
                  <hr />
                </div>
              ))}
            </div>
            <div />
          </div>
        </div>
      </div>
    ));
  };

  if (loading || !userInfo) {
    return <Loading />;
  }

  return (
    <>
      <div className="row mt20">
        <div className="col l3 s12">
          <UserProfile
            userPicture={user.picture}
            username={userInfo.username}
            email={userInfo.email}
            incompleteGoals={incompleteGoals}
            buddies={buddies}
          />
          <BuddyList buddies={buddies} makeid={makeid} />
        </div>

        <div className="col l8 s12">
          <div className="row">
            {categories.map(category => (
              <GoalCard
                key={makeid(5)}
                category={category}
                UserId={userInfo.id}
                incompleteGoals={incompleteGoals}
              />
            ))}
          </div>
          <div className="row">
            <h5 className="center-align">Calendar</h5>
          </div>
        </div>

        <hr />
        <div className="col s12">
          <div className="row">
            <h5>Current Incomplete Goals</h5>
            {renderGoals()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
