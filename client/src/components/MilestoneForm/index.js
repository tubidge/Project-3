import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import M from "materialize-css";
import API from "../../utils/API";

function MilestoneForm(props) {
  const [dataTarget, setDataTarget] = useState("");
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("");
  const [due, setDue] = useState("");
  const [notes, setNotes] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  useEffect(() => {
    if (props.frequency === "Never") {
      setFrequency(props.frequency);
      setDue(props.dueDate);
    } else {
      setFrequency(props.frequency);
      setStart(props.dueDate);
    }

    setDataTarget(props.dataTarget);
    M.AutoInit();
    let modals = document.querySelectorAll(".modal");
    let options = {
      dismissible: true,
      inDuration: 200,
      outDuration: 400
    };
    M.Modal.init(modals, options);
  }, [props.dataTarget]);

  const handleInput = event => {
    event.preventDefault();
    let value = event.target.value;
    let name = event.target.name;
    console.log(value);
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "frequency":
        setFrequency(value);
        break;
      case "dueDate":
        setDue(value);
        break;
      case "startDate":
        setStart(value);
        break;
      case "endDate":
        setEnd(value);
        break;
      case "notes":
        setNotes(value);
        break;
    }
  };

  const clearForm = () => {
    console.log("clearform running");
    setTitle("");

    setDue("");
    setStart(null);
    setEnd(null);
    setNotes("");
  };

  const handleCancel = event => {
    event.preventDefault();
    clearForm();
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log("working");

    if (frequency === "Never" && title) {
      let data = {
        name: title,
        frequency: frequency,
        dueDate: due,
        startDate: start,
        endDate: end,
        notes: notes,
        GoalId: props.goalId,
        UserId: props.userId
      };
      console.log(data);

      API.addMilestone(data)
        .then(data => {
          console.log(data);
          clearForm();
          props.close(data.frequency);
        })
        .catch(err => {
          console.log(err);
        });
    } else if (title && end) {
      let data = {
        name: title,
        frequency: frequency,
        dueDate: due,
        startDate: start,
        endDate: end,
        notes: notes,
        GoalId: props.goalId,
        UserId: props.userId
      };
      console.log(data);

      API.addMilestone(data).then(data => {
        console.log(data);
        clearForm();
        props.close(data.frequency);
      });
    } else {
      return false;
    }
  };

  return (
    <>
      <Link
        to="#"
        className={props.className}
        data-target={dataTarget}
        // style={props.style}
      >
        {props.btnName}
      </Link>

      <div id="milestoneForm">
        <div href="milestoneForm" id={dataTarget} className="modal">
          <div className="modal-content">
            {frequency === "Never" && (
              <>
                <form className="col s10 offset-s1">
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="text"
                        name="title"
                        className="validate"
                        id="milestoneTitle"
                        placeholder=""
                        value={title ? title : ""}
                        onChange={handleInput}
                      />
                      <label htmlFor="milestoneTitle">Title</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        name="dueDate"
                        type="date"
                        className="validate"
                        id="milestoneDueDate"
                        placeholder=""
                        value={due ? due : ""}
                        onChange={handleInput}
                      />
                      <label htmlFor="milestoneDueDate">Due Date</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <textarea
                        className="materialize-textarea"
                        id="milestoneNotes"
                        rows="3"
                        name="notes"
                        value={notes ? notes : ""}
                        onChange={handleInput}
                      />
                      <label htmlFor="milestoneNotes">Notes</label>
                    </div>
                  </div>
                  <div
                    style={{ marginBottom: "15px" }}
                    className="modal-footer"
                  >
                    <button
                      className="btn modal-close grey milestone-cancel-btn"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn milestoneFormAddBtn modal-close"
                      onClick={handleSubmit}
                    >
                      Add
                    </button>
                  </div>
                </form>
              </>
            )}
            {frequency !== "Never" && (
              <>
                <h5>
                  <span className="buddyInfo">
                    New {props.frequency} Milestone
                  </span>
                </h5>
                <form className="col s10 offset-s1">
                  <div className="row">
                    <div className="input-field col s12 left-align">
                      <span className="labelForSelect">Name</span>
                      <input
                        type="text"
                        name="title"
                        className="validate"
                        id="milestoneTitle"
                        placeholder=""
                        value={title ? title : ""}
                        onChange={handleInput}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12 left-align">
                      <span className="labelForSelect">Start Date </span>
                      <input
                        name="startDate"
                        type="date"
                        className="validate"
                        id="milestoneStart"
                        placeholder=""
                        value={start ? start : ""}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 left-align">
                      <span className="labelForSelect">End Date </span>
                      <input
                        name="endDate"
                        type="date"
                        className="validate"
                        id="milestoneEnd"
                        value={end ? end : ""}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 left-align">
                      <span className="labelForSelect">Notes</span>
                      <textarea
                        className="materialize-textarea"
                        id="milestoneNotes"
                        rows="3"
                        name="notes"
                        value={notes ? notes : ""}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <div className="milestoneFooter modal-footer">
                    <span
                      onClick={handleCancel}
                      className="btn modal-close grey milestoneCancelBtn"
                    >
                      Cancel
                      <i className="material-icons right">cancel</i>
                    </span>

                    <button
                      onClick={handleSubmit}
                      className="milestoneFormAddBtn btn modal-close"
                      type="submit"
                    >
                      Add
                      <i className="material-icons right ">send</i>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MilestoneForm;
