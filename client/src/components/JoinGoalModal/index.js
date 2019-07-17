import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import M from "materialize-css";

const JoinGoalModal = props => {
  useEffect(() => {
    M.AutoInit();
    let modals = document.querySelectorAll(".modal");
    let options = {
      dismissible: true,
      inDuration: 200,
      outDuration: 400
    };
    M.Modal.init(modals, options);
  }, []);

  const handleSubmit = (e, buddyId, buddyGoal, goalId, userId) => {
    e.preventDefault();
    props.addBuddy(buddyId, buddyGoal, goalId, userId);
    // M.Modal.close();
  };

  return (
    <>
      <Link to="#" className={props.className} data-target={props.dataTarget}>
        {props.btnName}
      </Link>
      {/* <Link to="#" className={props.className} data-target={props.dataTarget}>
        {props.btnName}
      </Link> */}
      <div id={props.dataTarget} className="modal">
        <div className="modal-content">
          <div className="collection">
            <h4>Select your goal to connect with: </h4>
            <h5>
              <b>{props.buddyGoalName}</b>
            </h5>

            {props.currentUserGoals.map(goal => (
              <Link
                to="#"
                key={goal.id}
                className="collection-item"
                onClick={e =>
                  handleSubmit(
                    e,
                    props.buddyId,
                    props.buddyGoalId,
                    goal.id,
                    props.userId
                  )
                }
              >
                {goal.name}
              </Link>
            ))}
          </div>
          <div className="modal-footer">
            <div className="btn modal-close">X</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinGoalModal;
