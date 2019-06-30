import React, { Component } from "react";
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
    API.getUserByEmail("feeno12@me.com").then(resp => {
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

  render() {
    const userInfo = this.state.userInfo;
    return (
      <>
        <div className="row">
          <div className="col s12">
            <h4>{`${userInfo.firstName} ${userInfo.lastName}`}</h4>
            <h5>{userInfo.username}</h5>
            <h5>{userInfo.email}</h5>
          </div>
        </div>
        <div className="row">
          <h5>Incomplete Active Goals</h5>
          {userInfo.goals.activeGoals.incomplete.map(goal => (
            <div className="col s4" key={goal.id}>
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">{goal.name}</span>
                  <div class="card-action">
                    <a href="#">{goal.category}</a>
                    <a href="#">{goal.dueDate}</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <h5>Buddies</h5>
          {userInfo.buddies.allBuddies}
        </div>
      </>
    );
  }
}

export default User;
