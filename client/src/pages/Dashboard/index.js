import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";
import Loading from "../../components/Loading";
import API from "../../utils/API";
import M from "materialize-css";
import "./style.css";
import AddGoalModal from "../../components/AddGoalModal";

const User = () => {
  const { loading, user } = useAuth0();

  const [userInfo, setUserInfo] = useState({});
  const [goalInfo, setGoalInfo] = useState({});
  const [incompleteGoals, setIncompleteGoals] = useState([]);
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

  const renderGoalsForCategories = category => {
    const result = incompleteGoals.filter(goal => goal.category === category);
    return result.map(goal => (
      <li key={goal.id}>
        <div className="card-panel teal">
          <span className="white-text">{goal.name}</span>
        </div>
      </li>
    ));
  };

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <>
      <div className="row mt20">
        <section className="profileSummary">
          <div className="col l3 s12">
            <div className="row center-align">
              <div className="profileImageContainer">
                <img
                  className="circle responsive-img z-depth-3"
                  alt="Profile"
                  src={user.picture}
                />
              </div>
              <div className="mt10">
                {userInfo.username}
                <br />
                {userInfo.email}
              </div>
              <span className="btn mt10 grey darken-4">Add Buddy</span>
            </div>
            <div className="row center-align">
              <div className="col s6">
                <span className="mb10">Goals</span>
                <br />
                <span>{incompleteGoals.length}</span>
              </div>
              <div className="col s6">
                <span className="mb10">Buddies</span>
                <br />
                <span>{buddies.length}</span>
              </div>
            </div>
            <hr />
            <div className="row center-align">
              <span>Completed 15/20 goals</span>
            </div>
            <section className="buddiesList">
              <ul className="collection with-header">
                <li className="collection-header">
                  <h5>Buddies</h5>
                  <Link to="/buddies">Search Buddies</Link>
                </li>
                {buddies.map(buddy => (
                  <li key={makeid(5)} className="collection-item avatar">
                    <Link to="#">{buddy}</Link>
                    <img
                      className="circle responsive-img z-depth-1"
                      src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"
                      alt="Profile"
                    />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>
        <section className="goalsByCategory">
          <div className="col l8 s12">
            <div className="row">
              <div className="col l4 s12">
                <ul className="collapsible">
                  <li>
                    <div className="collapsible-header">
                      <i className="material-icons">filter_drama</i>Fitness
                    </div>
                    <div className="collapsible-body">
                      <ul>{renderGoalsForCategories("Fitness")}</ul>
                      <button className="btn">Add</button>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col l4 s12">
                <ul className="collapsible">
                  <li>
                    <div className="collapsible-header">
                      <i className="material-icons">filter_drama</i>Wellness
                    </div>
                    <div className="collapsible-body">
                      <ul>{renderGoalsForCategories("Wellness")}</ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col l4 s12">
                <ul className="collapsible">
                  <li>
                    <div className="collapsible-header">
                      <i className="material-icons">filter_drama</i>Financial
                    </div>
                    <div className="collapsible-body">
                      <ul>{renderGoalsForCategories("Financial")}</ul>
                    </div>
                  </li>
                </ul>
              </div>
              {/* <i class="material-icons">arrow_forward</i> */}
            </div>
            <div className="row">
              <h5 className="center-align">Calendar</h5>
            </div>
          </div>
        </section>
      </div>
      <hr />
      <div className="row">
        <h5>Current Incomplete Goals</h5>
        {renderGoals()}
      </div>
      <div className="container mb30">
        <AddGoalModal />
      </div>
    </>
  );
};

export default User;
