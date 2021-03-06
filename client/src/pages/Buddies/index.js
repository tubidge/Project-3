import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import FindingBuddy from "../../components/FindingBuddy";
import API from "../../utils/API";
import M from "materialize-css";
import { useAuth0 } from "../../react-auth0-spa";
import Fuse from "fuse.js";

import defaultLionPic from "./lionDefaultProfilePic.jpg";
import "./style.css";

const Buddies = props => {
  const { loading, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [findingBuddy, setFindingBuddy] = useState(false);
  const [users, setUsers] = useState([]);
  const [, setGoals] = useState([]);
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
    maxPatternLength: 20,
    minMatchCharLength: 1,
    keys: ["name", "category"]
  };

  const searchOptions = {
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
    let results = [];
    API.getAllUsers().then(res => {
      const removedCurrentUser = res.data.filter(
        index => index.email !== user.email
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
      setBuddyGoals(results);
      setIsLoading(false);
    });
  }, []);

  const getUserGoals = () => {
    API.getBasicUserByEmail(user.email).then(resp => {
      API.getAllGoals(resp.data.id).then(res => {
        setGoals(res.data.currentGoals.incomplete);
        findBuddy(res.data.currentGoals.incomplete);
      });
    });
  };

  const searchUsers = (e, search) => {
    e.preventDefault();
    let fuse = new Fuse(buddyGoals, searchOptions);
    const searchMatches = fuse.search(search);
    searchMatches
      .map(match => match.score)
      .sort(function(a, b) {
        return a - b;
      });
    searchMatches.map(match => {
      return searchResults.push(match);
    });
    if (searchResults.length === 0) {
      if (search) {
        M.toast({
          html: `<i class="material-icons left">error</i>No results found.`,
          displayLength: 2000
        });
      }
    }
    setSearchMatchFound(searchResults);
  };

  const clearInputs = e => {
    setSearch("");
    searchUsers(e);
  };

  const findBuddy = goals => {
    setFindingBuddy(true);
    setTimeout(() => {
      setFindingBuddy(false);
    }, 4000);

    let fuse = new Fuse(buddyGoals, options); // buddyGoals is an array
    const goalMatches = goals.map(goal => {
      return fuse.search(goal.name);
    });
    goalMatches
      .map(match => match.score)
      .sort(function(a, b) {
        return a - b;
      });

    goalMatches.map(match => {
      if (match.length === 0) {
        return null;
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
          return matches.push(topMatch);
        });
        return setMatchesFound(matches);
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
          {matchesFound.length > 0 ? (
            <a href="#buddyMatches">View your matches!</a>
          ) : null}
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
            <div className="col l6 s12">
              <div className="card">
                <div className="card-content">
                  <span className="card-title">
                    <span className="brandedText">Get Paired with a Buddy</span>
                  </span>
                  <p>
                    Find someone with similar goals, so you can help each other!
                  </p>
                  <div className="card-action">
                    <button className="btn findBuddy" onClick={getUserGoals}>
                      Begin Search
                      <i className="material-icons right">group_add</i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {matchesFound.length > 0 ? (
              <div id="buddyMatches">
                <div className="col l6 s12">
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
                              <Link to={`/buddy-profile/${match.userId}`}>
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
            <div className="col l6 s12">
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
                          src={
                            result.item.image
                              ? result.item.image
                              : defaultLionPic
                          }
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
                          src={user.image ? user.image : defaultLionPic}
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
            <div className="col s6" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Buddies;
