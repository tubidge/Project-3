import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import FindingBuddy from "../../components/FindingBuddy";
import API from "../../utils/API";
import M from "materialize-css";
import { useAuth0 } from "../../react-auth0-spa";
import Fuse from "fuse.js";
import Footer from "../../components/Footer";

import "./style.css";

const Buddies = props => {
  const { loading, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [findingBuddy, setFindingBuddy] = useState(false);
  const [users, setUsers] = useState([]);
  const [goals, setGoals] = useState([]);
  const [buddyGoals, setBuddyGoals] = useState([]);
  const [matchesFound, setMatchesFound] = useState([]);
  const [search, setSearch] = useState("");
  const [searchMatchFound, setSearchMatchFound] = useState([]);
  const [currentUserRemoved, setCurrentUserRemoved] = useState([]);

  // for fuse.js
  const options = {
    shouldSort: true,
    threshold: 0.5, // lower value will result in a more exact match
    includeScore: true,
    location: 0,
    distance: 100,
    maxPatternLength: 16,
    minMatchCharLength: 1,
    keys: ["name", "category", "username", "email", "firstName", "lastName"]
  };

  let matches = [];
  let searchResults = [];
  // end of buddy match variables

  useEffect(() => {
    M.AutoInit();
    // Get all goals from all users
    let results = [];
    let currentUser = props.location.state.user;
    console.log(currentUser);
    API.getAllUsers().then(res => {
      const removedCurrentUser = res.data.filter(
        user => user.email !== currentUser
      );
      setCurrentUserRemoved(removedCurrentUser);
      removedCurrentUser.map(user => {
        let username = user.username;
        let email = user.email;
        let firstName = user.firstName;
        let lastName = user.lastName;
        let image = user.image;
        let userId = user.id;
        API.getAllGoals(user.id).then(res => {
          if (res.data.currentGoals.incomplete.length > 0) {
            let goal = res.data.currentGoals.incomplete;
            goal.map(goal => {
              let id = goal.id;
              let name = goal.name;
              let category = goal.category;
              return results.push({
                id,
                name,
                category,
                userId,
                username,
                email,
                firstName,
                lastName,
                image,
                user
              });
            });
          }
        });
        return results;
      });
      setUsers(res.data);
      console.log(results);
      setBuddyGoals(results);
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

  const searchUsers = (e, search) => {
    e.preventDefault();
    let fuse = new Fuse(buddyGoals, options);
    const searchMatches = fuse.search(search);
    searchMatches
      .map(match => match.score)
      .sort(function(a, b) {
        return a - b;
      });
    searchMatches.map(match => {
      searchResults.push(match);
    });
    if (searchResults.length === 0) {
      if (search) {
        M.toast({
          html: `<i class="material-icons left">error</i>No results found.`,
          displayLength: 2000
        });
      }
    }
    console.log(searchResults);
    setSearchMatchFound(searchResults);
  };

  const clearInputs = e => {
    setSearch("");
    searchUsers(e);
  };

  const findBuddy = () => {
    setFindingBuddy(true);
    setTimeout(() => {
      setFindingBuddy(false);
    }, 5000);

    let fuse = new Fuse(buddyGoals, options); // buddyGoals is an array
    const goalMatches = goals.map(goal => {
      return fuse.search(goal.name);
    });
    console.log(goalMatches);
    goalMatches
      .map(match => match.score)
      .sort(function(a, b) {
        return a - b;
      });
    console.log("Top Matches for Each Goal");
    goalMatches.map(match => {
      if (match.length === 0) {
        console.log("No match found.");
      } else {
        API.getUserByGoal(match[0].item.id).then(res => {
          let id = match[0].item.id;
          let name = match[0].item.name;
          let category = match[0].item.category;
          let score = match[0].score;
          let image = res.data.image;
          let username = res.data.username;
          let userId = res.data.id;
          let topMatch = {
            category: category,
            goalId: id,
            goalName: name,
            matchScore: score,
            username: username,
            userId: userId,
            image: image
          };
          matches.push(topMatch);
          console.log(topMatch);
        });
        setMatchesFound(matches);
      }
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

  if (loading || !users || isLoading) {
    return <Loading />;
  }

  if (findingBuddy) {
    return <FindingBuddy />;
  }

  return (
    <>
      <div id="buddiesPage">
        <div className="container">
          <h1 className="text-center">Find Buddies</h1>
          <div className="row">
            <div className="col s12">
              <form>
                <div className="input-field">
                  <input
                    placeholder="Search by username, goal, category..."
                    id="search"
                    type="search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                  <i
                    className="material-icons"
                    onClick={e => clearInputs(e, "")}
                  >
                    close
                  </i>
                </div>
                <div className="input-field">
                  <div className="input-group-append">
                    <button
                      style={{ marginRight: "10px" }}
                      className="btn searchBtn"
                      type="submit"
                      onClick={e => searchUsers(e, search)}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col s6">
              {/* Check to see if any items are found*/}
              {searchMatchFound.length ? (
                <>
                  <ul className="collection">
                    {searchMatchFound.map(result => (
                      <li
                        className="collection-item avatar"
                        key={result.item.id}
                      >
                        <img
                          src={result.item.image}
                          alt={result.item.username}
                          className="circle responsive-img"
                        />
                        <span className="title">
                          Owner: {result.item.username}
                        </span>
                        <p>
                          Goal: {result.item.name}
                          <br />
                          Category: {result.item.category}
                        </p>
                        <Link to={`/buddy-profile/${result.item.userId}`}>
                          View Profile
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : users.length ? (
                <>
                  <ul className="collection">
                    {currentUserRemoved.map(user => (
                      <li key={user.id} className="collection-item avatar">
                        <img
                          src={user.image}
                          alt={user.username}
                          className="circle responsive-img"
                        />
                        <span className="title">{user.username}</span>
                        <p>{`${user.firstName} ${user.lastName}`}</p>
                        <Link to={`/buddy-profile/${user.id}`}>
                          View Profile
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
            <div className="col s6">
              <div className="card">
                <div className="buddy-pair card-content">
                  <span className="card-title">Get Paired with a Buddy</span>
                  <p>
                    Find someone with similar goals, so you can help each other!
                  </p>
                  <div className="card-action">
                    <button className="btn findBuddy" onClick={findBuddy}>
                      Click here to begin search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {matchesFound.length > 0 ? (
              <div id="buddyMatches">
                <div className="col s6">
                  <div className="card">
                    <div className="card-content">
                      <span className="card-title">Your Matches!</span>
                      <p>
                        Here are some potentials Buddies for you. Check out
                        their profiles and see if it's a good fit.
                      </p>
                      <ul className="collection">
                        {matchesFound &&
                          getUnique(matchesFound, "userId").map(match => (
                            <li
                              className="collection-item avatar"
                              key={match.userId}
                            >
                              <img
                                src={match.image}
                                alt={match.username}
                                className="circle responsive-img"
                              />
                              <span className="title">{match.username}</span>
                              <p>
                                Goal: {match.goalName}
                                <br />
                                Category: {match.category}
                              </p>
                              <Link
                                to={`/buddy-profile/${match.userId}`}
                                target="_blank"
                              >
                                View Profile
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="col s6" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Buddies;
