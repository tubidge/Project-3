import React, { Component } from "react";
import API from "../../utils/API";
import Sendbird from "../../utils/Sendbird";
import OpenChat from "../../components/OpenChat";
import ChatBox from "../../components/ChatBox";

class Chat extends Component {
  state = {
    Messenger: null,
    channelsConfigured: false,
    channels: [],
    currentChannel: null,
    messageBody: ""
  };

  // Fetch the list on first mount
  componentDidMount() {
    this.chatSetup();
  }

  chatSetup = () => {
    if (this.props.buddiesEmail) {
      this.state.Messenger = new Sendbird(
        this.props.userInfo.email,
        this.props.buddiesEmail
      );
      this.state.Messenger.configUser();
      this.configChannels();
      this.loadChannels();
    }
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

  render() {
    return (
      <>
        <div>
          {this.state.channelsConfigured ? (
            <OpenChat
              isConfigured={this.state.channelsConfigured}
              channels={this.state.Messenger.channels}
              openChannel={this.openChannel}
              userEmail={this.props.userInfo.email}
              userID={this.props.userInfo.id}
              makeid={this.props.makeid}
              buddies={this.props.buddiesUsername}
              buddiesEmail={this.props.buddiesEmail}
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
              userId={this.props.userInfo.email}
            />
          ) : null}
        </div>
        <div>
          {/* <BuddyList
            userEmail={this.props.userInfo.email}
            userID={this.props.userInfo.id}
            makeid={this.props.makeid}
            buddies={this.props.buddiesUsername}
          
          /> */}
        </div>
      </>
    );
  }
}
export default Chat;
