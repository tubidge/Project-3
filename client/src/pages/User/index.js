import React, { Component } from "react";
import API from "../../utils/API";
import Sendbird from "../../utils/SendBird";
import OpenChat from "../../components/OpenChat";
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
    Messenger: null,
    channelsConfigured: false
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

  configChannels = async () => {
    await this.state.Messenger.createChannels();
    console.log(this.state.Messenger.channels);
    // this.state.Messenger.channels.forEach(index => {
    //   this.state.Messenger.getChannel(index, data => {
    //     console.log("running");
    //     this.state.Messenger.sendMessage(data);
    //   });
    // });
    this.setState({
      channelsConfigured: true
    });
  };

  getUserInfo = id => {
    API.getUser(id).then(resp => {
      console.log(resp.data);
      let data = resp.data;
      this.state.Messenger = new Sendbird(data.email, data.buddies.allBuddies);
      this.state.Messenger.configUser();

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
      this.configChannels();
      console.log(this.state.Messenger.channels);
    });
  };

  render() {
    return (
      <div className="container">
        <h1>
          Current User: {this.state.userInfo.firstName}{" "}
          {this.state.userInfo.lastName}
        </h1>

        <div>
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
        <div>
          {this.state.channelsConfigured ? (
            <OpenChat
              isConfigured={this.state.channelsConfigured}
              channels={this.state.Messenger.channels}
              Messenger={this.state.Messenger}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default User;
