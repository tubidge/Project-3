import React, { useEffect, useState } from "react";
import "./style.css";
import moment from "moment";
import DayEvent from "../DayEvent";
import MilestoneForm from "../MilestoneForm";
import Loading from "../../components/Loading";
import API from "../../utils/API";
import M from "materialize-css";
// This needs to use an api call and find milestones based on the date so that it can dynamically rerender without having the whole section rerender
function DayCard(props) {
  const date = moment(props.date.date).format("dddd, MMM Do");
  const [milestones, setMilestones] = useState(props.date.incompleteMilestone);
  const [isLoading, setIsLoading] = useState(true);
  const [reRender, setreRender] = useState(false);
  const [milestoneSelected, setmilestoneSelected] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    document.addEventListener("click", event => {
      if (event.target.className === "day-event-item") {
        console.log(event.target);
        return false;
      } else if (milestoneSelected) {
        console.log("click");
        setmilestoneSelected(false);

        console.log(milestoneSelected);
      }
    });
    M.AutoInit();
    getData();
  }, [props.goalId, milestones.length, reRender, milestoneSelected]);
  // useEffect(() => {
  //   setIsLoading(true);
  // }, [allRender, milestones.length]);

  const getData = () => {
    setIsLoading(false);
  };

  const completeTask = () => {
    let data = {
      colName: "completed",
      info: true
    };
    API.editMilestone(milestoneSelected, data).then(() => {
      setmilestoneSelected(false);
      setreRender(!reRender);
      props.getMilestoneRender();
      props.orderProgressRender();
    });
  };
  const showMilestones = () => {
    return props.date.incompleteMilestone.map(index => {
      return (
        <DayEvent
          clickMilestone={clickMilestone}
          milestone={index}
          className="day-event-item"
        />
      );
    });
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

  const deleteTask = () => {
    API.deleteMilestone(milestoneSelected).then(data => {
      setmilestoneSelected(false);
      props.orderProgressRender();
      props.getMilestoneRender();
      setreRender(!reRender);
    });
  };
  const clickMilestone = id => {
    console.log(milestoneSelected);
    console.log(id);

    setmilestoneSelected(id);
  };
  const cancel = header => {
    setreRender(!reRender);
    props.orderProgressRender();
    props.reRender();
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="card day-card z-depth-2">
        <div className="day-card-add">
          {" "}
          <MilestoneForm
            className="material-icons modal-trigger day-card-icon"
            btnName="add_circle"
            data-position="top"
            data-tooltip="Add a milestone"
            dataTarget={`newGoalFromCard_${makeid(5)}`}
            frequency="Never"
            dueDate={props.date.date}
            goalId={props.goalId}
            userId={props.userId}
            close={cancel}
          />
        </div>
        <div className="card-title day-card-cardTitle">
          <p className="day-card-date">{date}</p>
          <div className="day-card-buttons">
            <p style={{ fontSize: "15px", marginLeft: "5px" }}>To Do:</p>
            {milestoneSelected ? (
              <div>
                <i
                  className="material-icons day-card-button"
                  onClick={completeTask}
                  style={{ color: "#daae37", cursor: "pointer" }}
                >
                  check_box
                </i>
                <i
                  className="material-icons day-card-button"
                  onClick={deleteTask}
                  style={{ color: "#d50000", cursor: "pointer" }}
                >
                  delete_forever
                </i>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="card-content day-card-content">
          <div>
            <div className="day-card-todo">
              <ul>{showMilestones()}</ul>
            </div>
          </div>
        </div>
        <div className="center-align">
          <p>
            Complete: {props.date.completedMilestone.length}/{" "}
            {props.date.incompleteMilestone.length +
              props.date.completedMilestone.length}
          </p>
        </div>
      </div>
    </>
  );
}
export default DayCard;
