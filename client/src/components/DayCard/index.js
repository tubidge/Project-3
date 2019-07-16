import React, { useEffect, useState } from "react";
import "./style.css";
import moment from "moment";
import DayEvent from "../DayEvent";
import MilestoneForm from "../MilestoneForm";
import Loading from "../../components/Loading";
import API from "../../utils/API";
// This needs to use an api call and find milestones based on the date so that it can dynamically rerender without having the whole section rerender

function DayCard(props) {
  const date = moment(props.date).format("dddd, MMM Do");

  const [modalOpen, setmodalOpen] = useState(false);
  const [milestones, setMilestones] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [reRender, setreRender] = useState(false);
  const [total, setTotal] = useState(0);
  const [complete, setComplete] = useState(0);
  const [milestoneSelected, setmilestoneSelected] = useState(false);
  const [allRender, setAllRender] = useState(props.status);

  useEffect(() => {
    API.getMilestoneDate(props.goalId, props.date).then(data => {
      const milestones = {
        completed: [],
        incomplete: []
      };
      data.data.forEach(index => {
        if (index.completed) {
          milestones.completed.push(index);
        } else {
          milestones.incomplete.push(index);
        }
      });
      let num1 = milestones.completed.length + milestones.incomplete.length;
      let num2 = milestones.completed.length;
      setTotal(num1);
      setComplete(num2);
      setMilestones(milestones);
      setIsLoading(false);
    });
  }, [reRender, props.goalId]);

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
    });
  };

  const deleteTask = () => {
    API.deleteMilestone(milestoneSelected).then(data => {
      console.log(data);
      setmilestoneSelected(false);
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
        />
      ) : (
        ""
      )}

      <div className="card day-card z-depth-2">
        <div className="day-card-add">
          {" "}
          <i
            className="material-icons day-card-icon"
            onClick={event => {
              openMilestoneForm(event);
            }}
          >
            add_circle
          </i>
        </div>
        <div className="card-title">
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
              <ul>
                {milestones.incomplete.length
                  ? milestones.incomplete.map(index => {
                      return (
                        <DayEvent
                          clickMilestone={clickMilestone}
                          milestone={index}
                        />
                      );
                    })
                  : ""}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <p style={{ marginLeft: "5px" }}>
            Complete: {complete}/{total}
          </p>
        </div>
      </div>
    </>
  );
}

export default DayCard;
