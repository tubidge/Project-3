import React, { useState, useEffect } from "react";
import Select from "react-select";
import M from "materialize-css";
import API from "../../utils/API";

const axios = require("axios");

const Modal = props => {
  const [dataTarget, setDataTarget] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [selectedOption, setSelectedOption] = useState("Choose category");
  const categories = [
    { label: "Fitness", value: 1 },
    { label: "Wellness", value: 2 },
    { label: "Financial", value: 3 },
    { label: "Education", value: 4 },
    { label: "Travel", value: 5 }
  ];

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
    setCategory(selectedOption.label);
  };

  const addGoal = () => {
    const UserId = props.userID;
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
        setCategory("");
      });
  };

  const deleteGoal = e => {
    API.deleteGoal(props.goalId).then(res => {
      console.log(res.data);
    });
  };

  useEffect(() => {
    setDataTarget(props.dataTarget);

    M.AutoInit();
    let modals = document.querySelectorAll(".modal");
    let options = {
      dismissible: true,
      inDuration: 200,
      outDuration: 400
    };
    M.Modal.init(modals, options);
  }, []);

  return (
    <>
      <button className={props.className} data-target={dataTarget}>
        {props.btnName}
      </button>

      <div id={dataTarget} className="modal">
        <div className="modal-content">
          <h4>{props.header}</h4>
          <p>{props.text}</p>

          <form onSubmit={props.header === "Delete" ? deleteGoal : addGoal}>
            {props.header !== "Delete" && (
              <>
                <div className="input-field col s12">
                  <Select
                    value={selectedOption}
                    options={categories}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-field col s12">
                  <input
                    type="text"
                    className="validate"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="input-field col s12">
                  <input
                    type="text"
                    className="validate"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                  />
                  <label htmlFor="dueDate">Due Date</label>
                </div>
              </>
            )}
            <input
              className={props.className}
              type="submit"
              value={props.action}
            />
          </form>
          <button className="btn modal-close">Cancel</button>
        </div>
      </div>
    </>
  );
};

export default Modal;
