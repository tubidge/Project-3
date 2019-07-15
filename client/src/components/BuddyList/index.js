import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

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
    console.log(props.buddies);
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
            {props.buddies &&
              props.buddies.map(buddy => (
                <li key={props.makeid(5)} className="collection-item avatar">
                  <img
                    className="circle responsive-img z-depth-1"
                    src={buddy.image}
                    alt="Profile"
                  />
                  <span className="title">{buddy.username}</span>
                  <p>
                    <Link
                      to={`/buddy-profile/${buddy.buddyId}`}
                      style={{ marginRight: "15px" }}
                    >
                      View Profile
                    </Link>
                    <Link to="#">Chat</Link>
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
