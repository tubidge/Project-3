import React, { useState, useEffect } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import API from "../../utils/API";
import "./style.css";
import FileUpload from "../FileUpload";

const FormStatic = props => {
  const [username_db, setUsername_db] = useState(props.username);
  const [firstName_db, setFirstName_db] = useState(props.firstName);
  const [lastName_db, setLastName_db] = useState(props.lastName);
  // const [disabled, setDisabled] = useState(true);
  // const [edit, setEdit] = useState("Save");

  useEffect(() => {
    setUsername_db(props.username);
  }, [props.username]);

  useEffect(() => {
    setFirstName_db(props.firstName);
  }, [props.firstName]);

  useEffect(() => {
    setLastName_db(props.lastName);
  }, [props.lastName]);

  const editUser = e => {
    e.preventDefault();
    let editUsername = {
      colName: "username",
      info: username_db
    };
    API.editUser(props.userID, editUsername).then(res => console.log(res));

    let editFirstName = {
      colName: "firstName",
      info: firstName_db
    };
    API.editUser(props.userID, editFirstName).then(res => console.log(res));

    let editLastName = {
      colName: "lastName",
      info: lastName_db
    };
    API.editUser(props.userID, editLastName).then(res => console.log(res));
    props.getUserProfile();
  };

  return (
    <>
      <form>
        <div className="row">
          <div className="col s5">
            <div className="row">
              <div className="form-group">
                <b>Username</b>
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
            <div className="row">
              <div className="form-group">
                <FileUpload
                  userID={props.userID}
                  getUserProfile={props.getUserProfile}
                />
                {props.image && <img src={props.image} alt="Profile" />}
              </div>
            </div>
          </div>
          <div className="col s5 offset-s1">
            <div className="row">
              <div className="form-group">
                <b>First Name</b>
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
            </div>
            <div className="row">
              <div className="form-group">
                <b>Last Name</b>
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
            </div>
          </div>
        </div>

        <br />
        <button className="btn btn-secondary m-1" onClick={editUser}>
          Save Changes
        </button>
      </form>
    </>
  );
};

export default FormStatic;
