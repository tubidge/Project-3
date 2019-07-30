import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";

function ConfirmModal(props) {
  console.log("Confirm modal opening");
  const [dataTarget, setDataTarget] = useState();

  useEffect(() => {
    setDataTarget(props.dataTarget);
    M.AutoInit();
    let modals = document.querySelectorAll(".modal");
    let options = {
      dismissible: true,
      inDuration: 200,
      outDuration: 400
    };
    M.Modal.init(modals, options);
  }, []);

  const handleCancel = event => {
    event.preventDefault();
  };

  const del = () => {
    console.log(props);
    API.deleteMilestoneFreq(
      props.goalId,
      props.milestone.name,
      props.milestone.frequency
    ).then(resp => {
      console.log(resp);
      props.render(props.action);
    });
  };

  const completeGoal = () => {
    console.log("complete goal firing");
    console.log(props.goalId);
    let data = {
      colName: "complete",
      info: true
    };
    API.editGoal(props.goalId, data).then(resp => {
      console.log(resp);
      props.render(props.action);
    });
  };

  const delGoal = () => {
    API.deleteGoal(props.goalId).then(resp => {
      console.log(resp);
      props.render(props.action);
    });
  };

  const takeAction = event => {
    event.preventDefault();
    switch (props.type) {
      case "Delete":
        del();
        break;
      case "Delete Goal":
        delGoal();
        break;
      case "Complete":
        completeGoal();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Link
        to="#"
        className={props.className}
        data-target={dataTarget}
        // style={props.style}
      >
        {props.btnName}
      </Link>

      <div id="confirmModal">
        <div id={dataTarget} className="modal">
          <div className="modal-content">
            <h4>Are you sure?</h4>
            <p>{props.message}</p>
          </div>
          <div className="modal-footer confirm-modal-footer">
            <button onClick={takeAction} className="btn  deleteBtn">
              {props.type}
              <i className="material-icons right">
                {props.type === "Complete" ? "done" : "delete_forever"}
              </i>
            </button>

            <button
              onClick={handleCancel}
              className="btn modal-close grey"
              type="submit"
            >
              Cancel
              <i className="material-icons right">cancel</i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmModal;
