const db = require("../models");
const helper = require("../utils/helperFunctions");
const User = require("./userQueries");
const Goal = require("./goalQueries");

module.exports = {
  addFollower: data => {
    return new Promise((resolve, reject) => {
      db.Followers.create(data)
        .then(resp => {
          console.log(resp);

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
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
