import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./style.scss";
import API from "../../utils/API";
// import MilestoneModal from "../MilestoneModal";
export default class Cal extends React.Component {
  state = {
    events: []
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
          className: "modal-trigger"
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

  eventClick = function(info) {
    info.jsEvent.preventDefault();
    console.log(info.event);
    // return <MilestoneModal id={info.event.id} />;
  };

  // need to create a modal popup trigger by clicking a milestone on the calendar.

  render() {
    return (
      <FullCalendar
        dateClick={this.handleDateClick}
        plugins={[dayGridPlugin]}
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={this.state.events}
        eventClick={this.eventClick}
      />
    );
  }
}
