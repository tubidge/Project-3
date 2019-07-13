import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Autocomplete } from "react-materialize";
import { useAuth0 } from "../../react-auth0-spa";
import API from "../../utils/API";
import Loading from "../../components/Loading";
<<<<<<< HEAD
=======
import FindingBuddy from "../../components/FindingBuddy";
>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5
import Fuse from "fuse.js";
import "./style.css";

const Buddies = () => {
  const { loading, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
<<<<<<< HEAD
=======
  const [findingBuddy, setFindingBuddy] = useState(false);
>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5
  const [users, setUsers] = useState([]);
  const [goals, setGoals] = useState([]);
  const [buddyGoals, setBuddyGoals] = useState([]);
  const [autocompleteData, setAutocompleteData] = useState([]);

  // for fuse.js
  const options = {
    shouldSort: true,
<<<<<<< HEAD
    threshold: 0.3, // lower value will result in a more exact match
=======
    threshold: 0.5, // lower value will result in a more exact match
>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5
    includeScore: true,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["name"]
  };

  let data;

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

  const findBuddy = () => {
<<<<<<< HEAD
=======
    setFindingBuddy(true);
    setTimeout(() => {
      setFindingBuddy(false);
    }, 5000);

>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5
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
        let id = match[0].item.id;
        let name = match[0].item.name;
        let score = match[0].score;
        let topMatch = {
          "Top Match": {
            id: id,
            name: name,
            score: score
          }
        };
        console.log(topMatch);
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
    <div className="container">
      {/* Use this section to match goals */}
<<<<<<< HEAD
      <button className="btn" onClick={findBuddy}>
        Find Buddy
      </button>
      <div className="row">
=======
      {/* <div className="row">
>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5
        <div className="col s6">
          <h5>All User's Goals</h5>
          {buddyGoals.map(goal => (
            <li key={goal.id} id={goal.id}>
              {goal.name}
            </li>
          ))}
        </div>
        <div className="col s6">
          <h5>Current User's Goals</h5>
          {goals.map(goal => (
            <li key={goal.id} id={goal.id}>
              {goal.name}
            </li>
          ))}
        </div>
<<<<<<< HEAD
      </div>
      <hr />
=======
      </div> */}
>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5
      {/* End of matching section */}

      <h1 className="text-center">Search for Buddies</h1>
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
                  <Link to="#">View Profile</Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h3>No Results to Display</h3>
        )}
      </div>
    </div>
  );
};

export default Buddies;
