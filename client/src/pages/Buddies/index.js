import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Autocomplete } from "react-materialize";
import { useAuth0 } from "../../react-auth0-spa";
import API from "../../utils/API";
import Loading from "../../components/Loading";
import FindingBuddy from "../../components/FindingBuddy";
import Fuse from "fuse.js";
import "./style.css";

const Buddies = () => {
  const { loading, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [findingBuddy, setFindingBuddy] = useState(false);
  const [users, setUsers] = useState([]);
  const [goals, setGoals] = useState([]);
  const [buddyGoals, setBuddyGoals] = useState([]);
  const [autocompleteData, setAutocompleteData] = useState([]);
  const [matchesFound, setMatchesFound] = useState([]);

  // for fuse.js
  const options = {
    shouldSort: true,
    threshold: 0.7, // lower value will result in a more exact match
    includeScore: true,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["name"]
  };

  let data;
  let matches = [];

  useEffect(() => {
    // Get all goals from all users
    let results = [];
    let currentUser = user.email;
    API.getAllUsers().then(res => {
      console.log(res.data);
      const removedCurrentUser = res.data.filter(
        user => user.email !== currentUser
      );
      removedCurrentUser.map(user => {
        API.getAllGoals(user.id).then(res => {
          if (res.data.currentGoals.incomplete.length > 0) {
            let goal = res.data.currentGoals.incomplete;
            goal.map(goal => {
              let id = goal.id;
              let name = goal.name;
              return results.push({ id, name });
            });
          }
        });
        return results;
      });
      setUsers(res.data);
      // end of get all goals

      // Autocomplete
      data = res.data.reduce((acc, user) => {
        let { username } = user;
        return { ...acc, [username]: null };
      }, {});

      data = {
        data
      };
      // end of autocomplete

      setBuddyGoals(results);
      setAutocompleteData(data);
      getUserGoals();
    });
  }, []);

  const getUserGoals = () => {
    API.getUserByEmail(user.email).then(resp => {
      let userData = resp.data;
      API.getAllGoals(userData.id).then(res => {
        console.log(res.data);
        let goalData = res.data;
        setGoals(goalData.currentGoals.incomplete);
        setIsLoading(false);
      });
    });
  };

  const showBuddyProfile = id => {
    window.location.assign("/buddy-profile/" + id);
  };

  const findBuddy = () => {
    setFindingBuddy(true);
    setTimeout(() => {
      setFindingBuddy(false);
    }, 5000);

    let result;
    let fuse = new Fuse(buddyGoals, options); // buddyGoals is an array
    const goalMatches = goals.map(goal => {
      result = fuse.search(goal.name);
      return result;
    });
    console.log(
      "==============================================================="
    );
    console.log("Matches for Each Goal");
    console.log(
      "==============================================================="
    );
    console.log(goalMatches);
    goalMatches
      .map(match => match.score)
      .sort(function(a, b) {
        return a - b;
      });
    console.log(
      "==============================================================="
    );
    console.log("Top Matches for Each Goal");
    console.log(
      "==============================================================="
    );
    goalMatches.map(match => {
      if (match.length === 0) {
        console.log("No match found.");
      } else {
        API.getUserByGoal(match[0].item.id).then(res => {
          let id = match[0].item.id;
          let name = match[0].item.name;
          let score = match[0].score;
          let username = res.data.username;
          let userId = res.data.id;
          let topMatch = {
            goalId: id,
            goalName: name,
            matchScore: score,
            username: username,
            userId: userId
          };
          matches.push(topMatch);
          console.log(matches);
        });
        setMatchesFound(matches);
      }
    });
  };

  if (loading || !users || isLoading) {
    return <Loading />;
  }

  if (findingBuddy) {
    return <FindingBuddy />;
  }

  return (
    <>
      <div className="container">
        <h1 className="text-center">Search for Buddies</h1>
        <div className="row">
          {matchesFound.length > 0 ? <h4>Your Matches</h4> : null}
          {matchesFound &&
            matchesFound.map(match => (
              <div key={match.userId} className="col s3">
                <div className="card">
                  <div className="card-content">
                    <div className="card-title">{match.username}</div>
                    <p>{match.goalName}</p>
                    <Link to={`/buddy-profile/${match.userId}`}>
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <Autocomplete options={autocompleteData} placeholder="username" />
        <div className="row">
          <div className="col-sm-6 mx-auto">
            <div className="input-field mb-3">
              <div className="input-group-append">
                <button
                  style={{ marginRight: "10px" }}
                  className="btn grey darken-3"
                  type="button"
                >
                  Search
                </button>
                <button className="btn amber darken-1" onClick={findBuddy}>
                  Find a Buddy
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* Check to see if any items are found*/}
          {users.length ? (
            <>
              <ul className="collection">
                {users.map(user => (
                  <li key={user.id} className="collection-item avatar">
                    <img
                      src={user.image}
                      alt={user.username}
                      className="circle responsive-img"
                    />
                    <span className="title">{user.username}</span>
                    <p>{`${user.firstName} ${user.lastName}`}</p>
                    <Link to="#" onClick={() => showBuddyProfile(user.id)}>
                      View Profile
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Buddies;
