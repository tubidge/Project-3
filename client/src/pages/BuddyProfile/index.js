import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../react-auth0-spa";

import API from "../../utils/API";
import Loading from "../../components/Loading";
import UserProfile from "../../components/UserProfile";
import BuddyGoalCard from "../../components/BuddyGoalCard";
import defaultLionPic from "../Buddies/lionDefaultProfilePic.jpg";

const BuddyProfile = props => {
  const { loading, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);

  const [, setCategories] = useState([]);
  const [reRender, setReRender] = useState(false);

  // for the current user
  const [, setGoalInfo] = useState({});
  const [incompleteGoals, setIncompleteGoals] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  // for the selected buddy
  const [, setBuddyGoalInfo] = useState({});
  const [buddyIncompleteGoals, setBuddyIncompleteGoals] = useState([]);
  const [buddyCompleteGoals, setBuddyCompleteGoals] = useState([]);
  const [buddyData, setBuddyData] = useState([]);
  const [allBuddies, setAllBuddies] = useState([]);
  const [following, setFollowing] = useState([]);
  const [buddyGoals, setBuddyGoals] = useState([]);

  useEffect(() => {
    getBuddyData();
    getUserData();
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

  const getBuddyData = () => {
    let pathArray = window.location.pathname.split("/");
    let id = pathArray[2];
    API.getUser(id).then(res => {
      if (res.data.buddies) {
        if (res.data.buddies.length > 0) {
          setAllBuddies(
            res.data.buddies.allBuddies
              .map(buddy => buddy.id)
              .reduce(
                (unique, item) =>
                  unique.includes(item) ? unique : [...unique, item],
                []
              )
          );
        } else {
          setAllBuddies(res.data.buddies.allBuddies);
        }
      }
      setBuddyData(res.data);
      API.getAllGoals(id).then(res => {
        let goalData = res.data;
        setBuddyGoalInfo(goalData);
        setBuddyIncompleteGoals(goalData.currentGoals.incomplete);
        setBuddyCompleteGoals(goalData.currentGoals.complete);
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
      API.getBuddyComponent(userData.id).then(res => {
        setBuddyGoals(res.data);
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
          API.getFollowing(userData.id).then(response => {
            let following = response.data;
            setFollowing(following);
          });
        });
        setIsLoading(false);
      });
    });
  };

  const addBuddy = (duration, buddyId, buddyGoalId, userGoalId, userId) => {
    let data = {
      duration: duration,
      buddyId: buddyId,
      buddyGoal: buddyGoalId,
      GoalId: userGoalId,
      UserId: userId
    };
    API.addBuddy(data).then(res => {
      console.log(res.data);
    });
  };

  const orderRender = () => {
    setReRender(!reRender);
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
            userPicture={buddyData.image ? buddyData.image : defaultLionPic}
            username={buddyData.username}
            email={buddyData.email}
            buddyIncompleteGoals={buddyIncompleteGoals}
            buddyCompleteGoals={buddyCompleteGoals}
            buddyBuddies={allBuddies ? getUnique(allBuddies, "username") : null}
            buddyProfile={true}
          />
        </div>
        <div className="row">
          <div className="col l8 s12 center-align">
            <BuddyGoalCard
              buddyGoals={buddyGoals}
              following={following}
              incompleteGoals={buddyIncompleteGoals}
              currentUserGoals={incompleteGoals}
              addBuddy={addBuddy}
              userId={userInfo.id}
              buddyId={buddyData.id}
              buddyName={buddyData.username}
              orderRender={orderRender}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BuddyProfile;
