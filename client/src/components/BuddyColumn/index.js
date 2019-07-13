import React from "react";

function BuddyColumn(props) {
  return (
    <div className="col s6">
      <div className="row center-align">
        <div className="goal-sub-title">
          <p className="goal-subtitle">Goal Buddies</p>
        </div>
        <ul className="goal-detail-sublist">{props.children}</ul>
        <button href="#" className="btn-small light-blue accent-4">
          Add Buddy
        </button>
      </div>
    </div>
  );
}

export default BuddyColumn;
