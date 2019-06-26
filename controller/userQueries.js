const db = require("../models");
<<<<<<< HEAD
const helper = require("../utils/helperFunctions");
const buddy = require("../controller/buddyQueries");
const moment = require("moment");

module.exports = {
  // This method will create a new user
  addUser: (firstName, lastName, username, email, password, profilePic) => {
=======
const buddyQuery = require("../controller/buddyQueries");
const helper = require("../utils/helperFunctions");

module.exports = {
  // This method will create a new user
  addUser: (firstName, lastName, username, email, password) => {
>>>>>>> c381db9057590cd6da0ab8f111498b2b8bf4aabc
    return new Promise((resolve, reject) => {
      db.User.create({
        firstName: firstName,
        lastName: lastName,
<<<<<<< HEAD
        username: username,
        email: email,
        password: password,
        profilePic: profilePic
      })
        .then(resp => {
          console.log(resp);
          const results = {
            id: resp.dataValues.id,
            firstName: resp.dataValues.firstName,
            lastName: resp.dataValues.lastName,
            username: resp.dataValues.username,
            email: resp.dataValues.email,
            profilePic: resp.dataValues.profilePic
          };
          resolve(results);
=======
        username,
        username,
        email: email,
        password: password
      })
        .then(resp => {
          console.log(resp);
          resolve(resp);
>>>>>>> c381db9057590cd6da0ab8f111498b2b8bf4aabc
        })
        .catch(err => {
          reject(err);
        });
    });
  },

<<<<<<< HEAD
  getBasicUser: id => {
    return new Promise((resolve, reject) => {
      db.User.findAll({
        where: {
          id: id
        }
      })
        .then(resp => {
          console.log(resp);
          const results = {
            id: resp[0].dataValues.id,
            firstName: resp[0].dataValues.firstName,
            lastName: resp[0].dataValues.lastName,
            username: resp[0].dataValues.username,
            email: resp[0].dataValues.email,
            profilePic: resp[0].dataValues.profilePic
          };
          resolve(results);
=======
  // This method will return all users with their goals and milestones
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      db.User.findAll({
        include: [db.Goals, db.Milestones]
      })
        .then(resp => {
          console.log("this is the result");
          console.log(resp);
          res.json(resp);
          resolve(resp);
>>>>>>> c381db9057590cd6da0ab8f111498b2b8bf4aabc
        })
        .catch(err => {
          reject(err);
        });
    });
  },

<<<<<<< HEAD
  // This method will return all users
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      db.User.findAll({})
        .then(resp => {
          console.log(resp.length);
          const users = [];
          resp.forEach(index => {
            const user = {
              id: index.dataValues.id,
              firstName: index.dataValues.firstName,
              lastName: index.dataValues.lastName,
              username: index.dataValues.username,
              email: index.dataValues.email,
              profilePic: index.dataValues.profilePic
            };
            users.push(user);
          });
          resolve(users);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

=======
>>>>>>> c381db9057590cd6da0ab8f111498b2b8bf4aabc
  // This method will return a single user with their goals, milestones, and any current buddies and all
  // relevant buddy data
  findUser: id => {
    return new Promise((resolve, reject) => {
      db.User.findAll({
        where: {
          id: id
        },
<<<<<<< HEAD
        include: [db.Goals, db.Milestones, db.Buddy]
      })
        .then(resp => {
          console.log("query");
          console.log(resp[0].dataValues.Milestones);
          const data = resp[0].dataValues;
          const goalIds = [];
=======
        include: [db.Goals, db.Milestones]
      })
        .then(resp => {
          console.log("query");
          console.log(resp[0].dataValues.firstName);
          const data = resp[0].dataValues;
>>>>>>> c381db9057590cd6da0ab8f111498b2b8bf4aabc
          const user = {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
<<<<<<< HEAD
            buddies: {
              myBuddies: [],
              buddiesWith: []
            },
            activeGoals: {
              completed: [],
              incomplete: []
            },
            activeMilestones: {
              completed: [],
              incomplete: []
            },
            pastGoals: {
              completed: [],
              incomplete: []
            },
            pastMilestones: {
              completed: [],
              incomplete: []
            }
          };

          const getBuddies = id => {
            helper
              .asyncForEach(id, async event => {
                await buddy
                  .getBuddyId(id)
                  .then(resp => {
                    console.log(resp);
                    console.log("resp");
                    if (resp.length > 0) {
                      resp.forEach(index => {
                        console.log("index");
                        console.log(index);
                        if (index.active) {
                          const buddy = {};
                          buddy.id = index.id;
                          buddy.duration = index.duration;
                          buddy.active = index.active;
                          buddy.buddyId = index.buddyId;
                          buddy.goalId = index.GoalId;
                          buddy.ownerId = index.UserId;
                          user.buddies.myBuddies.push(buddy);
                        } else {
                          return false;
                        }
                      });
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              })
              .then(() => {
                assignBuddies(goalIds);
              });
          };

          const assignBuddies = goalId => {
            helper
              .asyncForEach(goalId, async event => {
                await buddy
                  .getByGoal(event)
                  .then(resp => {
                    const buddy = {
                      id: resp[0].id,
                      duration: resp[0].duration,
                      active: resp[0].active,
                      buddyId: resp[0].buddyId,
                      goalId: resp[0].GoalId,
                      ownerId: resp[0].UserId
                    };
                    user.buddies.buddiesWith.push(buddy);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              })
              .then(() => {
                resolve(user);
              });
          };

          // if (data.Buddies.length > 0) {
          // data.Buddies.forEach(index => {
          //     if (index.dataValues.active) {
          //         const buddy = {};
          //         buddy.id = index.dataValues.id;
          //         buddy.duration = index.dataValues.duration;
          //         buddy.active = index.dataValues.active;
          //         buddy.buddyId = index.dataValues.buddyId;
          //         buddy.goalId = index.dataValues.GoalId;
          //         buddy.ownerId = index.dataValues.UserId;
          //         user.buddies.push(buddy)
          //     } else {
          //         return false
          //     }
          // })
          // }

          if (data.Goals.length > 0) {
            data.Goals.forEach(index => {
              goalIds.push(index.dataValues.id);
              let date = moment().format("YYYY-MM-DD");
              let goalDate = moment(index.dataValues.dueDate)
                .add("1", "day")
                .format("YYYY-MM-DD");
              if (moment(goalDate).isAfter(date)) {
                const goal = {};
                goal.id = index.dataValues.id;
                goal.name = index.dataValues.name;
                goal.category = index.dataValues.category;
                goal.description = index.dataValues.description;
                goal.dueDate = moment(index.dataValues.dueDate)
                  .add("1", "day")
                  .format("YYYY-MM-DD");
                goal.private = index.dataValues.private;
                goal.complete = index.dataValues.complete;
                goal.userId = index.dataValues.UserId;
                if (goal.complete) {
                  user.activeGoals.completed.push(goal);
                } else {
                  user.activeGoals.incomplete.push(goal);
                }
              } else {
                const goal = {};
                goal.id = index.dataValues.id;
                goal.name = index.dataValues.name;
                goal.category = index.dataValues.category;
                goal.description = index.dataValues.description;
                goal.dueDate = moment(index.dataValues.dueDate)
                  .add("1", "day")
                  .format("YYYY-MM-DD");
                goal.private = index.dataValues.private;
                goal.complete = index.dataValues.complete;
                goal.userId = index.dataValues.UserId;
                if (goal.complete) {
                  user.pastGoals.completed.push(goal);
                } else {
                  user.pastGoals.incomplete.push(goal);
                }
              }
            });
          }

          if (data.Milestones.length > 0) {
            data.Milestones.forEach(index => {
              let date = moment().format("YYYY-MM-DD");
              let milestoneDate = moment(index.dataValues.dueDate)
                .add("1", "day")
                .format("YYYY-MM-DD");

              if (moment(milestoneDate).isAfter(date)) {
                const milestone = {};
                milestone.id = index.dataValues.id;
                milestone.name = index.dataValues.name;
                milestone.frequency = index.dataValues.frequency;
                milestone.dueDate = moment(index.dataValues.dueDate)
                  .add("1", "day")
                  .format("YYYY-MM-DD");
                milestone.completed = index.dataValues.completed;
                milestone.notes = index.dataValues.notes;
                milestone.goalId = index.dataValues.GoalId;
                milestone.userId = index.dataValues.UserId;

                if (milestone.completed) {
                  user.activeMilestones.completed.push(milestone);
                } else {
                  user.activeMilestones.incomplete.push(milestone);
                }
              } else {
                const milestone = {};
                milestone.id = index.dataValues.id;
                milestone.name = index.dataValues.name;
                milestone.frequency = index.dataValues.frequency;
                milestone.dueDate = moment(index.dataValues.dueDate)
                  .add("1", "day")
                  .format("YYYY-MM-DD");
                milestone.completed = index.dataValues.completed;
                milestone.notes = index.dataValues.notes;
                milestone.goalId = index.dataValues.GoalId;
                milestone.userId = index.dataValues.UserId;

                if (milestone.completed) {
                  user.pastMilestones.completed.push(milestone);
                } else {
                  user.pastMilestones.incomplete.push(milestone);
                }
              }
            });
          }

          getBuddies(id);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  updateUser: (id, colName, info) => {
    return new Promise((resolve, reject) => {
      db.User.update(
        {
          [colName]: info
        },
        {
          where: {
            id: id
          }
        }
      )
        .then(resp => {
          console.log(resp);
          let results;
          if (resp[0] == 1) {
            results = "Info updated";
          } else {
            results = "Error updating info";
          }
          resolve(results);
=======
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
>>>>>>> c381db9057590cd6da0ab8f111498b2b8bf4aabc
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
