import React from "react";
import { Link } from "react-router-dom";

const BuddyList = props => {
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
                  <Link to="/buddyProfile">{buddy}</Link>
                  <img
                    className="circle responsive-img z-depth-1"
                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"
                    alt="Profile"
                  />
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
