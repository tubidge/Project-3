import * as SendBird from "sendbird";
import helper from "../helperFunctions";
import API from "../API";

const sb = new SendBird({
  appId: "967DB9F9-E8D2-4E23-B15F-23D57E860769"
});

const messageParams = new sb.UserMessageParams();

const ChannelHandler = new sb.ChannelHandler();

ChannelHandler.onMessageReceived = function(channel, message) {
  console.log(channel, message);
};
ChannelHandler.onMentionReceived = function(channel, message) {};

ChannelHandler.onTypingStatusUpdated = function(groupChannel) {
  console.log(groupChannel);
};
ChannelHandler.onUserEntered = function(openChannel, user) {};
ChannelHandler.onUserExited = function(openChannel, user) {};

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

  this.configHandler = function() {
    console.log(this.channels);
    console.log("function running");
    this.channels.forEach(index => {
      console.log(index);
      this.sb.addChannelHandler(index.connection, this.ChannelHandler);
    });
  };

  this.createChannels = function() {
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
    this.configHandler();
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
    connection.sendUserMessage(messageParams, function(message, error) {
      if (error) throw error;
      console.log(message);
      Handler.onMessageReceived(connection, message);
      cb(message);
    });
  };

  this.getChannel = function(channelUrl, cb) {
    const Handler = this.ChannelHandler;
    console.log(Handler);
    this.sb.GroupChannel.getChannel(channelUrl, function(connection, error) {
      const prevMessages = connection.createPreviousMessageListQuery();
      prevMessages.limit = 100;
      prevMessages.reverse = false;

      if (error) throw error;
      console.log(connection);

      Sendbird.currentConnection = connection;

      Handler.onReadReceiptUpdated(connection);

      Handler.onMentionReceived(connection);
      Handler.onTypingStatusUpdated(connection);
      Handler.onUserEntered(connection);
      Handler.onUserExited(connection);

      const channel = {
        connection: connection
      };
      prevMessages.load(function(messages, err) {
        if (err) throw err;
        console.log(messages);
        channel.messages = messages;

        cb(channel);
      });
    });
  };
}

export default Sendbird;
