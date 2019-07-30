import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import ConfirmSignupModal from "../ConfirmSignupModal";
import defaultLionPic from "../../assets/images/lionDefaultProfilePic.jpg";

const Form = props => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const email = props.email;
  const image = defaultLionPic;

  const makeid = l => {
    let text = "";
    let char_list =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < l; i++) {
      text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return text;
  };

  const capFirstLtr = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
                  onChange={e => setFirstName(capFirstLtr(e.target.value))}
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
                  onChange={e => setLastName(capFirstLtr(e.target.value))}
                  placeholder="Last name"
                  type="text"
                  name="lastName"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </form>{" "}
      <ConfirmSignupModal
        btnName="Complete Profile"
        className="btn modal-trigger btn-blueO"
        dataTarget={`completeProfile_${makeid(5)}`}
        information={{ firstName, lastName, username, email, image }}
      />
    </>
  );
};
export default withRouter(Form);
