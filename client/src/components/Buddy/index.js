import React from "react";
import { Link } from "react-router-dom";
// import "./style.css";

function Buddy(props) {
  return (
    <>
      <li className="goal-buddy">
        <div className="col s6">
          <p className="buddy-name">{props.name}</p>
        </div>
        <div className="col s6">
          <p>
            <Link to="#">View Profile</Link>
          </p>
        </div>
      </li>
    </>
  );
}

export default Buddy;
