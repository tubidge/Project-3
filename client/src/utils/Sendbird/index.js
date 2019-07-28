import * as SendBird from "sendbird";
import helper from "../helperFunctions";
import API from "../API";

const sb = new SendBird({
  appId: "967DB9F9-E8D2-4E23-B15F-23D57E860769"
});

const messageParams = new sb.UserMessageParams();
const ChannelHandler = new sb.ChannelHandler();

function Sendbird(user, buddies) {
  this.user = user;
  this.buddies = buddies;
  this.sb = sb;
  this.messageParams = messageParams;
  this.ChannelHandler = ChannelHandler;
  this.channels = [];
  this.currentConnection = null;
  this.configUser = function() {
    this.sb.connect(this.user, (user, error) => {
      if (error) {
        return error;
      }
    });
  };
  this.configHandler = function(cb) {
    this.channels.forEach(index => {
      this.ChannelHandler.onTypingStatusUpdated = function(channel) {
        // console.log(channel);
      };
      this.ChannelHandler.onMessageReceived = function(channel, message) {
        // console.log(channel);
        // console.log(message);
        cb(message);
      };
      this.sb.addChannelHandler(index.connection, this.ChannelHandler);
    });
  };
  this.configChannels = function() {
    this.channels.forEach(index => {
      this.sb.GroupChannel.getChannel(index.connection, data => {
        this.ChannelHandler.onMessageReceived(index.connection);
      });
    });
  };
  this.createChannels = function(cb) {
    let userIds = [];
    let buddies = [];
    for (var i = 0; i < this.buddies.length; i++) {
      if (this.buddies[i].channel === null) {
        buddies.push(this.buddies[i].email);
      } else {
        let buddy = {
          connection: this.buddies[i].channel,
          user: this.buddies[i].email
        };
        this.channels.push(buddy);
      }
    }
    const allBuddies = this.buddies;
    helper.asyncForEach(buddies, async index => {
      userIds = [];
      userIds = [this.user];
      userIds.push(index);
      await this.sb.GroupChannel.createChannelWithUserIds(
        userIds,
        false,
        function(channel, error) {
          if (error) throw error;
          let invite = [userIds[1]];
          // The method below is assuming that there are only two users in this connection
          channel.inviteWithUserIds(invite, function(response, error) {
            if (error) throw error;
          });
          let groupChannel = channel.url;
          const data = {
            colName: "chatChannel",
            info: groupChannel
          };
          for (var i = 0; i < allBuddies.length; i++) {
            if (allBuddies[i].email === index) {
              let id = allBuddies[i].id;
              API.editBuddy(id, data)
                .then(resp => {})
                .catch(err => {});
            }
          }
        }
      );
    });
    this.configHandler(cb);
  };
  this.sendMessage = function(message, userId, connection, cb) {
    const messageParams = this.messageParams;
    messageParams.message = message;
    messageParams.data = "Data";
    messageParams.mentionedUserIds = messageParams.pushNotificationDeliveryOption =
      "default";
    messageParams.mentionedUserIds = [userId];
    const Handler = this.ChannelHandler;
    Handler.onMessageReceived = function(url, message) {
      cb(message);
    };
    connection.sendUserMessage(messageParams, function(message, error) {
      if (error) throw error;
      Handler.onMessageReceived(connection.url, message);
      // cb(message);
    });
  };
  this.getChannel = function(channelUrl, cb) {
    const Handler = this.ChannelHandler;
    Handler.onTypingStatusUpdated = function(connection) {};
    this.sb.GroupChannel.getChannel(channelUrl, function(connection, error) {
      if (error) throw error;
      const prevMessages = connection.createPreviousMessageListQuery();
      prevMessages.limit = 200;
      prevMessages.reverse = false;
      Sendbird.currentConnection = connection;
      const channel = {
        connection: connection
      };
      prevMessages.load(function(messages, err) {
        if (err) throw err;
        channel.messages = messages;
        Handler.onTypingStatusUpdated(connection.url);
        cb(channel);
      });
    });
  };
}
export default Sendbird;
