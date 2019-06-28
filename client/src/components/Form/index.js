import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./style.css";

const axios = require("axios");

const Form = props => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const email = props.email;
  const [disabled, setDisabled] = useState(false);

  const editProfile = () => {
    setDisabled(false);
  };

  const handleCancel = () => {
    setUsername("");
    setFirstName("");
    setLastName("");
  };

  const handleSumbit = e => {
    e.preventDefault();

    confirmAlert({
      title: "Create your account",
      message: "Is everything right?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .post("/add/user", {
                firstName,
                lastName,
                username,
                email
              })
              .then(result => {
                if (result) {
                  console.log(result);
                  setDisabled(true);
                }
              });
          }
        },
        {
          label: "No",
          onClick: () => null
        }
      ]
    });
  };

  return (
    <>
      <form onSubmit={handleSumbit}>
        <fieldset disabled={disabled}>
          <div className="form-group">
            <input
              className="form-control"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="username"
              type="text"
              name="username"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="First name"
              type="text"
              name="firstName"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder="Last name"
              type="text"
              name="lastName"
              required
            />
          </div>
          <div className="form-group">
            <input
              disabled
              readOnly
              className="form-control"
              value={email.trim()}
              placeholder="Email address"
              type="email"
              name="email"
            />
          </div>
        </fieldset>
        <input
          type="reset"
          className="btn btn-secondary m-1"
          value="Cancel"
          onClick={handleCancel}
        />
        <button className="btn btn-primary m-1">Save Changes</button>
      </form>
      <button className="btn btn-secondary m-1" onClick={editProfile}>
        Edit
      </button>
    </>
  );
};

export default Form;
