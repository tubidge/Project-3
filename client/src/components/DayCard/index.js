import React, { useEffect, useState } from "react";
import "./style.css";
import moment from "moment";
import DayEvent from "../DayEvent";

function DayCard(props) {
  const date = moment(props.date).format("dddd, MMM Do");

  const [modalOpen, setmodalOpen] = useState(false);

  const openMilestoneForm = event => {
    event.preventDefault();
    setmodalOpen(true);
  };

  if (modalOpen) {
    return <MilestoneForm />;
  }

  return (
    <div className="card day-card">
      <div className="card-content">
        <div className="day-card-add">
          {" "}
          <i
            className="material-icons day-card-icon"
            onClick={openMilestoneForm}
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
            {props.incomplete.length
              ? props.incomplete.map(index => {
                  return <DayEvent milestone={index.name} />;
                })
              : ""}
          </ul>
        </div>
        <div>
          <p>Complete:</p>
          <ul>
            {props.completed.length
              ? props.completed.map(index => {
                  return <DayEvent milestone={index.name} />;
                })
              : ""}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DayCard;
