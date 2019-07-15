import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./style.scss";
import "./style.css";
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
    API.getAllMilestones(this.props.userId).then(data => {
      console.log(data);
      let incompleteMilestones = data.data.incomplete;
      let completeMilestones = data.data.completed;
      const results = [];
      incompleteMilestones.forEach(index => {
        let event = {
          id: index.id,
          title: index.name,
          date: index.dueDate,
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
      });
      completeMilestones.forEach(index => {
        let event = {
          id: index.id,
          title: index.name,
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
    this.setState(
      {
        currentMilestoneId: null
      },
      () => {
        this.getMilestones(this.props.userId);
        this.props.orderRender();
      }
    );
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
