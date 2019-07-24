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
      dismissible: false,
      inDuration: 200,
      outDuration: 400
    };
    M.Modal.init(modals, options);
    var Modalelem = document.querySelector("#milestoneForm");
    var instance = M.Modal.init(Modalelem, options);
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
      const callback = () => {
        console.log(data.frequency);
        props.close(data.frequency);
      };
      API.addMilestone(data).then(data => {
        console.log(data);
        callback();
      });
      // clearForm();
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
      <div href="milestoneForm" id="milestoneForm" className="modal">
        <div className="modal-content">
          <form className="col s10 offset-s1">
            <div className="row">
              <div className="input-field col s12">
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
              <div className="input-field col s12">
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
              <div className="input-field col s12">
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
            <div style={{ marginBottom: "15px" }} className="modal-footer">
              <button
                className="btn modal-close grey milestone-cancel-btn"
                onClick={() => {
                  clearForm();
                  props.close("Never");
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn milestoneFormAddBtn"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div href="milestoneForm" id="milestoneForm" className="modal">
        <div className="modal-content center-align">
          <h5>
            <span className="buddyInfo">New {props.frequency} Milestone</span>
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
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="milestoneFooter modal-footer">
              <span
                onClick={() => props.close("cancel")}
                className="btn modal-close grey milestoneCancelBtn"
              >
                Cancel
                <i className="material-icons right">cancel</i>
              </span>

              <button
                onClick={handleSubmit}
                className="milestoneFormAddBtn btn"
                type="submit"
              >
                Add
                <i className="material-icons right ">send</i>
              </button>
            </div>
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
