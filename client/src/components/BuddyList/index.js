import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BuddyList = props => {
  const [buddies, setBuddies] = useState([]);

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

  useEffect(() => {
    setBuddies(getUnique(props.buddies, "username"));
  }, []);

  return (
    <>
      <section className="buddiesList">
        <ul className="collection with-header">
          <li className="collection-header">
            <h5>Buddies</h5>
            <Link to="/buddies">Search Buddies</Link>
          </li>
          <span>
            {buddies &&
              buddies.map(buddy => (
                <li key={props.makeid(5)} className="collection-item avatar">
                  <img
                    className="circle responsive-img z-depth-1"
                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"
                    alt="Profile"
                  />
                  <span className="title">
                    <Link to="#">{buddy.username}</Link>
                  </span>
                  <p>
                    <Link to={`/buddy-profile/${buddy.id}`}>View Profile</Link>
                  </p>
                </li>
              ))}
            {!props.buddies && null}
          </span>
        </ul>
      </section>
    </>
  );
};

export default BuddyList;
