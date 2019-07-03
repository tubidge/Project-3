import React, { useState, useEffect } from "react";
import M, { Modal } from "materialize-css";
import "./style.css";

const axios = require("axios");

const GoalCard = props => {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const UserId = props.UserId;

  useEffect(() => {
    M.AutoInit();
  }, []);

  const handelSubmit = () => {
    const category = props.category;
    axios
      .post("/add/goal", {
        name,
        category,
        dueDate,
        UserId
      })
      .then(res => {
        console.log(res.data);
        setName("");
        setDueDate("");
      });
  };

  const renderGoalsForCategories = category => {
    const result = props.incompleteGoals.filter(
      goal => goal.category === category
    );
    return result.map(goal => (
      <li key={goal.id}>
        <div className="card-panel teal">
          <span className="white-text">{goal.name}</span>
        </div>
      </li>
    ));
  };

  return (
    <>
      <div className="col l4 s12">
        <ul className="collapsible">
          <li>
            <div className="collapsible-header">
              <i className="material-icons">filter_drama</i>
              {props.category}
            </div>
            <div className="collapsible-body">
              <ul>{renderGoalsForCategories(props.category)}</ul>
              <a className="btn modal-trigger" data-target={props.category}>
                Add Goal
              </a>
              <div
                ref={Modal => {
                  Modal = Modal;
                }}
                id={props.category}
                className="modal"
              >
                <div className="modal-content">
                  <form onSubmit={handelSubmit}>
                    <h5>Add a Goal</h5>
                    <div className="input-field">
                      <input
                        required
                        type="text"
                        className="validate"
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-field">
                      <input
                        required
                        type="text"
                        className="validate"
                        value={dueDate}
                        onChange={e => setDueDate(e.target.value)}
                      />
                      <label htmlFor="dueDate">Due Date</label>
                    </div>
                    <input className="btn" type="submit" value="Submit" />
                    <input
                      className="btn modal-close"
                      type="submit"
                      name="submit"
                      value="Cancel"
                      formNoValidate
                    />
                  </form>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default GoalCard;
