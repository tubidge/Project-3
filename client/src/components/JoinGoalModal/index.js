import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import M from "materialize-css";
import "./style.css";

const JoinGoalModal = props => {
  const [selectedGoal, setSelectedGoal] = useState("");
  const [goal, setGoal] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    M.AutoInit();
    let modals = document.querySelectorAll(".modal");
    let options = {
      dismissible: true,
      inDuration: 200,
      outDuration: 400
    };
    M.Modal.init(modals, options);
  }, []);

  const handleClick = () => {
    return <h1>Hello</h1>;
  };

  const handleChange = selectedGoal => {
    setSelectedGoal(selectedGoal);
    setGoal(selectedGoal.label);
    setSelectedDuration(selectedDuration);
    setDuration(selectedDuration.label);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.addBuddy(
      selectedDuration.label,
      props.buddyId,
      props.buddyGoalId,
      selectedGoal.value,
      props.userId
    );
  };

  return (
    <>
      <div id="joinGoalModal">
        <Link to="#" className={props.className} data-target={props.dataTarget}>
          {props.btnName}
        </Link>
        <div id={props.dataTarget} className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div>
                <h5>
                  Connect{" "}
                  <span className="joinGoal">{props.buddyGoalName}</span> with
                  one of your goals!
                </h5>
                <p>
                  When you select a goal, you and{" "}
                  <span className="joinGoal">{props.buddyName}</span> will
                  become buddies for the duration you choose.
                </p>
              </div>
              <div className="input-field col s12 left-align">
                <Select
                  options={props.currentUserGoals.map(goal => ({
                    label: goal.name,
                    value: goal.id
                  }))}
                  value={selectedGoal}
                  onChange={handleChange}
                />
              </div>
              <div className="input-field col s12 left-align">
                <Select
                  options={[
                    { label: "1 week", value: 1 },
                    { label: "2 weeks", value: 2 },
                    { label: "3 weeks", value: 3 },
                    { label: "1 month", value: 4 },
                    { label: "Goal due date", value: 5 }
                  ]}
                />
              </div>

              <div className="modal-footer">
                <button className="btn red modal-close">X</button>
                <input className="btn modal-close" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinGoalModal;
