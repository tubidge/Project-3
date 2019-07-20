import React, { useEffect } from "react";
import M from "materialize-css";
import API from "../../utils/API";
import "./style.css";

function ConfirmModal(props) {
  useEffect(() => {
    M.AutoInit();
    let modals = document.querySelectorAll(".modal");
    let options = {
      dismissible: true,
      inDuration: 200,
      outDuration: 400
    };
    M.Modal.init(modals, options);
    var Modalelem = document.querySelector("#confirmModal");
    var instance = M.Modal.init(Modalelem);
    instance.open();
  }, []);

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

  const takeAction = () => {
    switch (props.type) {
      case "Delete":
        del();
        break;
    }
  };

  return (
    <div id="confirmModal" className="modal">
      <div className="modal-content">
        <h4>Are you sure?</h4>
        <p>{props.message}</p>
      </div>
      <div className="modal-footer confirm-modal-footer">
        <a className="modal-close btn" onClick={takeAction}>
          {props.type}
        </a>
        <a className="modal-close btn" onClick={() => props.render("cancel")}>
          Cancel
        </a>
      </div>
    </div>
  );
}

export default ConfirmModal;
