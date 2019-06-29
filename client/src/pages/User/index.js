import React, { Component } from "react";
import * as SendBird from "sendbird";
import Div from "../../components/Div";
import API from "../../utils/API";
const axios = require("axios");

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
    },
    sb: undefined
  };

  // Fetch the list on first mount
  componentDidMount() {
    this.getUserInfo(1);

    // const params = new sb.UserMessageParams();

    // params.message = "Hey dude";
    // params.mentionType = "users"; // Either 'users' or 'channel'
    // params.mentionedUserIds = ["hunterdavis@me.com"]; // or mentionedUsers = Array<User>;
    // params.metaArrayKeys = ["linkTo", "itemType"];
    // params.translationTargetLanguages = ["fe", "de"]; // French and German
    // params.pushNotificationDeliveryOption = "default"; // Either 'default' or 'suppress'

    // var userIds = ["hunterdavis@me.com", "philbenson@me.com"];
    // // When 'distinct' is false
    // let NAME = "Lose Weight";
    // var autoAccept = true; // The value of `true` (default) means that a user will automatically join a group channel with no choice of accepting and declining an invitation.

    // sb.setChannelInvitationPreference(autoAccept, function(response, error) {
    //   console.log(response);
    //   if (error) {
    //     return;
    //   }
    // });

    // sb.GroupChannel.createChannelWithUserIds(
    //   userIds,
    //   false,
    //   NAME,

    //   function(groupChannel, error) {
    //     if (error) {
    //       return;
    //     }

    //     console.log(groupChannel);
    //     groupChannel.sendUserMessage(params, function(message, error) {
    //       if (error) {
    //         return;
    //       }

    //       console.log(message);
    //     });
    //   }
    // );
  }

  getCurrentUser = () => {
    this.setState({ email: this.props.auth.getProfile().email });
  };

  getUserInfo = id => {
    API.getUser(id).then(resp => {
      console.log(resp.data);
      let data = resp.data;
      const sb = new SendBird({
        appId: "967DB9F9-E8D2-4E23-B15F-23D57E860769"
      });
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
        },
        sb: sb
      });
    });
  };

  render() {
    if (this.state.sb === undefined) {
      return false;
    } else {
      console.log("working");
      this.state.sb.connect(this.state.userInfo.email, (user, error) => {
        console.log(this.state.userInfo.email);
        console.log(user);
        if (error) {
          return error;
        }
      });
    }

    return (
      <div className="container">
        <h1>
          Current User: {this.state.userInfo.firstName}{" "}
          {this.state.userInfo.lastName}
        </h1>
        <div>
          {this.state.userInfo.buddies.allBuddies.map(index => {
            console.log(index);
            return (
              <Div
                sb={this.state.sb}
                buddy={index}
                user={this.state.userInfo.email}
              />
            );
          })}
          <h1>List of All Users (from database)</h1>
          {/* Check to see if any items are found*/}
          {/* {users.length ? (
            <div>
              {users.map(user => (
                <div key={user.id}>
                  <h5>{user.id}</h5>
                  <p>{user.firstName + user.lastName + " | " + user.email}</p>
                  {user.Goals.map(goal => (
                    <div key={goal.id}>
                      <h4>{goal.category}</h4>
                      <h5>{goal.name}</h5>
                      <br />
                    </div>
                  ))}
                  <hr />
                </div>
              ))}
            </div>
          ) : (
            <h3>No Results to Display</h3>
          )} */}
        </div>
      </div>
    );
  }
}

export default User;
