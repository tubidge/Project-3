import React, { useState, useEffect } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./style.css";

const FormStatic = props => {
  const [username_db, setUsername_db] = useState(props.username);
  const [firstName_db, setFirstName_db] = useState(props.firstName);
  const [lastName_db, setLastName_db] = useState(props.lastName);
  const [disabled, setDisabled] = useState(true);
  const [edit, setEdit] = useState("Edit");

  useEffect(() => {
    setUsername_db(props.username);
  }, [props.username]);

  useEffect(() => {
    setFirstName_db(props.firstName);
  }, [props.firstName]);

  useEffect(() => {
    setLastName_db(props.lastName);
  }, [props.lastName]);

  const toggleEdit = e => {
    e.preventDefault();
    if (disabled) {
      setDisabled(false);
      setEdit("Save Changes");
    } else {
      setDisabled(true);
      setEdit("Edit");
    }
  };

  return (
    <>
      <h1>Edit Your Profile</h1>
      <form>
        <fieldset disabled={disabled}>
          <div className="form-group">
            <input
              className="form-control"
              value={username_db}
              onChange={e => setUsername_db(e.target.value)}
              placeholder="username"
              type="text"
              name="username"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              value={firstName_db}
              onChange={e => setFirstName_db(e.target.value)}
              placeholder="First name"
              type="text"
              name="firstName_db"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              value={lastName_db}
              onChange={e => setLastName_db(e.target.value)}
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
              value={props.email}
              placeholder="Email address"
              type="email"
              name="email"
            />
          </div>
        </fieldset>
        <button className="btn btn-secondary m-1" onClick={toggleEdit}>
          {edit}
        </button>
      </form>
    </>
  );
};

export default FormStatic;
