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
    let modalOptions = {
      dismissible: true,
      inDuration: 200,
      outDuration: 400
    };
    M.Modal.init(modals, modalOptions);

    let toasts = document.querySelectorAll(".toast");
    let toastOptions = {
      displayLength: 2000
    };
  }, []);

  const clearFields = () => {
    setSelectedGoal("");
    setSelectedDuration("");
    setGoal("");
    setDuration("");
  };

  const handleGoalChange = selectedGoal => {
    setSelectedGoal(selectedGoal);
    setGoal(selectedGoal.label);
  };

  const handleDurationChange = selectedDuration => {
    setSelectedDuration(selectedDuration);
    setDuration(selectedDuration.label);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (selectedDuration === "" || selectedGoal === "") {
      M.toast({
        html: `<i class="material-icons left">error</i>You didn't complete all the requried fields.`,
        displayLength: 2000
      });
    } else {
      props.addBuddy(
        selectedDuration.label,
        props.buddyId,
        props.buddyGoalId,
        selectedGoal.value,
        props.userId
      );
      M.toast({ html: "Buddy added!" });
      clearFields();
    }
  };

  return (
    <>
      <div id="joinGoalModal">
        <button className={props.className} data-target={props.dataTarget}>
          <i className="material-icons left">person_add</i>
          {props.btnName}
        </button>
        <div id={props.dataTarget} className="modal">
          <div className="modal-content">
            <h5>
              Join <span className="buddyInfo">{props.buddyGoalName}</span>
            </h5>
            <p>
              When you select a goal, you and{" "}
              <span className="buddyInfo">{props.buddyName}</span> will become
              buddies for the duration you choose.
            </p>
            <div className="col s10 offset-s1" style={{ marginTop: "20px" }}>
              <form onSubmit={handleSubmit}>
                <div className="input-field col s12 left-align validate">
                  <span className="labelForSelect">Your Goals</span>
                  <Select
                    theme={theme => ({
                      ...theme,
                      borderRadius: 5,
                      colors: {
                        ...theme.colors,
                        primary25: "#ccc",
                        primary: "#d4ac0d"
                      }
                    })}
                    options={props.currentUserGoals.map(goal => ({
                      label: goal.name,
                      value: goal.id
                    }))}
                    value={selectedGoal}
                    onChange={handleGoalChange}
                  />
                </div>
                <div className="input-field col s12 left-align">
                  <span className="labelForSelect">
                    How long do you want to be Buddies for?
                  </span>

                  <Select
                    theme={theme => ({
                      ...theme,
                      borderRadius: 5,
                      colors: {
                        ...theme.colors,
                        primary25: "#ccc",
                        primary: "#d4ac0d"
                      }
                    })}
                    options={[
                      { label: "1 week", value: 1 },
                      { label: "2 weeks", value: 2 },
                      { label: "3 weeks", value: 3 },
                      { label: "1 month", value: 4 },
                      { label: "Goal due date", value: 5 }
                    ]}
                    value={selectedDuration}
                    onChange={handleDurationChange}
                  />
                </div>
                <div className="modal-footer">
                  <span
                    onClick={clearFields}
                    className="btn modal-close grey"
                    style={{ marginRight: "10px" }}
                  >
                    Cancel
                    <i className="material-icons right">cancel</i>
                  </span>

                  <button
                    className={
                      selectedGoal !== "" && selectedDuration !== ""
                        ? "btn submit modal-close"
                        : "btn submit"
                    }
                    type="submit"
                  >
                    Submit
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinGoalModal;
