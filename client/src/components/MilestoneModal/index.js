import React, { useState, useEffect } from "react";
import M from "materialize-css";
import API from "../../utils/API";
import "./style.css";
import DatePicker from "../DatePicker";
import TimePicker from "../TimePicker";

function MilestoneModal(props) {
  const [goal, setGoal] = useState("");
  const [milestone, setMilestone] = useState("");
  const [dataTarget] = useState("milestoneModal");

  useEffect(() => {
    API.getMilestone(props.id).then(data => {
      console.log(data);
      let newMilestone = {
        id: data.data.id,
        name: data.data.name,
        dueDate: data.data.dueDate,
        frequency: data.data.frequency,
        completed: data.data.completed,
        notes: data.data.notes,
        GoalId: data.data.goalId
      };
      setMilestone(newMilestone);
      console.log(data.data.goalId);
      API.getBasicGoal(data.data.goalId).then(resp => {
        console.log(resp);
        let goal = {
          id: resp.data.id,
          name: resp.data.name,
          category: resp.data.category,
          dueDate: resp.data.dueDate
        };
        console.log(goal);
        setGoal(goal);
      });
    });
  }, []);

  useEffect(() => {
    M.AutoInit();
    let modals = document.querySelectorAll(".modal");
    let options = {
      dismissible: false,
      inDuration: 200,
      outDuration: 400
    };
    M.Modal.init(modals, options);
    var Modalelem = document.querySelector("#milestoneModal");
    var instance = M.Modal.init(Modalelem, options);
    instance.open();
  }, []);

  const handleInput = event => {
    let value = event.target.value;
    let name = event.target.name;
    console.log(value);
    console.log(name);
    switch (name) {
      case "notes":
        let newData = milestone;
        newData.notes = value;
        setMilestone(newData);
        break;
      case "completed":
        let data = milestone;
        data.completed = !data.completed;
        console.log(data);
        setMilestone(data);

        break;
    }
  };

  const saveMilestone = event => {
    event.preventDefault();
    console.log(milestone);
    let firstEdit = {
      colName: "completed",
      info: milestone.completed
    };
    API.editMilestone(milestone.id, firstEdit)
      .then(resp => {
        let secondEdit = {
          colName: "notes",
          info: milestone.notes
        };
        API.editMilestone(milestone.id, secondEdit)
          .then(resp => {
            props.cancel();
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div id={dataTarget} className="modal">
        <div className="modal-content">
          <h5>
            <span className="buddyInfo">{goal.category} Goal</span>
          </h5>
          <h4 className="left-align modal-goal-name">{goal.name}</h4>
          <h4 className="right-align modal-goal-dueDate">
            Due: {goal.dueDate}
          </h4>

          <div className="card z-depth-5">
            <div className="card-content">
              <span className="card-title">{milestone.name}</span>
              <div className="milestone-sub-header">
                <p className="modal-milestone-frequency">
                  Repeats: {milestone.frequency}
                </p>
                <p className="modal-milestone-dueDate">
                  Due: {milestone.dueDate}
                </p>
                {milestone.completed ? (
                  <p className="modal-milestone-status">
                    Status:{" "}
                    <span className="light-green-text text-accent-4">
                      complete
                    </span>
                  </p>
                ) : (
                  <p className="modal-milestone-status">
                    Status:{" "}
                    <span className="red-text text-darken-1">incomplete</span>
                  </p>
                )}
              </div>
              <div className="row">
                <div className="col s6">
                  <h5>Notes</h5>
                  <form>
                    <textarea
                      name="notes"
                      value={milestone.notes}
                      onChange={handleInput}
                    />
                  </form>
                </div>
                <div className="col s6 checkbox-column">
                  {milestone.completed ? (
                    ""
                  ) : (
                    <>
                      <div>
                        <h5>Set Reminder</h5>
                        <DatePicker />
                        <TimePicker />
                      </div>

                      <div className="switch">
                        <span className="modal-milestone-complete">
                          mark as complete
                        </span>
                        <label className="complete-checkbox">
                          <input
                            onChange={handleInput}
                            type="checkbox"
                            name="completed"
                          />
                          <span className="lever" />
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn modal-close milestone-cancel-btn"
                onClick={props.cancel}
              >
                Cancel
              </button>
              <button
                className="btn modal-close milestone-save-btn"
                onClick={saveMilestone}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MilestoneModal;
