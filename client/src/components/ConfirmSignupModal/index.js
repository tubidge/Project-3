import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import M from "materialize-css";
import axios from "axios";

const ConfirmSignupModal = props => {
  useEffect(() => {
    M.AutoInit();
  });

  const handleSumbit = e => {
    e.preventDefault();
    window.location.reload();
    axios.post("/add/user", props.information).then(res => {
      if (res) {
        props.history.push("/dashboard");
      }
    });
  };

  return (
    <>
      <Link to="#" className={props.className} data-target={props.dataTarget}>
        {props.btnName}
      </Link>
      <div id={props.dataTarget} className="modal confirmSignupModal">
        <div className="modal-content">
          <h4 className="modalTitle">Create your Account</h4>
          <p>Please make sure your information is correct.</p>
          <ul>
            <li>
              <b>Username:</b> {props.information.username}
            </li>
            <li>
              <b>First Name:</b> {props.information.firstName}
            </li>
            <li>
              <b>Last Name:</b> {props.information.lastName}
            </li>
          </ul>
          <div className="modal-footer">
            <button className="modal-close btn-flat">Cancel</button>
            <button
              type="submit"
              onClick={handleSumbit}
              className="modal-close btn completeProfileBtn"
            >
              Join the Den
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(ConfirmSignupModal);
