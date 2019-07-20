import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";
import GoalDetail from "../../components/GoalDetail";
import GoalOverview from "../../components/GoalOverview";
import UserProfile from "../../components/UserProfile";
import BuddyList from "../../components/BuddyList";
import MilestoneColumn from "../../components/MilestoneColumn";
import Milestone from "../../components/Milestone";
import Buddy from "../../components/Buddy";
import BuddyColumn from "../../components/BuddyColumn";
import M from "materialize-css";
import "./style.css";
import API from "../../utils/API";
import Loading from "../../components/Loading";

const Goals = props => {
  const { loading, user } = useAuth0();

  const [isLoading, setIsLoading] = useState(true);
  const [incompleteGoals, setIncompleteGoals] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [goalInfo, setGoalInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [allBuddies, setAllBuddies] = useState();
  const [myBuddies, setMyBuddies] = useState();
  const [currentGoal, setCurrentGoal] = useState(false);
  const [reRender, setreRender] = useState(false);
  const [currentGoals, setCurrentGoals] = useState();
  const [pastGoals, setPastGoals] = useState();
  const [goalArr, setGoalArr] = useState();
  const [startIndex, setStartIndex] = useState();
  const [myBuddies, setMyBuddies] = useState();

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
        setMyBuddies(userData.buddies.myBuddies);
      }

      let current = [];
      current.push(userData.activeGoals.incomplete);
      current.push(userData.activeGoals.completed);
      let past = [];
      past.push(userData.pastGoals.incomplete);
      past.push(userData.pastGoals.completed);
      console.log(current);
      console.log(past);
      setCurrentGoals(current);
      setPastGoals(past);
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

  const makeid = l => {
    let text = "";
    let char_list =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < l; i++) {
      text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return text;
  };

  const renderGoalsForCategory = (category, arr) => {
    const results = arr.filter(goal => goal.category === category);
    console.log(results);
    let res = [];
    results.map(goal => {
      res.push(goal.id);
    });
    console.log(res);
    setGoalArr(res);
  };

  const renderGoalDetail = id => {
    setStartIndex(id);
    const result = incompleteGoals.filter(goal => goal.id === id);
    console.log(result);

    setCurrentGoal(result[0]);
  };

  const nextGoal = () => {
    console.log(goalArr);
    console.log(startIndex);
    let num = goalArr.indexOf(startIndex);
    console.log(num);

    let id = goalArr[num + 1];
    if (!id) {
      id = goalArr[0];
    }
    setStartIndex(id);
    const result = incompleteGoals.filter(goal => goal.id === id);
    console.log(result);

    setCurrentGoal(result[0]);
  };

  const prevGoal = () => {
    let num = goalArr.indexOf(startIndex);
    console.log(num);

    let id = goalArr[num - 1];
    if (!id) {
      id = goalArr[goalArr.length - 1];
    }
    setStartIndex(id);
    const result = incompleteGoals.filter(goal => goal.id === id);
    console.log(result);

    setCurrentGoal(result[0]);
  };

  const exitGoal = () => {
    setCurrentGoal(false);
  };

  const handleClick = () => {
    setCurrentGoal(false);
  };

  const orderRender = () => {
    console.log("goal page render");
    setreRender(!reRender);
  };

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <>
      <div className="row">
        <div className="col s12">
          <ul
            className="tabs"
            style={{ backgroundColor: "rgb(246, 246, 246)" }}
          >
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
          <div className="col s3">
            {userInfo ? (
              <>
                {" "}
                <UserProfile
                  userPicture={userInfo.image ? userInfo.image : user.picture}
                  username={userInfo.username}
                  email={userInfo.email}
                  incompleteGoals={incompleteGoals}
                  buddies={
                    allBuddies ? getUnique(allBuddies, "username") : null
                  }
                />
                {/* <BuddyList
                  myBuddies={myBuddies}
                  userEmail={userInfo.email}
                  userID={userInfo.id}
                  makeid={makeid}
                  buddies={
                    allBuddies ? getUnique(allBuddies, "username") : null
                  }
                />{" "} */}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="col s9">
            {currentGoal ? (
              <>
                <div className="row">
                  <div className="col s12 goal-page-overview">
                    <h3>Fitness Goals</h3>
                    <div className="goal-page-subheader">
                      {/* <ul className="goal-tabs">
                        {renderGoalsForCategory("Fitness")}
                      </ul> */}
                    </div>
                  </div>
                </div>
                <div id="backdrop">
                  <>
                    <div className="row">
                      <div className="col s12">
                        <div className="card goal-overview-card">
                          <div className="card-content">
                            <h3 style={{ textAlign: "center" }}>
                              Current Goals
                            </h3>
                            <div id="currentGoal-row" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s12">
                        <div className="card goal-overview-card">
                          <div className="card-content">
                            <h3 style={{ textAlign: "center" }}>Past Goals</h3>
                            <div id="pastGoal-row" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </div>

                <div id="curtain">
                  <GoalDetail
                    userId={userInfo.id}
                    goal={currentGoal}
                    orderRender={orderRender}
                    nextGoal={nextGoal}
                    prevGoal={prevGoal}
                    exit={exitGoal}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="row">
                  <div className="col s12 goal-page-overview">
                    <h3>Fitness Goals</h3>
                    <div className="goal-page-subheader" />
                  </div>
                </div>
                {userInfo ? (
                  <GoalOverview
                    userId={userInfo.id}
                    category="Fitness"
                    renderGoalDetail={renderGoalDetail}
                    renderGoalsForCategory={renderGoalsForCategory}
                  />
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>

        <div id="Wellness">
          <div className="col s3">
            {userInfo ? (
              <>
                {" "}
                <UserProfile
                  userPicture={userInfo.image ? userInfo.image : user.picture}
                  username={userInfo.username}
                  email={userInfo.email}
                  incompleteGoals={incompleteGoals}
                  buddies={
                    allBuddies ? getUnique(allBuddies, "username") : null
                  }
                />
                {/* <BuddyList
                  myBuddies={myBuddies}
                  userEmail={userInfo.email}
                  userID={userInfo.id}
                  makeid={makeid}
                  buddies={
                    allBuddies ? getUnique(allBuddies, "username") : null
                  }
                />{" "} */}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="col s9">
            {currentGoal ? (
              <>
                <div className="row">
                  <div className="col s12 goal-page-overview">
                    <h3>Wellness Goals</h3>
                    <div className="goal-page-subheader">
                      {/* <ul className="goal-tabs">
                        {renderGoalsForCategory("Wellness")}
                      </ul> */}
                    </div>
                  </div>
                </div>

                <GoalDetail
                  userId={userInfo.id}
                  goal={currentGoal}
                  orderRender={orderRender}
                />
              </>
            ) : (
              <div className="row">
                <div className="col s12 goal-page-overview">
                  <h3>Wellness Goals</h3>
                  <div className="goal-page-subheader">
                    {/* <ul className="goal-tabs">
                      {renderGoalsForCategory("wellness")}
                    </ul> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div id="Financial">
          <div className="col s3">
            {userInfo ? (
              <>
                {" "}
                <UserProfile
                  userPicture={userInfo.image ? userInfo.image : user.picture}
                  username={userInfo.username}
                  email={userInfo.email}
                  incompleteGoals={incompleteGoals}
                  buddies={
                    allBuddies ? getUnique(allBuddies, "username") : null
                  }
                />
                {/* <BuddyList
                  myBuddies={myBuddies}
                  userEmail={userInfo.email}
                  userID={userInfo.id}
                  makeid={makeid}
                  buddies={
                    allBuddies ? getUnique(allBuddies, "username") : null
                  }
                />{" "} */}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="col s9">
            {currentGoal ? (
              <>
                <div className="row">
                  <div className="col s12 goal-page-overview">
                    <h3>Financial Goals</h3>
                    <div className="goal-page-subheader">
                      {/* <ul className="goal-tabs">
                        {renderGoalsForCategory("Financial")}
                      </ul> */}
                    </div>
                  </div>
                </div>

                <GoalDetail
                  userId={userInfo.id}
                  goal={currentGoal}
                  orderRender={orderRender}
                />
              </>
            ) : (
              <div className="row">
                <div className="col s12 goal-page-overview">
                  <h3>Financial Goals</h3>
                  <div className="goal-page-subheader">
                    {/* <ul className="goal-tabs">
                      {renderGoalsForCategory("Financial")}
                    </ul> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div id="Education">
          <div className="col s3">
            {userInfo ? (
              <>
                {" "}
                <UserProfile
                  userPicture={userInfo.image ? userInfo.image : user.picture}
                  username={userInfo.username}
                  email={userInfo.email}
                  incompleteGoals={incompleteGoals}
                  buddies={
                    allBuddies ? getUnique(allBuddies, "username") : null
                  }
                />
                {/* <BuddyList
                  myBuddies={myBuddies}
                  userEmail={userInfo.email}
                  userID={userInfo.id}
                  makeid={makeid}
                  buddies={
                    allBuddies ? getUnique(allBuddies, "username") : null
                  }
                />{" "} */}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="col s9">
            {currentGoal ? (
              <>
                <div className="row">
                  <div className="col s12 goal-page-overview">
                    <h3>Education Goals</h3>
                    <div className="goal-page-subheader">
                      {/* <ul className="goal-tabs">
                        {renderGoalsForCategory("Education")}
                      </ul> */}
                    </div>
                  </div>
                </div>

                <GoalDetail
                  userId={userInfo.id}
                  goal={currentGoal}
                  orderRender={orderRender}
                />
              </>
            ) : (
              <div className="row">
                <div className="col s12 goal-page-overview">
                  <h3>Education Goals</h3>
                  <div className="goal-page-subheader">
                    {/* <ul className="goal-tabs">
                      {renderGoalsForCategory("Education")}
                    </ul> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div id="Travel">
          <div className="col s3">
            {userInfo ? (
              <>
                {" "}
                <UserProfile
                  userPicture={userInfo.image ? userInfo.image : user.picture}
                  username={userInfo.username}
                  email={userInfo.email}
                  incompleteGoals={incompleteGoals}
                  buddies={
                    allBuddies ? getUnique(allBuddies, "username") : null
                  }
                />
                {/* <BuddyList
                  myBuddies={myBuddies}
                  userEmail={userInfo.email}
                  userID={userInfo.id}
                  makeid={makeid}
                  buddies={
                    allBuddies ? getUnique(allBuddies, "username") : null
                  }
                />{" "} */}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="col s9">
            {currentGoal ? (
              <>
                <div className="row">
                  <div className="col s12 goal-page-overview">
                    <h3>Travel Goals</h3>
                    <div className="goal-page-subheader">
                      {/* <ul className="goal-tabs">
                        {renderGoalsForCategory("Travel")}
                      </ul> */}
                    </div>
                  </div>
                </div>

                <GoalDetail
                  userId={userInfo.id}
                  goal={currentGoal}
                  orderRender={orderRender}
                />
              </>
            ) : (
              <div className="row">
                <div className="col s12 goal-page-overview">
                  <h3>Fitness Goals</h3>
                  <div className="goal-page-subheader">
                    {/* <ul className="goal-tabs">
                      {renderGoalsForCategory("Travel")}
                    </ul> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Goals;
