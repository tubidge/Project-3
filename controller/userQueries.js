const db = require("../models");
const buddyQuery = require("../controller/buddyQueries");
const helper = require("../utils/helperFunctions");

module.exports = {
  // This method will create a new user
  addUser: (firstName, lastName, username, email, password) => {
    return new Promise((resolve, reject) => {
      db.User.create({
        firstName: firstName,
        lastName: lastName,
        username,
        username,
        email: email,
        password: password
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

  // This method will return all users with their goals and milestones
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      db.User.findAll({
        include: [db.Goals, db.Milestones]
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

  // This method will return a single user with their goals, milestones, and any current buddies and all
  // relevant buddy data
  findUser: id => {
    return new Promise((resolve, reject) => {
      db.User.findAll({
        where: {
          id: id
        },
        include: [db.Goals, db.Milestones]
      })
        .then(resp => {
          console.log("query");
          console.log(resp[0].dataValues.firstName);
          const data = resp[0].dataValues;
          const user = {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
            buddies: [
              {
                buddy: {
                  buddyNum: "buddyOne",
                  id: data.BuddyOneId
                }
              },
              {
                buddy: {
                  buddyNum: "buddyTwo",
                  id: data.BuddyTwoId
                }
              },
              {
                buddy: {
                  buddyNum: "buddyThree",
                  id: data.BuddyThreeId
                }
              },
              {
                buddy: {
                  buddyNum: "buddyFour",
                  id: data.BuddyFourId
                }
              },
              {
                buddy: {
                  buddyNum: "buddyFive",
                  id: data.BuddyFiveId
                }
              }
            ],
            goals: data.Goals,
            milestones: data.Milestones
          };

          const getBuddies = () => {
            helper
              .asyncForEach(user.buddies, async buddy => {
                switch (buddy.buddy.buddyNum) {
                  case "buddyOne":
                    if (buddy.buddy.id === null) {
                      user.buddies[0].buddy.users = null;
                      user.buddies[0].buddy.buddyGoals = null;
                      return false;
                    } else {
                      await buddyQuery
                        .getBuddyOneGoal(buddy.buddy.id)
                        .then(resp => {
                          user.buddies[0].buddy.users =
                            resp[0].dataValues.Users;
                          user.buddies[0].buddy.buddyGoals =
                            resp[0].dataValues.BuddyGoals;
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }

                    break;
                  case "buddyTwo":
                    if (buddy.buddy.id === null) {
                      user.buddies[1].buddy.users = null;
                      user.buddies[1].buddy.buddyGoals = null;
                      return false;
                    } else {
                      await buddyQuery
                        .getBuddyTwoGoal(buddy.buddy.id)
                        .then(resp => {
                          user.buddies[1].buddy.users =
                            resp[0].dataValues.Users;
                          user.buddies[1].buddy.buddyGoals =
                            resp[0].dataValues.BuddyGoals;
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }
                    break;
                  case "buddyThree":
                    if (buddy.buddy.id === null) {
                      user.buddies[2].buddy.users = null;
                      user.buddies[2].buddy.buddyGoals = null;
                      return false;
                    } else {
                      await buddyQuery
                        .getBuddyGoalThree(buddy.buddy.id)
                        .then(resp => {
                          user.buddies[2].buddy.users =
                            resp[0].dataValues.Users;
                          user.buddies[2].buddy.buddyGoals =
                            resp[0].dataValues.BuddyGoals;

                          console.log(user.buddies);
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }
                    break;
                  case "buddyFour":
                    if (buddy.buddy.id === null) {
                      user.buddies[3].buddy.users = null;
                      user.buddies[3].buddy.buddyGoals = null;
                      return false;
                    } else {
                      await buddyQuery
                        .getBuddyGoalFour(buddy.buddy.id)
                        .then(resp => {
                          user.buddies[3].buddy.users =
                            resp[0].dataValues.Users;
                          user.buddies[3].buddy.buddyGoals =
                            resp[0].dataValues.BuddyGoals;
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }
                    break;
                  case "buddyFive":
                    if (buddy.buddy.id === null) {
                      user.buddies[4].buddy.users = null;
                      user.buddies[4].buddy.buddyGoals = null;
                      return false;
                    } else {
                      await buddyQuery
                        .getBuddyGoalFive(buddy.buddy.id)
                        .then(resp => {
                          user.buddies[4].buddy.users =
                            resp[0].dataValues.Users;
                          user.buddies[4].buddy.buddyGoals =
                            resp[0].dataValues.BuddyGoals;
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }
                    break;
                }
              })
              .then(() => {
                res.json(resp);
                resolve(user);
              });
          };

          getBuddies();
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
