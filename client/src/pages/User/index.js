import React, { Component } from "react";
import { Link } from "react-router-dom";
// import GoalCard from "../../components/GoalCard";
import API from "../../utils/API";
import "./style.css";

class User extends Component {
  state = {
    userInfo: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      id: "",
      buddies: {
        buddiesWith: [],
        myBuddies: [],
        allBuddies: []
      }
    },
    currentGoalsIncomplete: []
  };

  // Fetch the list on first mount
  componentDidMount() {
    API.getUserByEmail(this.props.user).then(resp => {
      console.log(resp.data);
      let userData = resp.data;
      API.getAllGoals(userData.id).then(res => {
        console.log(res.data);
        let goalData = res.data;
        this.setState({
          currentGoalsIncomplete: goalData.currentGoals.incomplete
        });
        this.setState({
          userInfo: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            username: userData.username,
            email: userData.email,
            id: userData.id,
            buddies: {
              buddiesWith: userData.buddies.buddiesWith,
              myBuddies: userData.buddies.myBuddies,
              allBuddies: userData.buddies.allBuddies
            }
          }
        });
      });
    });
  }

  renderGoals() {
    return this.state.currentGoalsIncomplete.map(goal => (
      <div className="col s6" key={goal.id}>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{goal.name}</span>
            <div className="card-action">
              <Link to="#">Category: {goal.category}</Link>
              <br />
              <Link to="#">Due Date: {goal.dueDate}</Link>
              <br />
              <button className="btn">Edit Goal</button>
              <button className="btn">Delete Goal</button>
            </div>
            <div>
              <h5>Milestones</h5>
              {goal.milestones.incomplete.map(milestone => (
                <div key={milestone.id}>
                  <p>Frequency: {milestone.name}</p>
                  <p>Frequency: {milestone.frequency}</p>
                  <p>Due Date: {milestone.dueDate}</p>
                  <hr />
                </div>
              ))}
            </div>
            <div />
          </div>
        </div>
      </div>
    ));
  }

  addGoal() {
    // insert add goal route here
  }

  editGoal() {
    // insert edit goal route here
  }

  deleteGoal() {
    // insert delete goal route here
  }

  markGoalComplete() {
    // insert a route to mark a goal as complete
  }

  render() {
    return (
      <>
        <div className="row">
          <h1>{this.props.user}</h1>
          <div className="col s12">
            <h4>{`${this.state.userInfo.firstName} ${
              this.state.userInfo.lastName
            }`}</h4>
            <h5>{this.state.userInfo.username}</h5>
            <h5>{this.state.userInfo.email}</h5>
          </div>
        </div>
        <hr />
        <div className="row">
          <h5>Current Incomplete Goals</h5>
          <hr />
          <div>{this.renderGoals()}</div>
        </div>
        <div className="row">
          <h5>allBuddies</h5>
          <hr />
          {this.state.userInfo.buddies.allBuddies}
        </div>
        <div className="row">
          <h5>buddiesWith</h5>
          <hr />
          {this.state.userInfo.buddies.buddiesWith.map(buddy => (
            <div key={buddy.buddyId}>
              <p>Buddy ID: {buddy.buddyId}</p>
              <p>Goal ID: {buddy.goalId}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default User;

// <div className="row">
//   <h5>Incomplete Active Goals</h5>
//   <hr />
//   {userInfo.goals.activeGoals.incomplete.map(goal => (
//     <div className="col s4" key={goal.id}>
//       <div className="card blue-grey darken-1">
//         <div className="card-content white-text">
//           <span className="card-title">{goal.name}</span>
//           <div className="card-action">
//             <Link to="#">{goal.category}</Link>
//             <Link to="#">{goal.dueDate}</Link>
//             <br />
//             <button className="btn">Edit Goal</button>
//             <button className="btn">Delete Goal</button>
//           </div>
//           <div />
//         </div>
//       </div>
//     </div>
//   ))}
// </div>
