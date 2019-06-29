import * as SendBird from "sendbird";
import helper from "../helperFunctions";

const sb = new SendBird({
  appId: "967DB9F9-E8D2-4E23-B15F-23D57E860769"
});

function Sendbird(user, buddies) {
  this.user = user;
  this.buddies = buddies;
  this.sb = sb;
  this.channels = [];

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

    helper.asyncForEach(this.buddies, async index => {
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
        }
      );
    });
  };
}

export default Sendbird;
