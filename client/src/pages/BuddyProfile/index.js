import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";

import API from "../../utils/API";
import Loading from "../../components/Loading";
import UserProfile from "../../components/UserProfile";
import BuddyGoalCard from "../../components/BuddyGoalCard";

const BuddyProfile = props => {
  const { loading, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [, setGoalInfo] = useState({});
  const [incompleteGoals, setIncompleteGoals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allBuddies, setAllBuddies] = useState();
  const [buddyData, setBuddyData] = useState([]);

  useEffect(() => {
    getBuddyData();
  }, []);

  const getBuddyData = () => {
    let pathArray = window.location.pathname.split("/");
    let id = pathArray[2];
    API.getUser(id).then(res => {
      setBuddyData(res.data);
      API.getAllGoals(id).then(res => {
        console.log(res.data);
        let goalData = res.data;
        setGoalInfo(goalData);
        // if (buddyData.buddies) {
        //   setAllBuddies(buddyData.buddies.allBuddies);
        // }
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

  const addBuddy = e => {
    e.preventDefault();
    // let data = {
    //   duration: "1 Week",
    //   buddyId: 2,
    //   buddyGoal: 96,
    //   GoalId: 96,
    //   UserId: 1
    // };
    // API.addBuddy(data).then(res => {
    //   console.log(res.data);
    // });
  };

  if (loading || !buddyData || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="hero-image" />
      <h1>{props.buddyFirstName}</h1>
      <div className="row">
        <div className="col l3 s12" style={{ marginTop: "-130px" }}>
          <UserProfile
            userPicture={buddyData.image ? buddyData.image : user.picture}
            username={buddyData.username}
            email={buddyData.email}
            incompleteGoals={incompleteGoals}
            buddies={allBuddies}
          />
        </div>
        <div className="row">
          <div className="col l8 s12 center-align">
            <BuddyGoalCard
              incompleteGoals={incompleteGoals}
              addBuddy={addBuddy}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BuddyProfile;