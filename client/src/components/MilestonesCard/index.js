import React, { useEffect, useState } from "react";
import "./style.css";
import Loading from "../../components/Loading";
import API from "../../utils/API";
import ConfirmModal from "../ConfirmModal";
import MilestoneForm from "../MilestoneForm";
import moment from "moment";

function MilestonesCard(props) {
  const [milestones, setMilestones] = useState(false);
  const [reRender, setreRender] = useState(false);
  const [milestoneSelected, setmilestoneSelected] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState();
  const [modalOpen, setmodalOpen] = useState(false);
  const [frequency, setFrequency] = useState();

  const now = moment().format("YYYY-MM-DD");

  useEffect(() => {
    getData();
  }, [reRender, props.goalId]);
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
        return false;
      } else if (!modalOpen && milestoneSelected) {
      }
      setmilestoneSelected(false);
      setreRender(!reRender);
    });
  }, [milestoneSelected]);
  const getData = () => {
    API.getMilestoneFreq(props.goalId, props.frequency).then(data => {
      setMilestones(data.data);
    });
  };
  const clickMilestone = (name, frequency) => {
    setmilestoneSelected({ name: name, frequency: frequency });
  };
  const openConfirmModal = event => {
    event.preventDefault();
    console.log("delete button clicked");
    setCurrentMilestone(milestoneSelected);
    setmodalOpen(true);
  };

  const makeid = l => {
    let text = "";
    let char_list =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < l; i++) {
      text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return text;
  };

  const close = header => {
    if (header !== "cancel") {
      setreRender(!reRender);
      setmodalOpen(false);
      props.reRender();
    } else {
      // setreRender(!reRender);
      setmodalOpen(false);

      setmilestoneSelected(false);
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
            action="Delete"
          />
        ) : (
          ""
        )}

        <div className="card milestones-card z-depth-3">
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
                  onClick={() => clickMilestone(index.name, index.frequency)}
                >
                  {index.name}
                </div>
              );
            })}
          </div>
          <div className="card-action milestones-card-footer">
            <MilestoneForm
              goalId={props.goalId}
              userId={props.userId}
              frequency={props.frequency}
              dataTarget={`newGoalFromCard_${makeid(5)}`}
              close={close}
              dueDate={now}
              className="btn milestones-card-button modal-trigger"
              btnName={`New ${props.frequency}`}
            />

            {milestoneSelected ? (
              <button
                className="btn milestones-card-button"
                onClick={openConfirmModal}
              >
                Delete
              </button>
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
