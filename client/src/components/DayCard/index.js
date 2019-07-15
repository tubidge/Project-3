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

  useEffect(() => {
    API.getMilestoneDate(props.goalId, props.date).then(data => {
      console.log(data);
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
      setMilestones(milestones);
      setIsLoading(false);
    });
  }, [reRender, props.goalId]);

  const openMilestoneForm = event => {
    event.preventDefault();
    setmodalOpen(true);
  };

  const cancel = () => {
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
          userId={props.userId}
          goalId={props.goalId}
          close={cancel}
        />
      ) : (
        ""
      )}

      <div className="card day-card">
        <div className="card-content">
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
          </div>
          <div>
            <p>Incomplete:</p>
            <ul>
              {milestones.incomplete.length
                ? milestones.incomplete.map(index => {
                    return <DayEvent milestone={index.name} />;
                  })
                : ""}
            </ul>
          </div>
          <div>
            <p>Complete:</p>
            <ul>
              {milestones.completed.length
                ? milestones.completed.map(index => {
                    return <DayEvent milestone={index.name} />;
                  })
                : ""}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default DayCard;
