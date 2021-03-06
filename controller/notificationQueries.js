const db = require("../models");

module.exports = {
  newNotification: notification => {
    return new Promise((resolve, reject) => {
      db.Notifications.create(notification)
        .then(resp => {
          console.log(resp);

          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getUsersNotifications: userId => {
    return new Promise((resolve, reject) => {
      db.Notifications.findAll({
        where: {
          UserId: userId,
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
  },

  getGoalNotifications: goalId => {
    return new Promise((resolve, reject) => {
      db.Notifications.findAll({
        where: {
          GoalId: goalId,
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
  },

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
  },

  getRequestNotifications: buddyId => {
    return new Promise((resolve, reject) => {
      db.Notifications.findAll({
        where: {
          RequestId: buddyId,
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
  },

  getFollowerNotifications: followerId => {
    return new Promise((resolve, reject) => {
      db.Notifications.findAll({
        where: {
          FollowerId: followerId,
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

  // addMilestoneReminder: notification => {
  //   return new Promise((resolve, reject) => {
  //     db.Notifications.create(notification)
  //       .then(resp => {
  //         console.log(resp);

  //         resolve(resp);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
  // }
};
