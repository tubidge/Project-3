import React, { useState, useEffect } from "react";
import M from "materialize-css";
import API from "../../utils/API";
function MilestoneForm(props) {
  console.log(props);
  //   const [milestone, setMilestone] = useState({});
  const [title, setTitle] = useState();
  const [frequency, setFrequency] = useState(props.frequency);
  const [due, setDue] = useState(props.date);
  const [notes, setNotes] = useState();
  const [start, setStart] = useState(props.date);
  const [end, setEnd] = useState();
  useEffect(() => {
    M.AutoInit();
    let modals = document.querySelectorAll(".modal");
    let options = {
      dismissible: true,
      inDuration: 200,
      outDuration: 400
    };
    M.Modal.init(modals, options);
    var Modalelem = document.querySelector("#milestoneForm");
    var instance = M.Modal.init(Modalelem);
    instance.open();
  }, []);
  useEffect(() => {}, [frequency]);
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
    console.log("+++++++++++++");
    console.log("clear form ");
    setTitle(null);
    setFrequency(null);
    setDue(null);
    setStart(null);
    setEnd(null);
    setNotes(null);
    console.log(frequency);
  };

  const handleSubmit = event => {
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
      const callback = () => {
        console.log(data.frequency);
        props.close(data.frequency);
      };
      API.addMilestone(data).then(data => {
        console.log(data);
        callback();
      });
      clearForm();
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
      const callback = () => {
        console.log(data.frequency);
        props.close(data.frequency);
      };
      API.addMilestone(data).then(data => {
        console.log(data);
        callback();
      });
      clearForm();
    } else {
      return false;
    }
  };
  if (frequency === "Never") {
    return (
      <div id="milestoneForm" className="modal">
        <div className="modal-content">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s10">
                <input
                  type="text"
                  name="title"
                  className="validate"
                  id="milestoneTitle"
                  placeholder=""
                  onChange={handleInput}
                />
                <label htmlFor="milestoneTitle">Title</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s10">
                <input
                  name="dueDate"
                  type="date"
                  className="validate"
                  id="milestoneDueDate"
                  placeholder=""
                  value={props.date ? props.date : ""}
                  onChange={handleInput}
                />
                <label htmlFor="milestoneDueDate">Due Date</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s10">
                <textarea
                  className="materialize-textarea"
                  id="milestoneNotes"
                  rows="3"
                  name="notes"
                  onChange={handleInput}
                />
                <label htmlFor="milestoneNotes">Notes</label>
              </div>
            </div>
            <button type="button" className="btn" onClick={handleSubmit}>
              Add
            </button>
            <button
              className="btn modal-close milestone-cancel-btn"
              onClick={() => {
                clearForm();
                props.close("Never");
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div id="milestoneForm" className="modal">
        <div className="modal-content">
          <h4 style={{ textAlign: "center" }}>
            New {props.frequency} Milestone
          </h4>
          <form className="col s12">
            <div className="row">
              <div className="input-field col s10">
                <input
                  type="text"
                  name="title"
                  className="validate"
                  id="milestoneTitle"
                  placeholder=""
                  onChange={handleInput}
                />
                <label htmlFor="milestoneTitle">Title</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s10">
                <input
                  name="startDate"
                  type="date"
                  className="validate"
                  id="milestoneStart"
                  placeholder=""
                  onChange={handleInput}
                />
                <label htmlFor="milestoneStart">Start Date</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s10">
                <input
                  name="endDate"
                  type="date"
                  className="validate"
                  id="milestoneEnd"
                  onChange={handleInput}
                />
                <label htmlFor="milestoneEnd">End Date</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s10">
                <textarea
                  className="materialize-textarea"
                  id="milestoneNotes"
                  rows="3"
                  name="notes"
                  onChange={handleInput}
                />
                <label htmlFor="milestoneNotes">Notes</label>
              </div>
            </div>
            <button type="button" className="btn" onClick={handleSubmit}>
              Add
            </button>
            <button
              className="btn modal-close milestone-cancel-btn"
              onClick={() => props.close("cancel")}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
    //     return (
    //       <form>
    //         <div className="form-group">
    //           <label htmlFor="milestoneTitle">Title</label>
    //           <input
    //             type="text"
    //             name="title"
    //             className="form-control"
    //             id="milestoneTitle"
    //             placeholder=""
    //             onChange={props.handleInput}
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="milestoneFrequency">Select Milestone Frequency</label>
    //           <select
    //             className="form-control"
    //             id="milestoneFrequency"
    //             name="frequency"
    //             onChange={props.handleInput}
    //           >
    //             <option>Never</option>
    //             <option>Daily</option>
    //             <option>Weekly</option>
    //             <option>Monthly</option>
    //           </select>
    //         </div>
    // <div className="form-group">
    //   <label htmlFor="milestoneStart">Start Date</label>
    //   <input
    //     name="startDate"
    //     type="text"
    //     className="form-control"
    //     id="milestoneStart"
    //     placeholder=""
    //     onChange={props.handleInput}
    //   />
    // </div>
    // <div className="form-group">
    //   <label htmlFor="milestoneEnd">End Date</label>
    //   <input
    //     name="endDate"
    //     type="text"
    //     className="form-control"
    //     id="milestoneEnd"
    //     placeholder=""
    //     onChange={props.handleInput}
    //   />
    // </div>
    //         <div className="form-group">
    //           <label htmlFor="milestoneNotes">Notes</label>
    //           <textarea
    //             className="form-control"
    //             id="milestoneNotes"
    //             rows="3"
    //             name="notes"
    //             onChange={props.handleInput}
    //           />
    //         </div>
    //         <button
    //           type="button"
    //           className="btn btn-primary"
    //           onClick={props.addMilestone}
    //         >
    //           Add
    //         </button>
    //       </form>
    //     );
  }
}
export default MilestoneForm;
