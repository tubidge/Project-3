import React from "react";
import moment from "moment";
import "./style.css";

export const DeleteBuddyModal = props => {
  return (
    <>
      <i className={props.className} data-target={props.dataTarget}>
        X
      </i>
      <div id={props.dataTarget} className="modal">
        <div className="modal-content">
          <h4 style={{ textAlign: "left" }} className="modalTitle">
            Leave Goal
          </h4>
          <h5>Are you sure you?</h5>
          <p>
            This connection is scheduled to end on{" "}
            <span className="brandedText">
              {moment(props.endDate).format("MM/DD/YYYY")}
            </span>
          </p>
          <p>If you click yes, you will no longer see this goal.</p>
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
