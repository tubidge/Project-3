import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    if (props.header === "Edit") {
      setCategory(props.goalCategory);
      setName(props.goalName);
      setDueDate(props.goalDueDate);
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
  }, []);

  const handleSubmit = e => {
    switch (props.header) {
      case "AddNew":
        return addGoal(e);
      case "Delete":
        return deleteGoal(e);
      case "Edit":
        return editGoal(e);
      case "Complete":
        return completeGoal(e);
      default:
        return addGoal(e);
    }
  };

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
    setCategory(selectedOption.label);
  };

  const handleCancel = () => {
    setName("");
    setDueDate("");
    setSelectedOption("");
  };

  const addGoal = e => {
    e.preventDefault();
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
        if (props.getAllData) {
          props.getAllData();
        } else {
          props.orderRender();
        }
      });
  };

  const editGoal = e => {
    e.preventDefault();
    let editCategory = {
      colName: "category",
      info: category
    };
    API.editGoal(props.goalId, editCategory).then(res => console.log(res));

    let editName = {
      colName: "name",
      info: name
    };
    API.editGoal(props.goalId, editName).then(res => console.log(res));

    let editDueDate = {
      colName: "dueDate",
      info: dueDate
    };
    API.editGoal(props.goalId, editDueDate).then(res => console.log(res));
    if (props.getAllData) {
      props.getAllData();
    } else {
      props.orderRender();
    }
  };

  const deleteGoal = e => {
    e.preventDefault();
    API.deleteGoal(props.goalId).then(res => {
      console.log(res.data);
      if (props.getAllData) {
        props.getAllData();
      } else {
        props.orderRender();
      }
    });
  };

  const completeGoal = e => {
    let editComplete = {
      colName: "complete",
      info: true
    };
    e.preventDefault();
    API.editGoal(props.goalId, editComplete).then(res => console.log(res));
    if (props.getAllData) {
      props.getAllData();
    } else {
      props.orderRender();
    }
  };

  return (
    <>
      <Link
        to="#"
        className={props.className}
        data-target={dataTarget}
        style={props.style}
      >
        {props.btnName}
      </Link>

      <div id={dataTarget} className="modal">
        <div className="modal-content">
          <h4>{props.header}</h4>
          <p>{props.text}</p>
          <form onSubmit={handleSubmit}>
            {props.header === "AddNew" && (
              <>
                <div className="input-field col s12">
                  <Select
                    placeholder={props.header === "Edit" ? category : ""}
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
                  {props.header !== "Edit" && (
                    <label htmlFor="name">Name</label>
                  )}
                </div>
                <div className="input-field col s12">
                  <input
                    type="date"
                    className="validate"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                  />
                  {props.header !== "Edit" && (
                    <label htmlFor="dueDate">Due Date</label>
                  )}
                </div>
              </>
            )}
            {props.header === "Edit" && (
              <>
                <div className="input-field col s12">
                  <Select
                    placeholder={props.header === "Edit" ? category : ""}
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
                  {props.header !== "Edit" && (
                    <label htmlFor="name">Name</label>
                  )}
                </div>
                <div className="input-field col s12">
                  <input
                    type="date"
                    className="validate"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                  />
                  {props.header !== "Edit" && (
                    <label htmlFor="dueDate">Due Date</label>
                  )}
                </div>
              </>
            )}
            <input
              className="btn modal-close"
              type="submit"
              value={props.action}
            />
          </form>
          <button onClick={handleCancel} className="btn modal-close">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
