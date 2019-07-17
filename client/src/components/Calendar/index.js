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
            event.backgroundColor = "#34495e";
            results.push(event);
            break;
          case "Education":
            event.backgroundColor = "#BDBDBD";
            results.push(event);
            break;
          case "Financial":
            event.backgroundColor = "#d4ac0d";
            results.push(event);
            break;
          case "Wellness":
            event.backgroundColor = "#5d6d7e";
            results.push(event);
            break;
          case "Travel":
            event.backgroundColor = "#8e793e";
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
            event.backgroundColor = "#34495e";
            results.push(event);
            break;
          case "Education":
            event.backgroundColor = "#bdbdbd";
            results.push(event);
            break;
          case "Financial":
            event.backgroundColor = "#d4ac0d";
            results.push(event);
            break;
          case "Wellness":
            event.backgroundColor = "#5d6d7e";
            results.push(event);
            break;
          case "Travel":
            event.backgroundColor = "#8e793e";
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

  render() {
    return (
      <div>
        <>
          <FullCalendar
            className="grey-lighten-4"
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
