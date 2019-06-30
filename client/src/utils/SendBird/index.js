import * as SendBird from "sendbird";
import helper from "../helperFunctions";
import API from "../API";

const sb = new SendBird({
  appId: "967DB9F9-E8D2-4E23-B15F-23D57E860769"
});

const messageParams = new sb.UserMessageParams();

function Sendbird(user, buddies) {
  this.user = user;
  this.buddies = buddies;
  this.sb = sb;
  this.messageParams = messageParams;
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

  this.createChannels = function() {
    let userIds = [];
    let buddies = [];
    for (var i = 0; i < this.buddies.length; i++) {
      if (this.buddies[i].channel === null) {
        buddies.push(this.buddies[i].email);
      } else {
        this.channels.push(this.buddies[i].channel);
      }
    }
    const allBuddies = this.buddies;
    const messageParams = this.messageParams;
    messageParams.message = "Hey Dude what's up?";
    messageParams.data = "Data";
    messageParams.pushNotificationDeliveryOption = "default";
    helper.asyncForEach(buddies, async index => {
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
  };

  this.getChannel = function(channelUrl) {
    this.sb.GroupChannel.getChannel(channelUrl, function(connection, error) {
      if (error) throw error;
      console.log(connection);
      connection.sendUserMessage(messageParams, function(message, error) {
        if (error) throw error;
        console.log(message);
      });
    });
  };
}

export default Sendbird;
