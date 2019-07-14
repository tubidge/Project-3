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

  const [categories, setCategories] = useState([]);

  // for the current user
  const [goalInfo, setGoalInfo] = useState({});
  const [incompleteGoals, setIncompleteGoals] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  // for the selected buddy
  const [buddyGoalInfo, setBuddyGoalInfo] = useState({});
  const [buddyIncompleteGoals, setBuddyIncompleteGoals] = useState([]);
  const [buddyData, setBuddyData] = useState([]);
  const [allBuddies, setAllBuddies] = useState([]);

  useEffect(() => {
    getBuddyData();
    getUserData();
  }, []);

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

  const getBuddyData = () => {
    let pathArray = window.location.pathname.split("/");
    let id = pathArray[2];
    API.getUser(id).then(res => {
      if (res.data.buddies.allBuddies) {
        setAllBuddies(
          res.data.buddies.allBuddies
            .map(buddy => buddy.username)
            .reduce(
              (unique, item) =>
                unique.includes(item) ? unique : [...unique, item],
              []
            )
        );
      }
      setBuddyData(res.data);
      console.log(res.data);
      API.getAllGoals(id).then(res => {
        let goalData = res.data;
        setBuddyGoalInfo(goalData);
        setBuddyIncompleteGoals(goalData.currentGoals.incomplete);
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

  const getUserData = () => {
    API.getUserByEmail(user.email).then(resp => {
      let userData = resp.data;
      API.getAllGoals(userData.id).then(res => {
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
        setIsLoading(false);
      });
    });
  };

  const addBuddy = (buddyId, buddyGoalId, userGoalId, userId) => {
    let data = {
      duration: "1 Week",
      buddyId: buddyId,
      buddyGoal: buddyGoalId,
      GoalId: userGoalId,
      UserId: userId
    };
    API.addBuddy(data).then(res => {
      console.log(res.data);
    });
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
            incompleteGoals={buddyIncompleteGoals}
            buddies={allBuddies}
          />
        </div>
        <div className="row">
          <div className="col l8 s12 center-align">
            <BuddyGoalCard
              incompleteGoals={buddyIncompleteGoals}
              addBuddy={addBuddy}
              currentUserGoals={incompleteGoals}
              addBuddy={addBuddy}
              userId={userInfo.id}
              buddyId={buddyData.id}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BuddyProfile;