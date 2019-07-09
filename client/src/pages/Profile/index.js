import React, { Component } from "react";
import { Link } from "react-router-dom";
import MilestoneForm from "../../components/MilestoneForm";
import API from "../../utils/API";

class Profile extends Component {
  state = {
    title: "",
    frequency: "Never",
    dueDate: "",
    startDate: null,
    endDate: null,
    notes: null
  };

  login() {
    this.props.auth.login();
  }

  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  addMilestone = event => {
    event.preventDefault();
    const milestone = {
      name: this.state.title,
      frequency: this.state.frequency,
      dueDate: this.state.dueDate,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      notes: this.state.notes,
      GoalId: 1,
      UserId: 1
    };
    if (this.state.frequency === "Never") {
      document.getElementById("milestoneTitle").value = "";
      document.getElementById("milestoneFrequency").value = "";
      document.getElementById("milestoneDueDate").value = "";
      document.getElementById("milestoneNotes").value = "";
    } else {
      document.getElementById("milestoneTitle").value = "";
      document.getElementById("milestoneFrequency").value = "";
      document.getElementById("milestoneStart").value = "";
      document.getElementById("milestoneEnd").value = "";
      document.getElementById("milestoneNotes").value = "";
    }

    API.addMilestone(milestone).then(data => {
      console.log(data);
    });

    this.setState({
      title: "",
      frequency: "Never",
      dueDate: "",
      startDate: null,
      endDate: null,
      notes: null
    });
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {isAuthenticated() && (
          <div>
            <MilestoneForm
              handleInput={this.handleInputChange}
              addMilestone={this.addMilestone}
              frequency={this.state.frequency}
            />
          </div>
        )}
        {!isAuthenticated() && (
          <h4>
            You are not logged in, so you don't have access! Please{" "}
            <Link to="#" onClick={this.login.bind(this)}>
              Log In
            </Link>
            to continue.
          </h4>
        )}
      </div>
    );
  }
}

export default Profile;
