import React, { useState, useEffect } from "react";
const axios = require("axios");

const AddGoalModal = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [UserId, setUserId] = useState("");

  const handleSumbit = e => {
    e.preventDefault();
    axios
      .post("/add/goal", {
        name,
        category,
        dueDate,
        UserId
      })
      .then(res => {
        console.log(res);
      });
  };

  return (
    <>
      <form onSubmit={handleSumbit}>
        <h5>Add a Goal</h5>
        <div className="input-field">
          <input
            type="text"
            className="validate"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="input-field">
          <input
            type="text"
            className="validate"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
          <label htmlFor="category">Category</label>
        </div>
        <div className="input-field">
          <input
            type="text"
            className="validate"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
          <label htmlFor="dueDate">Due Date</label>
        </div>
        <div className="input-field">
          <input
            type="text"
            className="validate"
            value={UserId}
            onChange={e => setUserId(e.target.value)}
          />
          <label htmlFor="userId">User ID</label>
        </div>
        <button className="btn">Save</button>
      </form>
    </>
  );
};

export default AddGoalModal;
