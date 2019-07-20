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
  const [modalOpen, setmodalOpen] = useState(false);
  const [milestones, setMilestones] = useState(props.date.incompleteMilestone);
  const [isLoading, setIsLoading] = useState(true);
  const [reRender, setreRender] = useState(false);
  const [total, setTotal] = useState([
    props.date.incompleteMilestone.length + props.date.completedMilestone.length
  ]);
  const [complete, setComplete] = useState(
    props.date.completedMilestone.length
  );
  const [milestoneSelected, setmilestoneSelected] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    M.AutoInit();
    getData();
  }, [props.goalId, milestones.length]);
  // useEffect(() => {
  //   setIsLoading(true);
  // }, [allRender, milestones.length]);
  useEffect(() => {
    document.addEventListener("click", event => {
      if (event.target.className === "day-event-item") {
        return false;
      } else if (milestoneSelected) {
        setmilestoneSelected(false);
        setreRender(!reRender);
      }
    });
  }, [milestoneSelected]);
  const getData = () => {
    console.log(props.date);
    setIsLoading(false);
  };
  const openMilestoneForm = event => {
    event.preventDefault();
    setmodalOpen(true);
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
    console.log("====================");
    console.log(milestones);
    console.log(props);
    return props.date.incompleteMilestone.map(index => {
      return <DayEvent
        clickMilestone={clickMilestone}
        milestone={index}
        className="day-event-item tooltipped"
        dataPosition="top"
        dataTooltip={index}
      />;
    });
  };
  const deleteTask = () => {
    API.deleteMilestone(milestoneSelected).then(data => {
      console.log(data);
      setmilestoneSelected(false);
      props.orderProgressRender();
      props.getMilestoneRender();
      setreRender(!reRender);
    });
  };
  const clickMilestone = id => {
    setmilestoneSelected(id);
  };
  const cancel = header => {
    console.log(header);
    if (header !== "Never") {
      console.log(props);
      console.log("render ordered");
      props.reRender();
    }
    setmodalOpen(false);
    props.orderProgressRender();
    setreRender(!reRender);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {modalOpen ? (
        <MilestoneForm
          date={props.date}
          userId={props.userId}
          goalId={props.goalId}
          close={cancel}
          frequency="Never"
        />
      ) : (
          ""
        )}
      <div className="card day-card z-depth-2">
        <div className="day-card-add">
          {" "}
          <i
            className="material-icons day-card-icon tooltipped"
            data-position="top"
            data-tooltip="Add a milestone"
            onClick={event => {
              openMilestoneForm(event);
            }}
          >
            add_circle
          </i>
        </div>
        <div className="card-title day-card-cardTitle">
          <p className="day-card-date">{date}</p>
          <div className="day-card-buttons">
            <p style={{ fontSize: "15px", marginLeft: "5px" }}>Todo</p>
            {milestoneSelected ? (
              <div>
                <i
                  className="material-icons day-card-button"
                  onClick={completeTask}
                  style={{ color: "#e2e77d", cursor: "pointer" }}
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
        <div>
          <p style={{ marginLeft: "5px" }}>
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
