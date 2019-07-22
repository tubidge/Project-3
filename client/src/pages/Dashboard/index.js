import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import API from "../../utils/API";
import Loading from "../../components/Loading";
import UserProfile from "../../components/UserProfile";
import GoalCard from "../../components/GoalCard";
import Chat from "../../components/Chat";
import Cal from "../../components/Calendar";

import "./style.css";

const Dashboard = () => {
  const { loading, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [, setGoalInfo] = useState({});
  const [incompleteGoals, setIncompleteGoals] = useState([]);
  const [completeGoals, setCompleteGoals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState([]);
  const [allBuddies, setAllBuddies] = useState();
  const [myBuddies, setMyBuddies] = useState();
  const [reRender, setreRender] = useState(false);
  const [calRender, setCalRender] = useState(false);

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
    API.getAllGoals(userInfo.id).then(resp => {
      setIncompleteGoals(resp.data.currentGoals.incomplete);
      renderGoalCards();
    });
  };

  const renderCal = () => {
    setCalRender(!calRender);
    renderCalendar();
  };

  const getAllData = () => {
    API.getUserByEmail(user.email).then(resp => {
      let userData = resp.data;
      API.getAllGoals(userData.id).then(res => {
        let goalData = res.data;
        setGoalInfo(goalData);
        setUserInfo(userData);
        console.log(userData);
        if (userData.buddies) {
          setAllBuddies(userData.buddies.allBuddies);
          setMyBuddies(userData.buddies.myBuddies);
        }
        setIncompleteGoals(goalData.currentGoals.incomplete);
        setCompleteGoals(goalData.currentGoals.complete);
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
        renderCal={renderCal}
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

  const renderCalendar = () => {
    return (
      <Cal userId={userInfo.id} orderRender={orderRender} render={calRender} />
    );
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
            completeGoals={completeGoals}
            buddies={allBuddies ? getUnique(allBuddies, "username") : null}
          />
          <div>
            <Link
              to={{
                pathname: "/buddies",
                state: {
                  user: user.email
                }
              }}
              className="link"
            >
              <h5 id="findBuddies_dashboard">
                Find Buddies <i className="material-icons">person_add</i>
              </h5>
            </Link>
          </div>
          {userInfo.buddies.allBuddies ? (
            <Chat
              userInfo={userInfo}
              myBuddies={myBuddies}
              buddies={allBuddies}
              buddiesUsername={
                allBuddies ? getUnique(allBuddies, "username") : null
              }
              buddiesEmail={allBuddies ? getUnique(allBuddies, "email") : null}
              makeid={makeid}
            />
          ) : (
            <div id="noBuddies">
              <p>You don't have any Buddies... yet!</p>
              <p>
                If you are having a hard time finding Buddies, just{" "}
                <Link
                  to="/buddies"
                  style={{ borderBottom: "1px dashed #2867aa" }}
                >
                  click here
                </Link>{" "}
                to generate some matches based on your goals!
              </p>
              <p>
                So if you haven't added any goals, you may want to do that
                first!
              </p>
            </div>
          )}
        </div>
        <div style={{ marginTop: "20px", marginBottom: "20px" }} />
        <div className="col l8 s12">{renderGoalCards()}</div>
        <div className="col s1 nextArrow">
          {activeCategories.length >= 3 && (
            <span
              className="tooltipped"
              data-position="top"
              data-tooltip="More categories"
            >
              <FontAwesomeIcon
                onClick={() => cycleCategories()}
                icon={faChevronRight}
              />
            </span>
          )}
        </div>
        <div className="row">
          <div className="calendar col l8 s12 center-align">
            {renderCalendar()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
