import React from "react";

const GoalCard = props => {
  return (
    <div className="card">
      <div className="content">
        <ul>
          <li>
            <strong>Name:</strong> {props.name}
          </li>
          <li>
            <strong>Category:</strong> {props.category}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GoalCard;
