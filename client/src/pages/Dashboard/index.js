import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import API from "../../utils/API";
import Loading from "../../components/Loading";
import UserProfile from "../../components/UserProfile";
import BuddyList from "../../components/BuddyList";
import GoalCard from "../../components/GoalCard";
import Modal from "../../components/Modal";
import Cal from "../../components/Calendar";

import "./style.css";

// hooks are a way for us to use state in a function component
const Dashboard = () => {
  const { loading, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [, setGoalInfo] = useState({});
  const [incompleteGoals, setIncompleteGoals] = useState([]);
  const [categories, setCategories] = useState([]);
<<<<<<< HEAD
  const [allBuddies, setAllBuddies] = useState();
=======
  const [active, setActive] = useState([]);
  const [allBuddies, setAllBuddies] = useState();

  let stopIndex;
  let activeCategories = [];
>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    API.getUserByEmail(user.email).then(resp => {
      console.log(resp.data);
      let userData = resp.data;
      API.getAllGoals(userData.id).then(res => {
        let goalData = res.data;
        const incompleteGoals = goalData.currentGoals.incomplete;
        incompleteGoals.map(goal => {
          console.log(JSON.stringify(goal));
        });
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
      });
    });
  };

  const renderGoalCards = () => {
    activeCategories = [];
    stopIndex = categories.length;
    if (categories.length > 3) {
      stopIndex = 3;
    }
    for (let i = 0; i < stopIndex; i++) {
      activeCategories.push(categories[i]);
    }
    return activeCategories.map(category => (
      <GoalCard
        key={makeid(5)}
        category={category}
        userID={userInfo.id}
        incompleteGoals={incompleteGoals}
        getAllData={getAllData}
      />
    ));
  };

  // Cycle through categories on arrow click
  const cycleCategories = () => {
    if (stopIndex === 3) {
      activeCategories = [];
      categories.push(categories.shift());
      console.log(`All Categories: ${categories}`);
      for (let i = 0; i < stopIndex; i++) {
        activeCategories.push(categories[i]);
      }
    }
    setActive(activeCategories);
    console.log(`Active Categories: ${active}`);

    renderGoalCards();
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

  if (loading || !userInfo || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="profileSummaryBg" />
      <div className="hero-image" />
<<<<<<< HEAD
      <div className="row mt20">
=======
      <div className="row">
>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5
        <div className="col l3 s12" style={{ marginTop: "-130px" }}>
          <UserProfile
            userPicture={userInfo.image ? userInfo.image : user.picture}
            username={userInfo.username}
            email={userInfo.email}
            incompleteGoals={incompleteGoals}
            buddies={allBuddies}
          />
          <BuddyList buddies={allBuddies} makeid={makeid} />
        </div>
<<<<<<< HEAD

        <div className="col l9 s12">
          <div className="row" style={{ marginTop: "15px" }}>
            <Modal
              className="btn modal-trigger green"
              btnName="Add goal for new category..."
              header="Add a new goal"
              text="Complete this form"
              dataTarget={`newGoal_${makeid(5)}`}
              action="Add"
              userID={userInfo.id}
              getAllData={getAllData}
            />
          </div>
          <div className="row">
            {categories.map(category => (
              <GoalCard
                key={makeid(5)}
                category={category}
                userID={userInfo.id}
                incompleteGoals={incompleteGoals}
                getAllData={getAllData}
              />
            ))}
          </div>
          <div className="row">
            <div className="col s12 center-align">
              <Cal />
            </div>
          </div>
        </div>
        <div className="col s12">
          <div className="row">
            <h5>Current Incomplete Goals</h5>
            {renderGoals()}
=======
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Modal
            className="btn-small modal-trigger green"
            btnName="Add goal for new category..."
            header="AddNew"
            text="Complete this form"
            dataTarget={`newGoal_${makeid(5)}`}
            action="Add"
            userID={userInfo.id}
            getAllData={getAllData}
          />
        </div>
        <div className="col l8 s12">{renderGoalCards()}</div>
        <div className="col s1 nextArrow">
          <span>
            <FontAwesomeIcon
              onClick={() => cycleCategories()}
              icon={faChevronRight}
            />
          </span>
        </div>
        <div className="row">
          <div className="col l8 s12 center-align">
            <Cal />
>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5
          </div>
        </div>
      </div>
    </>
  );
};

// conditional rendering - render one or the other
// const date; // set date when date is selected on calendar
// const goalsOnDate = function() {
// maps over incomplete goals and returns object with all goals from that date
// };
// const allGoals = {};
// const dateGoalsHMTL = <div>{goalsOnDate}</div>;
// const allGoalsHMTL = <div>{allGoals}</div>;

// const ternary = date ? dateGoalsHMTL : allGoalsHMTL;

// {
//   ternary;
// }

export default Dashboard;
