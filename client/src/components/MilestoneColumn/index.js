import React from "react";

const MilestoneColumn = props => {
  return (
    <div className="col s6 col-border">
      <div className="row center-align">
        <div className="goal-sub-title center-align">
          <p className="goal-subtitle">Milestones</p>
        </div>
        <ul className="goal-detail-sublist">{props.children}</ul>
        <button href="#" className="btn-small light-blue accent-4">
          Add Milestone
        </button>
      </div>
    </div>
  );
};

export default MilestoneColumn;
