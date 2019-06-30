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
        allBuddies: undefined
      },
      goals: {
        activeGoals: {
          completed: [],
          incomplete: []
        },
        pastGoals: {
          completed: [],
          incomplete: []
        }
      },
      milestones: {
        activeMilestones: {
          completed: [],
          incomplete: []
        },
        pastMilestones: {
          completed: [],
          incomplete: []
        }
      }
    }
  };

  // Fetch the list on first mount
  componentDidMount() {
    API.getUserByEmail(this.props.user).then(resp => {
      console.log(resp.data);
      let data = resp.data;
      this.setState({
        userInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          email: data.email,
          id: data.id,
          buddies: {
            buddiesWith: data.buddies.buddiesWith,
            myBuddies: data.buddies.myBuddies,
            allBuddies: data.buddies.allBuddies
          },
          goals: {
            activeGoals: {
              completed: data.activeGoals.completed,
              incomplete: data.activeGoals.incomplete
            },
            pastGoals: {
              completed: data.pastGoals.completed,
              incomplete: data.pastGoals.incomplete
            }
          },
          milestones: {
            activeMilestones: {
              completed: data.activeMilestones.completed,
              incomplete: data.activeMilestones.incomplete
            },
            pastMilestones: {
              completed: data.pastMilestones.completed,
              incomplete: data.pastMilestones.incomplete
            }
          }
        }
      });
    });
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

  filterMilestones() {
    // create a function to return all the milestones for each specific goal (ask Hunter)
  }

  render() {
    const userInfo = this.state.userInfo;
    return (
      <>
        <div className="row">
          <h1>{this.props.user}</h1>
          <div className="col s12">
            <h4>{`${userInfo.firstName} ${userInfo.lastName}`}</h4>
            <h5>{userInfo.username}</h5>
            <h5>{userInfo.email}</h5>
          </div>
        </div>
        <hr />
        <div className="row">
          <h5>Incomplete Active Goals</h5>
          <hr />
          {userInfo.goals.activeGoals.incomplete.map(goal => (
            <div className="col s4" key={goal.id}>
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">{goal.name}</span>
                  <div className="card-action">
                    <Link to="#">{goal.category}</Link>
                    <Link to="#">{goal.dueDate}</Link>
                    <br />
                    <button className="btn">Edit Goal</button>
                    <button className="btn">Delete Goal</button>
                  </div>
                  <div />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <h5>Milestones</h5>
          <hr />
          Filter through milestones to return milestones for each specific goal
        </div>
        <div className="row">
          <h5>allBuddies</h5>
          <hr />
          {userInfo.buddies.allBuddies}
        </div>
        <div className="row">
          <h5>buddiesWith</h5>
          <hr />
          {userInfo.buddies.buddiesWith.map(buddy => (
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
