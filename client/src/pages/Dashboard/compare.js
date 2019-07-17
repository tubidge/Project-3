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
import Cal from "../../components/Calendar";

import "./style.css";

const Dashboard = () => {
  const { loading, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [, setGoalInfo] = useState({});
  const [incompleteGoals, setIncompleteGoals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState([]);
  const [allBuddies, setAllBuddies] = useState();
  const [reRender, setreRender] = useState(false);

  let stopIndex;
  let activeCategories = [];

  useEffect(() => {
    getAllData();
  }, [reRender]);

  const getUnique = (arr, comp) => {
    const unique = arr
      .map(e => e[comp])
      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])
      .map(e => arr[e]);
    return unique;
  };

  const orderRender = () => {
    setreRender(!reRender);
  };

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
        setCategories([
          "Fitness",
          "Education",
          "Wellness",
          "Financial",
          "Travel"
        ]);
        setIsLoading(false);
      });
    });
  };

  const renderGoalCards = () => {
    activeCategories = [];
    stopIndex = 3;

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
    activeCategories = [];
    // categories.push(categories.shift());
    categories.push(categories.shift());
    for (let i = 0; i < stopIndex; i++) {
      activeCategories.push(categories[i]);
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
      <div className="row">
        <div className="col l3 s12" style={{ marginTop: "-130px" }}>
          <UserProfile
            userPicture={userInfo.image ? userInfo.image : user.picture}
            username={userInfo.username}
            email={userInfo.email}
            incompleteGoals={incompleteGoals}
            buddies={allBuddies ? getUnique(allBuddies, "username") : null}
          />
          <BuddyList
            userEmail={userInfo.email}
            userID={userInfo.id}
            makeid={makeid}
            buddies={allBuddies ? getUnique(allBuddies, "username") : null}
          />
        </div>
        <div style={{ marginTop: "20px", marginBottom: "20px" }} />
        <div className="col l8 s12">{renderGoalCards()}</div>
        <div className="col s1 nextArrow">
          {activeCategories.length >= 3 && (
            <span>
              <FontAwesomeIcon
                onClick={() => cycleCategories()}
                icon={faChevronRight}
              />
            </span>
          )}
        </div>
        <div className="row">
          <div className="col l8 s12 center-align">
            <Cal userId={userInfo.id} orderRender={orderRender} />{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
