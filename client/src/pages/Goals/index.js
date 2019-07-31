import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";
import GoalDetail from "../../components/GoalDetail";
import GoalOverview from "../../components/GoalOverview";
import UserProfile from "../../components/UserProfile";
import Chat from "../../components/Chat";
import M from "materialize-css";
import "./style.css";
import API from "../../utils/API";
import Loading from "../../components/Loading";
import defaultLionPic from "../../components/Form/lionDefaultProfilePic.jpg";

const Goals = () => {
  const { user } = useAuth0();

  const [isLoading, setIsLoading] = useState(true);
  const [incompleteGoals, setIncompleteGoals] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [, setGoalInfo] = useState({});
  const [, setCategories] = useState([]);
  const [allBuddies, setAllBuddies] = useState();
  const [myBuddies, setMyBuddies] = useState();
  const [currentGoal, setCurrentGoal] = useState(false);
  const [reRender, setreRender] = useState(false);
  const [currentGoals, setCurrentGoals] = useState();
  const [pastGoals, setPastGoals] = useState();
  const [goalArr, setGoalArr] = useState();
  const [startIndex, setStartIndex] = useState();
  const [completeGoals, setCompleteGoals] = useState();

  useEffect(() => {
    M.AutoInit();
    getAllData();
  }, [currentGoal, reRender]);

  const getAllData = () => {
    API.getGoalPageInfo(user.email).then(resp => {
      let userData = resp.data;
      setGoalInfo(userData.activeGoals);
      if (userData.buddies) {
        setAllBuddies(userData.buddies.allBuddies);
        setMyBuddies(userData.buddies.myBuddies);
      }
      let current = [];
      let past = [];
      userData.activeGoals.incomplete.forEach(index => {
        if (index.name) {
          current.push(index);
        }
      });
      userData.activeGoals.completed.forEach(index => {
        if (index.name) {
          past.push(index);
        }
      });

      userData.pastGoals.incomplete.forEach(index => {
        if (index.name) {
          past.push(index);
        }
      });
      userData.pastGoals.completed.forEach(index => {
        if (index.name) {
          past.push(index);
        }
      });
      setCurrentGoals(current);
      setPastGoals(past);
      setIncompleteGoals(userData.activeGoals.incomplete);
      setCompleteGoals(userData.activeGoals.completed);
      setCategories(
        userData.activeGoals.incomplete
          .map(goal => goal.category)
          .reduce(
            (unique, item) =>
              unique.includes(item) ? unique : [...unique, item],
            []
          )
      );
      setUserInfo(userData);
      stopLoading();
    });
  };

  const stopLoading = () => {
    setIsLoading(false);
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
    let res = [];
    results.map(goal => {
      return res.push(goal.id);
    });
    setGoalArr(res);
  };

  const renderGoalDetail = id => {
    setStartIndex(id);
    const result = incompleteGoals.filter(goal => goal.id === id);

    renderGoalsForCategory(result[0].category, incompleteGoals);

    setCurrentGoal(result[0]);
  };

  const nextGoal = () => {
    let num = goalArr.indexOf(startIndex);

    let id = goalArr[num + 1];
    if (!id) {
      id = goalArr[0];
    }
    setStartIndex(id);
    const result = incompleteGoals.filter(goal => goal.id === id);

    setCurrentGoal(result[0]);
  };

  const prevGoal = () => {
    let num = goalArr.indexOf(startIndex);

    let id = goalArr[num - 1];
    if (!id) {
      id = goalArr[goalArr.length - 1];
    }
    setStartIndex(id);
    const result = incompleteGoals.filter(goal => goal.id === id);

    setCurrentGoal(result[0]);
  };

  const exitGoal = () => {
    setCurrentGoal(false);
  };

  const handleClick = () => {
    setCurrentGoal(false);
  };

  const orderRender = () => {
    setreRender(!reRender);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="hero-image" />
      <div className="row">
        <div style={{ marginTop: "-130px" }} className="col s3">
          {userInfo ? (
            <>
              <UserProfile
                userPicture={userInfo.image ? userInfo.image : defaultLionPic}
                username={userInfo.username}
                email={userInfo.email}
                incompleteGoals={incompleteGoals}
                completeGoals={completeGoals}
                buddies={allBuddies ? getUnique(allBuddies, "username") : null}
              />
              {userInfo.buddies && (
                <Chat
                  userInfo={userInfo}
                  myBuddies={myBuddies}
                  buddies={allBuddies}
                  buddiesUsername={
                    allBuddies ? getUnique(allBuddies, "username") : null
                  }
                  buddiesEmail={
                    allBuddies ? getUnique(allBuddies, "email") : null
                  }
                  makeid={makeid}
                />
              )}
              {!userInfo.buddies && (
                <div id="noBuddies">
                  <p>You don't have any Buddies... yet!</p>
                  <p>
                    If you are having a hard time finding Buddies, just{" "}
                    <Link
                      to="/buddies"
                      style={{ borderBottom: "1px dashed #2867aa" }}
                    >
                      click here
                    </Link>
                    to generate some matches based on your goals!
                  </p>
                  <p>
                    So if you haven't added any goals, you may want to do that
                    first!
                  </p>
                </div>
              )}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="col s9 tabsDiv_GoalPage">
          <ul className="tabs">
            <li className="tab col">
              <a href="#Fitness" onClick={handleClick}>
                Fitness
              </a>
            </li>
            <li className="tab col">
              <a href="#Wellness" onClick={handleClick}>
                Wellness
              </a>
            </li>
            <li className="tab col">
              <a href="#Financial" onClick={handleClick}>
                Financial
              </a>
            </li>
            <li className="tab col">
              <a href="#Education" onClick={handleClick}>
                Education
              </a>
            </li>
            <li className="tab col">
              <a href="#Travel" onClick={handleClick}>
                Travel
              </a>
            </li>
          </ul>
        </div>

        <div id="Fitness">
          <div className="col s9">
            {currentGoal ? (
              <>
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
                        <div className="card past-overview-card">
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
                {userInfo ? (
                  <GoalOverview
                    userId={userInfo.id}
                    category="Fitness"
                    currentGoals={currentGoals}
                    renderGoalDetail={renderGoalDetail}
                    renderGoalsForCategory={renderGoalsForCategory}
                    pastGoals={pastGoals}
                    orderRender={orderRender}
                  />
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>

        <div id="Wellness">
          <div className="col s9">
            {currentGoal ? (
              <>
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
                        <div className="card past-overview-card">
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
                {userInfo ? (
                  <GoalOverview
                    userId={userInfo.id}
                    currentGoals={currentGoals}
                    category="Wellness"
                    renderGoalDetail={renderGoalDetail}
                    pastGoals={pastGoals}
                    renderGoalsForCategory={renderGoalsForCategory}
                    orderRender={orderRender}
                  />
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>

        <div id="Financial">
          <div className="col s9">
            {currentGoal ? (
              <>
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
                        <div className="card past-overview-card">
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
                {userInfo ? (
                  <GoalOverview
                    userId={userInfo.id}
                    category="Financial"
                    currentGoals={currentGoals}
                    pastGoals={pastGoals}
                    renderGoalDetail={renderGoalDetail}
                    renderGoalsForCategory={renderGoalsForCategory}
                    orderRender={orderRender}
                  />
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>

        <div id="Education">
          <div className="col s9">
            {currentGoal ? (
              <>
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
                        <div className="card past-overview-card">
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
                {userInfo ? (
                  <GoalOverview
                    userId={userInfo.id}
                    pastGoals={pastGoals}
                    category="Education"
                    currentGoals={currentGoals}
                    renderGoalDetail={renderGoalDetail}
                    renderGoalsForCategory={renderGoalsForCategory}
                    orderRender={orderRender}
                  />
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>

        <div id="Travel">
          <div className="col s9">
            {currentGoal ? (
              <>
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
                        <div className="card past-overview-card">
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
                {userInfo ? (
                  <GoalOverview
                    userId={userInfo.id}
                    pastGoals={pastGoals}
                    category="Travel"
                    currentGoals={currentGoals}
                    renderGoalDetail={renderGoalDetail}
                    renderGoalsForCategory={renderGoalsForCategory}
                    orderRender={orderRender}
                  />
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Goals;
