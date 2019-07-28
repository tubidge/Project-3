import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import MilestoneModal from "../MilestoneModal";
import M from "materialize-css";
import "./style.scss";
import "./style.css";

export default class Cal extends Component {
  state = {
    events: [],
    currentMilestoneId: null
  };

  componentDidMount() {
    M.AutoInit();
    this.getMilestones();
  }

  componentDidUpdate(prevProps) {
    if (this.props.render !== prevProps.render) {
      this.getMilestones();
    }
  }

  getMilestones() {
    let incompleteGoals = this.props.goals.currentGoals.incomplete;
    let incompleteMilestones = [];
    let completeMilestones = [];
    incompleteGoals.forEach(index => {
      incompleteMilestones.push(index.milestones.incomplete);
      completeMilestones.push(index.milestones.completed);
    });

    const results = [];
    incompleteMilestones.forEach(event => {
      event.forEach(index => {
        let event = {
          id: index.id,
          title: index.name,
          date: index.dueDate,
          category: index.category,
          className: "modal-trigger",
          dataTarget: `milestoneModal_${index.id}`
        };
        switch (event.category) {
          case "Fitness":
            event.backgroundColor = "#34495e";
            results.push(event);
            break;
          case "Education":
            event.backgroundColor = "#aaa";
            results.push(event);
            break;
          case "Financial":
            event.backgroundColor = "#d4ac0d";
            results.push(event);
            break;
          case "Wellness":
            event.backgroundColor = "#1A5276";
            results.push(event);
            break;
          case "Travel":
            event.backgroundColor = "#FFD54F";
            results.push(event);
            break;
          default:
            break;
        }
      });
    });
    completeMilestones.forEach(event => {
      event.forEach(index => {
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
            event.backgroundColor = "#aaa";
            results.push(event);
            break;
          case "Financial":
            event.backgroundColor = "#d4ac0d";
            results.push(event);
            break;
          case "Wellness":
            event.backgroundColor = "#1A5276";
            results.push(event);
            break;
          case "Travel":
            event.backgroundColor = "#FFD54F";
            results.push(event);
            break;
          default:
            break;
        }
      });
    });
    this.setState({
      events: results
    });
  }

  eventClick = info => {
    info.jsEvent.preventDefault();
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
