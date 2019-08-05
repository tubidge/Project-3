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
import defaultLionPic from "../../assets/images/lionDefaultProfilePic.jpg";
import "./style.css";

const Dashboard = () => {
  const { loading, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [goalInfo, setGoalInfo] = useState({});
  const [incompleteGoals, setIncompleteGoals] = useState([]);
  const [completeGoals, setCompleteGoals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [, setActive] = useState([]);
  const [allBuddies, setAllBuddies] = useState();
  const [, setMyBuddies] = useState();
  const [reRender] = useState(false);
  const [calRender, setCalRender] = useState(false);

  let stopIndex;
  let activeCategories = [];

  useEffect(() => {
    getAllData();
  }, [reRender]);

  const getUnique = (arr, comp) => {
    const unique = arr
      .map(e => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
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
        if (userData.buddies) {
          setAllBuddies(userData.buddies.allBuddies);
          setMyBuddies(userData.buddies.myBuddies);
        }
        if (goalData.currentGoals) {
          setIncompleteGoals(goalData.currentGoals.incomplete);
          setCompleteGoals(goalData.currentGoals.complete);
        }

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
        goals={goalInfo}
        renderCal={renderCal}
      />
    ));
  };

  const cycleCategories = () => {
    activeCategories = [];
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
      <Cal
        userId={userInfo.id}
        goals={goalInfo}
        orderRender={orderRender}
        render={calRender}
      />
    );
  };

  if (loading || !userInfo || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="hero-image" />
      <div className="dashboardContainer">
        <div className="row">
          <div className="col l3 s12" style={{ marginTop: "-130px" }}>
            <UserProfile
              userPicture={userInfo.image ? userInfo.image : defaultLionPic}
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
                <h5 className="findBuddies_Dashboard">
                  Find Buddies <i className="material-icons">person_add</i>
                </h5>
              </Link>
            </div>
            {allBuddies ? (
              <Chat
                getAllData={getAllData}
                userInfo={userInfo}
                buddies={allBuddies}
                buddiesUsername={
                  allBuddies ? getUnique(allBuddies, "username") : null
                }
                buddiesEmail={
                  allBuddies ? getUnique(allBuddies, "email") : null
                }
                makeid={makeid}
              />
            ) : (
              <div className="noBuddies">
                <p>You don't have any Buddies... yet!</p>
                <p>
                  If you are having a hard time finding Buddies, just{" "}
                  <Link
                    to="/buddies"
                    style={{ borderBottom: "1px dashed #2867aa" }}
                  >
                    click here{" "}
                  </Link>
                  to generate some matches based on your goals.
                </p>
                <p>
                  So if you haven't added any goals, you may want to do that
                  first to get the best matches.
                </p>
              </div>
            )}
          </div>
          <div style={{ marginTop: "20px", marginBottom: "20px" }} />
          <div className="col l8 s12">{renderGoalCards()}</div>
          <div className="nextArrow">
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
            <div className="calendar col l9 s12 center-align">
              {renderCalendar()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
