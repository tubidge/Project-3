import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import FileUpload from "../FileUpload";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./style.css";

const axios = require("axios");

const Form = props => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const email = props.email;
  const [, setDisabled] = useState(false);

  const handleSumbit = e => {
    e.preventDefault();
    const image = props.image;
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
                email,
                image
              })
              .then(result => {
                if (result) {
                  setDisabled(true);
                  props.history.push("/dashboard");
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
    <form>
      <div className="row">
        <div className="col s5">
          <div className="row">
            <div className="form-group">
              <b>Username</b>
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
          </div>
          <div className="row">
            <div className="form-group">
              <b>Email</b>
              <input
                disabled
                readOnly
                className="form-control"
                value={props.email}
                placeholder="Email address"
                type="email"
                name="email"
              />
            </div>
          </div>
        </div>
        <div className="col s5 offset-s1">
          <div className="row">
            <div className="form-group">
              <b>First Name</b>
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
          </div>
          <div className="row">
            <div className="form-group">
              <b>Last Name</b>
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
          </div>

          <div className="row center-align">
            <b>Notifications</b>
            <hr />
            <div className="form-group">
              <div className="col s6">
                <div className="row">
                  <span>New Goal Match</span>
                  <div className="switch">
                    <label>
                      Off
                      <input type="checkbox" />
                      <span className="lever" />
                      On
                    </label>
                  </div>
                </div>
                <div className="row">
                  <span>Buddy Requests</span>
                  <div className="switch">
                    <label>
                      Off
                      <input type="checkbox" />
                      <span className="lever" />
                      On
                    </label>
                  </div>
                </div>
              </div>
              <div className="col s6">
                <div className="row">
                  <span>Goal Progress</span>
                  <div className="switch">
                    <label>
                      Off
                      <input type="checkbox" />
                      <span className="lever" />
                      On
                    </label>
                  </div>
                </div>
                <div className="row">
                  <span>Buddy Goal Progress</span>
                  <div className="switch">
                    <label>
                      Off
                      <input type="checkbox" />
                      <span className="lever" />
                      On
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="btn left" onClick={handleSumbit}>
        Complete Profile
      </button>
    </form>
  );
};

export default withRouter(Form);
