import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import "./style.css";

export const DeleteBuddyModal = props => {
  return (
    <>
      <Link to="#" className={props.className} data-target={props.dataTarget}>
        Delete Buddy
      </Link>
      <div id={props.dataTarget} className="modal">
        <div className="modal-content">
          <h4 style={{ textAlign: "left" }} className="modalTitle">
            Remove this Buddy
          </h4>
          <h5>Are you sure you?</h5>
          <div className="modal-footer">
            <button className="modal-close btn-flat">Cancel</button>
            <button
              className="modal-close btn btn-blue"
              type="submit"
              onClick={() => props.deleteBuddy(props.id)}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
