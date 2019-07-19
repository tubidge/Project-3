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

  const handleClick = () => {
    return <h1>Hello</h1>;
  };

  const handleSubmit = (e, buddyId, buddyGoal, goalId, userId) => {
    e.preventDefault();
    props.addBuddy(buddyId, buddyGoal, goalId, userId);
  };

  return (
    <>
      <Link to="#" className={props.className} data-target={props.dataTarget}>
        {props.btnName}
      </Link>
      <div id={props.dataTarget} className="modal">
        <div className="modal-content">
          <div className="collection">
            <h5>Connect {props.buddyGoalName} with one of your goals!</h5>
            <p>
              When you select a goal, you and {props.buddyName} will become
              buddies for the duration you choose.
            </p>
            <div className="col s10 offset-s1">
              <div className="card">
                <div className="card-content">
                  <div className="card-title">Your Goals</div>
                  <div className="row">
                    {props.currentUserGoals.map(goal => (
                      <div className="col s6" key={goal.id}>
                        <Link
                          to="#"
                          className="collection-item"
                          onClick={handleClick}
                          // onClick={e =>
                          //   handleSubmit(
                          //     e,
                          //     props.buddyId,
                          //     props.buddyGoalId,
                          //     goal.id,
                          //     props.userId
                          //   )
                          // }
                        >
                          {goal.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
