import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./style.scss";
import API from "../../utils/API";
import MilestoneModal from "../MilestoneModal";
import { Modal, Button } from "react-materialize";

export default class Cal extends React.Component {
  state = {
    events: [],
    currentMilestoneId: null
  };

  componentDidMount() {
    this.getMilestones();
  }

  getMilestones() {
    API.getAllMilestones(1).then(data => {
      console.log(data);
      let incompleteMilestones = data.data.incomplete;
      let completeMilestones = data.data.completed;
      const results = [];
      incompleteMilestones.forEach(index => {
        let event = {
          id: index.id,
          title: index.name,
          date: index.dueDate,
          className: "modal-trigger",
          dataTarget: "milestoneModal"
        };
        results.push(event);
      });
      completeMilestones.forEach(index => {
        let event = {
          id: index.id,
          title: index.name,
          date: index.dueDate,
          className: "modal-trigger"
        };
        results.push(event);
      });
      console.log(results);
      this.setState({
        events: results
      });
    });
  }

  eventClick = info => {
    info.jsEvent.preventDefault();
    console.log(info.event);
    this.setState({
      currentMilestoneId: info.event.id
    });
  };

  cancel = () => {
    this.setState({
      currentMilestoneId: null
    });
  };

  // need to create a modal popup trigger by clicking a milestone on the calendar.

  render() {
    return (
      <div>
        <>
          <FullCalendar
            dateClick={this.handleDateClick}
            plugins={[dayGridPlugin]}
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            events={this.state.events}
            eventClick={this.eventClick}
          />
        </>
        {this.state.currentMilestoneId ? (
          <MilestoneModal
            id={this.state.currentMilestoneId}
            cancel={this.cancel}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
