import React, { useState, useEffect } from "react";
import Select from "react-select";
import M from "materialize-css";
import "./style.css";

const JoinGoalModal = props => {
  const [selectedGoal, setSelectedGoal] = useState("");
  const [, setGoal] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [, setDuration] = useState("");
  const [joinedGoals, setJoinedGoals] = useState([]);

  useEffect(() => {
    M.AutoInit();
    let modals = document.querySelectorAll(".modal");
    let modalOptions = {
      dismissible: true,
      inDuration: 200,
      outDuration: 400
    };
    M.Modal.init(modals, modalOptions);
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
    } else if (joinedGoals.includes(props.buddyGoalId)) {
      M.toast({
        html: `<i class="material-icons left">error</i>You already joined this goal.`,
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
      props.getUserData(props.userEmail);
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
              Join <span className="brandedText">{props.buddyGoalName}</span>
            </h5>
            <p>
              Select which of your goals you want to link to this goal.
              <br />
              When you select a goal, you and{" "}
              <span className="brandedText">{props.buddyName}</span> will become
              Buddies for the duration you choose.
            </p>
            <div
              className="col l10 offset-l1 s12"
              style={{ marginTop: "20px" }}
            >
              <form onSubmit={handleSubmit}>
                <div className="input-field col s12 left-align">
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
                      { label: "4 weeks", value: 4 }
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
                  </span>

                  <button
                    className={
                      selectedGoal !== "" && selectedDuration !== ""
                        ? "btn submit modal-close"
                        : "btn submit"
                    }
                    type="submit"
                  >
                    Add Buddy
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
