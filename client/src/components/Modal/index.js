import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import M from "materialize-css";
import API from "../../utils/API";
import "./style.css";

const moment = require("moment");
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
    e.preventDefault();
    let now = moment().format("YYYY-MM-DD");

    if (props.header === "Add a New Goal") {
      if (dueDate < now) {
        M.toast({
          html: `<i class="material-icons left">error</i>Hmm... your Due Date shouldn't be in the past.`,
          displayLength: 3500
        });
      }

      if (category === "" || name === "" || dueDate === "") {
        M.toast({
          html: `<i class="material-icons left">error</i>You didn't complete all the requried fields.`,
          displayLength: 2000
        });
      } else {
        setCategory("");
        setName("");
        setDueDate("");
        setSelectedOption(null);
        setCategory(null);
        switch (props.header) {
          case "Add a New Goal":
            return addGoal(e);
          case "Delete":
            return deleteGoal(e);
          case "Edit This Goal":
            return editGoal(e);
          case "Complete":
            return completeGoal(e);
          default:
            return addGoal(e);
        }
      }
    } else {
      setCategory("");
      setName("");
      setDueDate("");
      setSelectedOption(null);
      setCategory(null);
      switch (props.header) {
        case "Add a New Goal":
          return addGoal(e);
        case "Delete":
          return deleteGoal(e);
        case "Edit This Goal":
          return editGoal(e);
        case "Complete":
          return completeGoal(e);
        default:
          return addGoal(e);
      }
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
    let editName = {};
    if (name !== "") {
      editName.colName = "name";
      editName.info = name;
    } else {
      editName.colName = "name";
      editName.info = props.name;
    }

    API.editGoal(props.goalId, editName).then(res => console.log(res));
    let editDueDate = {};
    if (dueDate !== "") {
      editDueDate.colName = "dueDate";
      editDueDate.info = dueDate;
    } else {
      editDueDate.colName = "dueDate";
      editDueDate.info = props.dueDate;
    }

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
        data-position={props.dataPosition}
        data-tooltip={props.dataTooltip}
      >
        {props.btnName}
      </Link>
      <div id="goalCardModal">
        <div id={dataTarget} className="modal">
          <div className="modal-content">
            <h5>
              <span className="buddyInfo">{props.header}</span>
            </h5>
            <form onSubmit={handleSubmit}>
              {props.header === "Add a New Goal" && (
                <>
                  <div
                    className="input-field col s8 offset-s2 left-align"
                    style={{ marginTop: "20px" }}
                  >
                    <span className="labelForSelect">Choose a Category</span>
                    <Select
                      theme={theme => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                          ...theme.colors,
                          primary25: "#ccc",
                          primary: "#daae37"
                        }
                      })}
                      placeholder={props.header === "Edit" ? category : ""}
                      value={selectedOption}
                      options={categories}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-field col s8 offset-s2 left-align">
                    {props.header !== "Edit" && (
                      <span className="labelForSelect">Goal Name</span>
                    )}
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div className="input-field col s8 offset-s2 left-align">
                    {props.header !== "Edit" && (
                      <span className="labelForSelect">Due Date</span>
                    )}
                    <input
                      type="date"
                      value={dueDate}
                      onChange={e => setDueDate(e.target.value)}
                    />
                  </div>
                </>
              )}
              {props.header === "Edit This Goal" && (
                <>
                  <div className="input-field col s12">
                    <input
                      type="text"
                      className="validate"
                      value={name ? name : props.name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div className="input-field col s12">
                    <input
                      type="date"
                      className="validate"
                      value={dueDate ? dueDate : props.dueDate}
                      onChange={e => setDueDate(e.target.value)}
                    />
                  </div>
                </>
              )}
              <div className="modal-footer col s12">
                <span
                  onClick={handleCancel}
                  className="btn modal-close grey"
                  style={{ marginRight: "10px" }}
                >
                  Cancel
                  <i className="material-icons right">cancel</i>
                </span>
                {props.header === "Add a New Goal" && (
                  <button
                    className={
                      category !== "" && name !== "" && dueDate !== ""
                        ? "btn submit modal-close"
                        : "btn submit"
                    }
                    type="submit"
                  >
                    {props.action}
                    <i className="material-icons right">send</i>
                  </button>
                )}
                {props.header === "Edit This Goal" && (
                  <button className={"btn submit modal-close"} type="submit">
                    {props.action}
                    <i className="material-icons right">send</i>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
