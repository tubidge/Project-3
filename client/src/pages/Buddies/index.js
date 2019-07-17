import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import FindingBuddy from "../../components/FindingBuddy";
import API from "../../utils/API";

// Depenencies
import { Autocomplete } from "react-materialize";
import { useAuth0 } from "../../react-auth0-spa";
import Fuse from "fuse.js";

import "./style.css";

const Buddies = props => {
  const { loading, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [findingBuddy, setFindingBuddy] = useState(false);
  const [users, setUsers] = useState([]);
  const [goals, setGoals] = useState([]);
  const [buddyGoals, setBuddyGoals] = useState([]);
  const [matchesFound, setMatchesFound] = useState([]);
  const [autocompleteData, setAutocompleteData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  // for fuse.js
  const options = {
    shouldSort: true,
    threshold: 0.5, // lower value will result in a more exact match
    includeScore: true,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["name"]
  };

  let data;
  let matches = [];
  // end of buddy match variables

  useEffect(() => {
    console.log(props.location.state.user);
    // Get all goals from all users
    let results = [];
    // let currentUser = props.location.state.user;
    setCurrentUser(props.location.state.user);
    API.getAllUsers().then(res => {
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
      getUserGoals(props.location.state.user);
    });
  }, []);

  const getUserGoals = email => {
    API.getUserByEmail(email).then(resp => {
      API.getAllGoals(resp.data.id).then(res => {
        setGoals(res.data.currentGoals.incomplete);
        setIsLoading(false);
      });
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

  // const searchUsers = () => {
  //   console.log(search);
  //   API.getUserByUsername(search).then(res => {
  //     console.log(res.data);
  //   });
  // };

  const findBuddy = () => {
    setFindingBuddy(true);
    setTimeout(() => {
      setFindingBuddy(false);
    }, 5000);

    let fuse = new Fuse(buddyGoals, options); // buddyGoals is an array
    const goalMatches = goals.map(goal => {
      return fuse.search(goal.name);
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
          console.log(topMatch);
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
            getUnique(matchesFound, "userId").map(match => (
              <div key={match.userId} className="col s3">
                <div className="card">
                  <div className="card-content">
                    <div className="card-title">{match.username}</div>
                    <p>{match.goalName}</p>
                    {/* <Link to={`/buddy-profile/${match.userId}`} target="_blank">
                      View Profile
                    </Link> */}
                    <Link
                      to={{
                        pathname: "/buddy-profile/" + match.userId,
                        state: {
                          user: currentUser
                        }
                      }}
                    >
                      Find Buddies
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <Autocomplete
          options={autocompleteData}
          placeholder="username"
          type="text"
          name="username"
          onChange={e => setSearch(e.target.value)}
        />
        <div className="row">
          <div className="col-sm-6 mx-auto">
            <div className="input-field mb-3">
              <div className="input-group-append">
                <button
                  style={{ marginRight: "10px" }}
                  className="btn grey darken-3"
                  type="button"
                  // onClick={searchUsers}
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
                    <Link to={`/buddy-profile/${user.id}`}>View Profile</Link>
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
