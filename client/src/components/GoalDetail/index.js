import React from "react";
// import "./style.css";  Why doesn't this stylesheet do anything?

const GoalDetail = props => {
  return (
    <div className="card goal-card">
      <div className="card-content">
        <div className="card-title center-align">{props.name}</div>
        <div className="row goal-detail-row center-align">Due: {props.due}</div>
        <div className="row goal-detail-row center-align">{props.desc}</div>
        <div className="row" />

        <div className="row">
          <div className="col s6 col-border">
            <div className="row center-align">
              <div className="goal-sub-title center-align">
                <p className="goal-subtitle">Milestones</p>
              </div>
              <ul className="goal-detail-sublist">
                <li>{props.milestone}</li>
                <li>Milestone 2</li>
                <li>Milestone 3</li>
                <li>Milestone 4</li>
              </ul>
              <button href="#" className="btn-small light-blue accent-4">
                Add Milestone
              </button>
            </div>
          </div>

          <div className="col s6">
            <div className="row center-align">
              <div className="goal-sub-title">
                <p className="goal-subtitle">Goal Buddies</p>
              </div>
              <ul className="goal-detail-sublist">
                <li>Buddy 1</li>
                <li>Buddy 2</li>
                <li>Buddy 3</li>
                <li>Buddy 4</li>
              </ul>
              <button href="#" className="btn-small light-blue accent-4">
                Add Buddy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalDetail;
