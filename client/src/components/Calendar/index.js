import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./style.scss";
import API from "../../utils/API";
<<<<<<< HEAD
// import MilestoneModal from "../MilestoneModal";
export default class Cal extends React.Component {
  state = {
    events: []
=======
import MilestoneModal from "../MilestoneModal";
import { Modal, Button } from "react-materialize";

export default class Cal extends React.Component {
  state = {
    events: [],
    currentMilestoneId: null
>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5
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
<<<<<<< HEAD
          className: "modal-trigger"
        };
        results.push(event);
=======
          category: index.category,
          className: "modal-trigger",
          dataTarget: "milestoneModal"
        };
        switch (event.category) {
          case "Fitness":
            event.backgroundColor = "#C65BC0";
            results.push(event);
            break;
          case "Education":
            event.backgroundColor = "#25629F";
            results.push(event);
            break;
          case "Financial":
            event.backgroundColor = "#4CA824";
            results.push(event);
            break;
          case "Wellness":
            event.backgroundColor = "#93BCE6";
            results.push(event);
            break;
          case "Travel":
            event.backgroundColor = "#808B96";
            results.push(event);
            break;
        }
>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5
      });
      completeMilestones.forEach(index => {
        let event = {
          id: index.id,
<<<<<<< HEAD
          title: index.name,
          date: index.dueDate,
          className: "modal-trigger"
        };
        results.push(event);
=======
          title: index.name + " X",
          date: index.dueDate,
          category: index.category,
          className: "modal-trigger completed-milestone-cal"
        };
        switch (event.category) {
          case "Fitness":
            event.backgroundColor = "#C65BC0";
            results.push(event);
            break;
          case "Education":
            event.backgroundColor = "#25629F";
            results.push(event);
            break;
          case "Financial":
            event.backgroundColor = "#4CA824";
            results.push(event);
            break;
          case "Wellness":
            event.backgroundColor = "#93BCE6";
            results.push(event);
            break;
          case "Travel":
            event.backgroundColor = "#808B96";
            results.push(event);
            break;
        }
>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5
      });
      console.log(results);
      this.setState({
        events: results
      });
    });
  }

<<<<<<< HEAD
  eventClick = function(info) {
    info.jsEvent.preventDefault();
    console.log(info.event);
    // return <MilestoneModal id={info.event.id} />;
=======
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
>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5
  };

  // need to create a modal popup trigger by clicking a milestone on the calendar.

  render() {
    return (
<<<<<<< HEAD
      <FullCalendar
        dateClick={this.handleDateClick}
        plugins={[dayGridPlugin]}
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={this.state.events}
        eventClick={this.eventClick}
      />
=======
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
>>>>>>> 99650a92cc3e7cadc04d46e31e51c607fa447dc5
    );
  }
}
