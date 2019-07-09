import React, { useState, useEffect } from "react";

function MilestoneForm(props) {
  if (props.frequency === "Never") {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="milestoneTitle">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="milestoneTitle"
            placeholder=""
            onChange={props.handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="milestoneFrequency">Select Milestone Frequency</label>
          <select
            className="form-control"
            id="milestoneFrequency"
            name="frequency"
            onChange={props.handleInput}
          >
            <option>Never</option>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="milestoneDueDate">Due Date</label>
          <input
            name="dueDate"
            type="text"
            className="form-control"
            id="milestoneDueDate"
            placeholder=""
            onChange={props.handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="milestoneNotes">Notes</label>
          <textarea
            className="form-control"
            id="milestoneNotes"
            rows="3"
            name="notes"
            onChange={props.handleInput}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={props.addMilestone}
        >
          Add
        </button>
      </form>
    );
  } else {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="milestoneTitle">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="milestoneTitle"
            placeholder=""
            onChange={props.handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="milestoneFrequency">Select Milestone Frequency</label>
          <select
            className="form-control"
            id="milestoneFrequency"
            name="frequency"
            onChange={props.handleInput}
          >
            <option>Never</option>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="milestoneStart">Start Date</label>
          <input
            name="startDate"
            type="text"
            className="form-control"
            id="milestoneStart"
            placeholder=""
            onChange={props.handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="milestoneEnd">End Date</label>
          <input
            name="endDate"
            type="text"
            className="form-control"
            id="milestoneEnd"
            placeholder=""
            onChange={props.handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="milestoneNotes">Notes</label>
          <textarea
            className="form-control"
            id="milestoneNotes"
            rows="3"
            name="notes"
            onChange={props.handleInput}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={props.addMilestone}
        >
          Add
        </button>
      </form>
    );
  }
}

export default MilestoneForm;
