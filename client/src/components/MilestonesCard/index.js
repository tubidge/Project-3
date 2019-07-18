import React, { useEffect, useState } from "react";
import "./style.css";
import Loading from "../../components/Loading";
import API from "../../utils/API";
import ConfirmModal from "../ConfirmModal";

function MilestonesCard(props) {
  const [milestones, setMilestones] = useState(false);
  const [reRender, setreRender] = useState(false);
  const [milestoneSelected, setmilestoneSelected] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState();
  const [modalOpen, setmodalOpen] = useState(false);

  useEffect(() => {
    API.getMilestoneFreq(props.goalId, props.frequency).then(data => {
      console.log(data);
      setMilestones(data.data);
      console.log(milestones);
    });
  }, [reRender]);

  useEffect(() => {
    document.addEventListener("click", event => {
      if (
        event.target.className === "chip" ||
        event.target.className === "milestones-card-button"
      ) {
        return false;
      } else if (
        event.target.className === "milestones-card-button" &&
        milestoneSelected
      ) {
        console.log("return false for delete");
        return false;
      } else if (!modalOpen && milestoneSelected) {
      }
      console.log("reset");
      setmilestoneSelected(false);
      setreRender(!reRender);
    });
  }, [milestoneSelected]);

  const clickMilestone = (name, frequency) => {
    setmilestoneSelected({ name: name, frequency: frequency });
  };

  const openConfirmModal = event => {
    console.log("modal opening");
    console.log(milestoneSelected);
    setCurrentMilestone(milestoneSelected);
    event.preventDefault();
    setmodalOpen(true);
  };

  const close = header => {
    if (header !== "cancel") {
      props.reRender();
    } else {
      setreRender(!reRender);
      setmodalOpen(false);
      setreRender(!reRender);
      setmilestoneSelected(false);
      props.orderDays();
      props.orderProgressRender();
    }
  };

  if (milestones) {
    return (
      <>
        {modalOpen ? (
          <ConfirmModal
            message="This will delete all repeating instances for this milestone"
            type="Delete"
            goalId={props.goalId}
            milestone={currentMilestone}
            render={close}
            action="cancel"
          />
        ) : (
          ""
        )}

        <div className="card milestones-card z-depth-5">
          <div className="card-content white-text milestones-card-body">
            <span className="card-title milestones-card-title">
              {props.frequency} Milestones
            </span>
            {milestones.map(index => {
              return (
                <div
                  selected={milestoneSelected}
                  id={index.name}
                  className="chip"
                  style={{ color: "#10355f", cursor: "pointer" }}
                  onClick={() => clickMilestone(index.name, index.frequency)}
                >
                  {index.name}
                </div>
              );
            })}
          </div>
          <div className="card-action milestones-card-footer">
            <a
              className="waves-effect waves-light btn milestones-card-button"
              style={{ backgroundColor: "#10355f", color: "#e2e77d" }}
            >
              <i className="material-icons right" style={{ color: "#e2e77d" }}>
                add_to_photos
              </i>
              New {props.frequency}
            </a>
            {milestoneSelected ? (
              <a
                className="waves-effect waves-light btn milestones-card-button"
                style={{ backgroundColor: "#10355f", color: "#e2e77d" }}
                onClick={openConfirmModal}
              >
                {/* <i className="material-icons right" style={{ color: "#e2e77d" }}>
                            add_to_photos
              </i> */}
                Delete
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );
  } else {
    return "";
  }
}

export default MilestonesCard;
