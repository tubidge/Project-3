import React, { useState, useEffect } from "react";
import M from "materialize-css";
import API from "../../utils/API";

function MilestoneForm(props) {
  //   const [milestone, setMilestone] = useState({});
  const [title, setTitle] = useState();
  const [frequency, setFrequency] = useState("Never");
  const [due, setDue] = useState();
  const [notes, setNotes] = useState();
  const [start, setStart] = useState();
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

  const handleSubmit = event => {
    console.log("working");
    event.preventDefault();
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
      props.close();
    });
  };
  //   if (props.frequency === "Never") {
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
              <select
                id="milestoneFrequency"
                name="frequency"
                onChange={handleInput}
              >
                <option value="Never">Never</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
              <label htmlFor="milestoneFrequency">
                Select Milestone Frequency
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s10">
              <input
                name="dueDate"
                type="text"
                className="validate"
                id="milestoneDueDate"
                placeholder=""
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
          <button
            type="button"
            className="btn modal-close"
            onClick={handleSubmit}
          >
            Add
          </button>
          <button
            className="btn modal-close milestone-cancel-btn"
            onClick={props.close}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
  //   } else {
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

  //         <div className="form-group">
  //           <label htmlFor="milestoneStart">Start Date</label>
  //           <input
  //             name="startDate"
  //             type="text"
  //             className="form-control"
  //             id="milestoneStart"
  //             placeholder=""
  //             onChange={props.handleInput}
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label htmlFor="milestoneEnd">End Date</label>
  //           <input
  //             name="endDate"
  //             type="text"
  //             className="form-control"
  //             id="milestoneEnd"
  //             placeholder=""
  //             onChange={props.handleInput}
  //           />
  //         </div>
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
  //   }
}

export default MilestoneForm;
