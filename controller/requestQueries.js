const db = require("../models");
const notificationQueries = require("./notificationQueries");
const userQueries = require("./userQueries");
const goalQueries = require("./goalQueries");
const buddyQueries = require("./buddyQueries");

module.exports = {
  addRequest: request => {
    return new Promise((resolve, reject) => {
      db.Requests.create(request)
        .then(resp => {
          console.log(resp);
          let requestId = resp.dataValues.id;
          let buddyId = resp.dataValues.buddyId;
          let buddyGoal = resp.dataValues.buddyGoal;
          let userId = resp.dataValues.UserId;
          let goalId = resp.dataValues.GoalId;

          const getUsers = () => {
            let users = {};
            userQueries.getBasicUser(buddyId).then(data => {
              users.buddy = data.username;
              userQueries.getBasicUser(userId).then(data => {
                users.user = data.username;
                getGoals(users);
              });
            });
          };

          const getGoals = users => {
            let goals = {};
            goalQueries.getBasicGoal(buddyGoal).then(data => {
              goals.buddyGoal = data.name;
              goalQueries.getBasicGoal(goalId).then(data => {
                goals.userGoal = data.name;

                createNotif(users, goals);
              });
            });
          };

          const createNotif = (users, goals) => {
            let message = `${users.user} has requested to join your goal ${
              goals.buddyGoal
            } with their goal of ${goals.userGoal}`;
            let notif = {
              RequestId: requestId,
              UserId: buddyId,
              GoalId: buddyGoal,
              message: message
            };
            notificationQueries.newNotification(notif).then(resp => {
              console.log(resp);
            });
          };
          getUsers();
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  acceptRequest: id => {
    return new Promise((resolve, reject) => {
      db.Requests.findOne({
        where: {
          id: id
        }
      })
        .then(resp => {
          console.log(resp);
          let newBuddy = {
            duration: resp.dataValues.duration,
            buddyId: resp.dataValues.buddyId,
            buddyGoal: resp.dataValues.buddyGoal,
            GoalId: resp.dataValues.GoalId,
            UserId: resp.dataValues.UserId
          };

          buddyQueries.addBuddyRelation(newBuddy).then(resp => {
            console.log(resp);

            resolve(resp);
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getRequest: id => {
    return new Promise((resolve, reject) => {
      db.Requests.findOne({
        where: {
          id: id
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

  getUsersRequests: id => {
    return new Promise((resolve, reject) => {
      db.Requests.findAll({
        where: {
          UserId: id
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

  deleteRequest: id => {
    return new Promise((resolve, reject) => {
      db.Requests.destroy({
        where: {
          id: id
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
