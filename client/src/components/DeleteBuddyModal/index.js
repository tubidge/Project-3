import React, { useEffect } from "react";
import moment from "moment";
import M from "materialize-css";
import "./style.css";

const DeleteBuddyModal = props => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <>
      <span className={props.className} data-target={props.dataTarget}>
        {props.btnName}
      </span>
      <div id={props.dataTarget} className="modal">
        <div className="modal-content">
          <h5>
            Leave Goal:{" "}
            <span className="brandedText">{props.buddyGoalName}</span>
          </h5>
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

export default DeleteBuddyModal;
