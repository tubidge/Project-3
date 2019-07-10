import React, { Component } from "react";
import API from "../../utils/API";
import Sendbird from "../../utils/SendBird";
import OpenChat from "../../components/OpenChat";
import ChatBox from "../../components/ChatBox";
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
    channelsConfigured: false,
    channels: [],
    currentChannel: null,
    messageBody: ""
  };

  // Fetch the list on first mount
  componentDidMount() {
    this.getUserInfo(this.props.auth.getProfile().name);

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

  // componentDidUpdate() {
  //   if (this.state.currentChannel === null) {
  //     return false;
  //   } else {
  //     console.log("working");
  //     this.scrollToBottom();
  //   }
  // }

  getCurrentUser = () => {
    this.setState({ email: this.props.auth.getProfile().email });
  };

  configChannels = async () => {
    await this.state.Messenger.createChannels(data => {
      console.log(data);
      if (this.state.currentChannel) {
        this.openChannel(this.state.currentChannel.connection.url);
      }
    });
    console.log(this.state.Messenger.channels);
    let channels = this.state.Messenger.channels;
    this.setState({
      channelsConfigured: true,
      channels: channels
    });
  };

  sortMessages = () => {
    let sortedMessages = [];
    let keys = [];
    this.state.currentChannel.messages.forEach(index => {
      if (!keys.includes(index.messageId)) {
        keys.push(index.messageId);
        sortedMessages.push(index);
      } else {
        return false;
      }
    });
    console.log(this.state.currentChannel.connection);

    this.setState({
      messageBody: "",
      currentChannel: {
        connection: this.state.currentChannel.connection,
        messages: sortedMessages
      }
    });
  };

  openChannel = channel => {
    // this.state.channels.forEach(index => {
    //   if (index.connection === channel) {
    //     this.setState({
    //       currentChannel: index.fullConnection
    //     });
    //   }
    // });

    this.state.Messenger.getChannel(channel, data => {
      this.setState({
        currentChannel: data
      });
    });
  };

  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.state.currentChannel.connection.isTyping(true);
    this.state.Messenger.ChannelHandler.onTypingStatusUpdated(
      this.state.currentChannel.connection
    );
    this.setState({
      [name]: value
    });
    console.log(this.state.currentChannel);
  };

  submitNewMessage = event => {
    event.preventDefault();
    console.log("working");
    if (this.state.messageBody === "" || this.state.messageBody === " ") {
      return false;
    } else {
      this.state.Messenger.sendMessage(
        this.state.messageBody,
        this.state.currentChannel.connection.members[1].userId,
        this.state.currentChannel.connection,
        data => {
          document.getElementById("messageField").value = "";
          console.log("running");
          console.log(data);
          let channel = this.state.currentChannel.messages;
          console.log(channel);

          this.openChannel(this.state.currentChannel.connection.url);
        }
      );
    }
  };

  loadChannels = () => {
    this.state.Messenger.configChannels();
    if (this.state.currentChannel) {
      this.openChannel(this.state.currentChannel.connection.url);
    }
  };

  exitUserMessage = event => {
    event.preventDefault();
    this.setState({
      currentChannel: null
    });
  };

  getUserInfo = email => {
    API.getUserByEmail(email).then(resp => {
      console.log(resp.data);
      let data = resp.data;

      if (data.buddies) {
        this.state.Messenger = new Sendbird(
          data.email,
          data.buddies.allBuddies
        );
        this.state.Messenger.configUser();
        this.setState({
          userInfo: {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
            id: data.id,
            buddies: {
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
        this.loadChannels();
        console.log(this.state.Messenger.channels);
      }
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
              openChannel={this.openChannel}
            />
          ) : null}
        </div>
        <div>
          {this.state.currentChannel ? (
            <ChatBox
              exit={this.exitUserMessage}
              handleInput={this.handleInputChange}
              submitNewMessage={this.submitNewMessage}
              messages={this.state.currentChannel.messages}
              userId={this.state.userInfo.email}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default User;
