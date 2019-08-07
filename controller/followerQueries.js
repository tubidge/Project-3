const db = require("../models");
const helper = require("../utils/helperFunctions");
const User = require("./userQueries");
const Goal = require("./goalQueries");
const notificationQuery = require("./notificationQueries");
console.log("FOLLOWER: ", User);
module.exports = {
  addFollower: data => {
    return new Promise((resolve, reject) => {
      db.Followers.create(data)
        .then(resp => {
          console.log(resp);
          let goalId = resp.dataValues.GoalId;

          const getGoal = async () => {
            await Goal.getBasicGoal(goalId).then(data => {
              let goal = data.name;

              getFollower(goal, goalId);
            });
          };

          const getFollower = async (goal, id) => {
            await User.getBasicUser(resp.dataValues.follower).then(data => {
              console.log(data);
              let user = data.username;
              let message = `${user} followed your goal ${goal}`;
              let notif = {
                message: message,
                GoalId: id
              };
              createNotification(notif);
            });
          };

          const createNotification = async notification => {
            await notificationQuery.newNotification(notification).then(resp => {
              console.log(resp);
            });
          };
          getGoal();
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getFollowers: id => {
    return new Promise((resolve, reject) => {
      db.Followers.findAll({
        where: {
          GoalId: id
        }
      })
        .then(resp => {
          console.log(resp);
          let followers = [];
          helper
            .asyncForEach(resp, async index => {
              await User.getBasicUser(index.follower).then(resp => {
                console.log(resp);
                let user = resp;
                followers.push(user);
              });
            })
            .then(() => {
              resolve(followers);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getFollowing: id => {
    return new Promise((resolve, reject) => {
      db.Followers.findAll({
        where: {
          follower: id
        }
      })
        .then(resp => {
          console.log(resp);
          let goals = [];
          helper
            .asyncForEach(resp, async index => {
              await Goal.getBasicGoal(index.GoalId).then(resp => {
                let goal = resp;
                resp.rowId = index.id;
                goals.push(goal);
              });
            })
            .then(() => {
              resolve(goals);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  editFollowerRel: (id, colName, info) => {
    return new Promise((resolve, reject) => {
      db.Followers.update(
        {
          colName: info
        },
        {
          where: {
            id: id
          }
        }
      )
        .then(resp => {
          console.log(resp);

          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  deleteFollowerRel: id => {
    return new Promise((resolve, reject) => {
      db.Followers.destroy({
        where: {
          id: id
        }
      })
        .then(resp => {
          console.log(resp);
          let message;
          if (resp === 1) {
            message = "Success";
          } else {
            message = "Error";
          }

          resolve(message);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
