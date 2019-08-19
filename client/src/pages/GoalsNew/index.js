import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../react-auth0-spa";
import Loading from "../../components/Loading";
import UserProfile from "../../components/UserProfile";
import API from "../../utils/API";

const GoalsNew = () => {
  const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [goalInfo, setGoalInfo] = useState([]);
  const [allBuddies, setAllBuddies] = useState([]);
  const [buddiesChat, setBuddiesChat] = useState([]);
  const [incompleteGoals, setIncompleteGoals] = useState([]);
  const [completeGoals, setCompleteGoals] = useState([]);

  async function getData() {
    const res = await API.getGoalPageInfo(user.email);

    setUserInfo({
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      email: res.data.email,
      username: res.data.username,
      image: res.data.image
    });

    setGoalInfo(res.data.activeGoals);
    setIncompleteGoals(res.data.activeGoals.incomplete);
    setCompleteGoals(res.data.activeGoals.completed);

    setBuddiesChat(res.data.buddies.myBuddies);
    setAllBuddies([
      ...new Set(res.data.buddies.allBuddies.map(buddy => buddy.username))
    ]);

    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="hero-image" />
      <div className="row">
        <div className="col l3 s12">
          {userInfo && (
            <UserProfile
              email={userInfo.email}
              username={userInfo.username}
              userPicture={userInfo.image}
              incompleteGoals={incompleteGoals}
              completeGoals={completeGoals}
              buddies={allBuddies}
            />
          )}
        </div>
        <div className="col l9 s12">Goals</div>
      </div>
    </>
  );
};

export default GoalsNew;
