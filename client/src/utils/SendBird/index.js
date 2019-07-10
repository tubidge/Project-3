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
      console.log(user);
    });
  };

  this.configHandler = function(cb) {
    this.channels.forEach(index => {
      this.ChannelHandler.onTypingStatusUpdated = function(channel) {
        console.log(channel);
      };
      this.ChannelHandler.onMessageReceived = function(channel, message) {
        console.log(channel);
        console.log(message);
        cb(message);
      };

      this.sb.addChannelHandler(index.connection, this.ChannelHandler);
    });
  };

  this.configChannels = function() {
    console.log("configuring channels");
    this.channels.forEach(index => {
      console.log(index);
      this.sb.GroupChannel.getChannel(index.connection, data => {
        this.ChannelHandler.onMessageReceived(index.connection);
        return data.refresh(true);
      });
    });
  };

  this.createChannels = function(cb) {
    let userIds = [];
    let buddies = [];
    for (var i = 0; i < this.buddies.length; i++) {
      console.log(this.buddies[i]);
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
      console.log(index);
      userIds = [this.user];
      userIds.push(index);
      console.log(userIds);
      await this.sb.GroupChannel.createChannelWithUserIds(
        userIds,
        false,
        function(channel, error) {
          if (error) throw error;

          console.log(channel);
          let invite = [userIds[1]];
          // The method below is assuming that there are only two users in this connection
          channel.inviteWithUserIds(invite, function(response, error) {
            if (error) throw error;
            console.log(response);
          });

          let groupChannel = channel.url;

          const data = {
            colName: "chatChannel",
            info: groupChannel
          };
          console.log(groupChannel);
          console.log(allBuddies);
          for (var i = 0; i < allBuddies.length; i++) {
            if (allBuddies[i].email === index) {
              let id = allBuddies[i].id;

              API.editBuddy(id, data)
                .then(resp => {
                  console.log(resp);
                })
                .catch(err => {
                  console.log(err);
                });
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
    console.log(connection);
    messageParams.mentionedUserIds = [userId];
    const Handler = this.ChannelHandler;
    Handler.onMessageReceived = function(url, message) {
      cb(message);
    };
    connection.sendUserMessage(messageParams, function(message, error) {
      if (error) throw error;
      console.log(message);
      console.log(Handler);
      Handler.onMessageReceived(connection.url, message);

      // cb(message);
    });
  };

  this.getChannel = function(channelUrl, cb) {
    const Handler = this.ChannelHandler;
    console.log(Handler);

    Handler.onTypingStatusUpdated = function(connection) {
      console.log("typing working");
      console.log(connection);
    };

    this.sb.GroupChannel.getChannel(channelUrl, function(connection, error) {
      const prevMessages = connection.createPreviousMessageListQuery();
      prevMessages.limit = 200;
      prevMessages.reverse = false;

      if (error) throw error;
      console.log(connection);

      Sendbird.currentConnection = connection;

      console.log(Handler);
      const channel = {
        connection: connection
      };
      prevMessages.load(function(messages, err) {
        if (err) throw err;
        console.log(messages);
        channel.messages = messages;
        Handler.onTypingStatusUpdated(connection.url);
        cb(channel);
      });
    });
  };
}

export default Sendbird;
