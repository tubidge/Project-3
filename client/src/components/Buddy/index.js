import React from "react";
import "./style.css";

function Buddy(props) {
  return (
    <>
      <li className="goal-buddy">
        <div className="col s6">
          <p className="buddy-name">{props.name}</p>
        </div>
        <div className="col s6">
          <p>
            <a href="#">View Profile</a>
          </p>
        </div>
      </li>
    </>
  );
}

export default Buddy;
