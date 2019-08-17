const db = require("../models");

module.exports = {
  getMilestoneNotifications: mileId => {
    return new Promise((resolve, reject) => {
      db.Notifications.findAll({
        where: {
          MilestoneId: mileId,
          read: 0
        }
      })
        .then(resp => {
          console.log(resp);

          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
