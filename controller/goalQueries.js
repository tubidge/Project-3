const db = require("../models");
const moment = require("moment");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const notificationQuery = require("./notificationQueries");
const goalHelper = require("./goalHelper");

module.exports = {
  // This method will add a goal to the database. The goal parameter is an object that will be constructed
  // from the req.body data sent from the frontend
  addGoal: goal => {
    return new Promise((resolve, reject) => {
      db.Goals.create(goal)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // This method will return a single goal and all the buddies/milestones associated with it
  getGoal: id => {
    return new Promise((resolve, reject) => {
      db.Goals.findAll({
        where: {
          id: id
        },
        include: [db.Milestones, db.Buddy]
      })
        .then(resp => {
          const goal = {
            id: resp[0].dataValues.id,
            name: resp[0].dataValues.name,
            category: resp[0].dataValues.category,
            dueDate: moment(resp[0].dataValues.dueDate)
              .add("1", "day")
              .format("YYYY-MM-DD"),
            description: resp[0].dataValues.description,
            private: resp[0].dataValues.private,
            complete: resp[0].dataValues.complete,
            userId: resp[0].dataValues.UserId,
            milestones: {
              complete: [],
              incomplete: []
            },
            buddies: {
              current: [],
              past: []
            }
          };
          resp[0].dataValues.Milestones.forEach(index => {
            const milestone = {};
            milestone.id = index.dataValues.id;
            milestone.name = index.dataValues.name;
            milestone.frequency = index.dataValues.frequency;
            milestone.dueDate = index.dataValues.dueDate;
            milestone.startDate = index.dataValues.startDate;
            milestone.endDate = index.dataValues.endDate;
            milestone.completed = index.dataValues.completed;
            milestone.notes = index.dataValues.notes;
            milestone.goalId = index.dataValues.GoalId;
            milestone.userId = index.dataValues.UserId;

            if (milestone.completed) {
              goal.milestones.complete.push(milestone);
            } else {
              goal.milestones.incomplete.push(milestone);
            }
          });
          // resp[0].dataValues.Buddies.forEach(index => {
          //   const buddy = {};
          //   buddy.id = index.dataValues.id;
          //   buddy.duration = index.dataValues.duration;
          //   buddy.active = index.dataValues.active;
          //   buddy.buddyId = index.dataValues.buddyId;
          //   buddy.goalId = index.dataValues.GoalId;
          //   buddy.ownerId = index.dataValues.UserId;

          //   if (buddy.active) {
          //     goal.buddies.current.push(buddy);
          //   } else {
          //     goal.buddies.past.push(buddy);
          //   }
          // });
          resolve(goal);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getBasicGoal: id => {
    return new Promise((resolve, reject) => {
      db.Goals.findAll({
        where: {
          id: id
        }
      })
        .then(resp => {
          const goal = {
            id: resp[0].dataValues.id,
            name: resp[0].dataValues.name,
            category: resp[0].dataValues.category,
            dueDate: moment(resp[0].dataValues.dueDate)
              .add("1", "day")
              .format("YYYY-MM-DD"),
            description: resp[0].dataValues.description,
            private: resp[0].dataValues.private,
            complete: resp[0].dataValues.complete,
            userId: resp[0].dataValues.UserId
          };

          resolve(goal);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  searchGoalName: (id, search) => {
    return new Promise((resolve, reject) => {
      db.Goals.findAll({
        where: {
          UserId: id,
          complete: 1,
          name: {
            [Op.substring]: search
          }
        },
        include: [db.Milestones]
      })
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getCategoryGoals: (id, category) => {
    return new Promise((resolve, reject) => {
      db.Goals.findAll({
        where: {
          UserId: id,
          category: category
        },
        include: [db.Milestones, db.Buddy]
      })
        .then(resp => {
          const goals = {
            currentGoals: [],
            pastGoals: []
          };

          resp.forEach(index => {
            let date = moment().format("YYYY-MM-DD");
            let goalDate = moment(index.dataValues.dueDate)
              .add("1", "day")
              .format("YYYY-MM-DD");
            if (moment(goalDate).isAfter(date)) {
              const goal = {};
              goal.id = index.dataValues.id;
              goal.name = index.dataValues.name;
              goal.category = index.dataValues.category;
              goal.dueDate = moment(index.dataValues.dueDate)
                .add("1", "day")
                .format("YYYY-MM-DD");
              goal.description = index.dataValues.description;
              goal.private = index.dataValues.private;
              goal.complete = index.dataValues.complete;
              goal.milestones = {
                completed: [],
                incomplete: []
              };
              goal.buddy = {
                current: []
              };
              index.dataValues.Milestones.forEach(index => {
                const milestone = {};
                milestone.id = index.dataValues.id;
                milestone.name = index.dataValues.name;
                milestone.frequency = index.dataValues.frequency;
                milestone.dueDate = index.dataValues.dueDate;

                milestone.completed = index.dataValues.completed;
                milestone.notes = index.dataValues.notes;
                milestone.goalId = index.dataValues.GoalId;
                milestone.userId = index.dataValues.UserId;
                milestone.category = goal.category;

                if (milestone.completed) {
                  goal.milestones.completed.push(milestone);
                } else {
                  goal.milestones.incomplete.push(milestone);
                }
              });
              index.dataValues.Buddies.forEach(index => {
                const myBuddy = {};
                myBuddy.id = index.dataValues.id;
                myBuddy.duration = index.dataValues.duration;
                myBuddy.active = index.dataValues.active;
                myBuddy.buddyId = index.dataValues.buddyId;
                myBuddy.buddyGoal = index.dataValues.buddyGoal;
                myBuddy.channel = index.dataValues.chatChannel;
                myBuddy.goalId = index.dataValues.goalId;
                myBuddy.ownerId = index.dataValues.ownerId;

                if (myBuddy.active) {
                  goal.buddy.current.push(myBuddy);
                }
              });

              goals.currentGoals.push(goal);
            } else {
              const goal = {};
              goal.id = index.dataValues.id;
              goal.name = index.dataValues.name;
              goal.category = index.dataValues.category;
              goal.dueDate = moment(index.dataValues.dueDate)
                .add("1", "day")
                .format("YYYY-MM-DD");
              goal.description = index.dataValues.description;
              goal.private = index.dataValues.private;
              goal.complete = index.dataValues.complete;
              goal.milestones = {
                completed: [],
                incomplete: []
              };
              goal.buddy = {
                current: []
              };
              index.dataValues.Milestones.forEach(index => {
                const milestone = {};
                milestone.id = index.dataValues.id;
                milestone.name = index.dataValues.id;
                milestone.frequency = index.dataValues.frequency;
                milestone.dueDate = index.dataValues.dueDate;

                milestone.completed = index.dataValues.completed;
                milestone.notes = index.dataValues.notes;
                milestone.goalId = index.dataValues.GoalId;
                milestone.userId = index.dataValues.UserId;
                milestone.category = goal.category;

                if (milestone.completed) {
                  goal.milestones.completed.push(milestone);
                } else {
                  goal.milestones.incomplete.push(milestone);
                }
              });
              index.dataValues.Buddies.forEach(index => {
                const myBuddy = {};
                myBuddy.id = index.dataValues.id;
                myBuddy.duration = index.dataValues.duration;
                myBuddy.active = index.dataValues.active;
                myBuddy.buddyId = index.dataValues.buddyId;
                myBuddy.buddyGoal = index.dataValues.buddyGoal;
                myBuddy.channel = index.dataValues.chatChannel;
                myBuddy.goalId = index.dataValues.goalId;
                myBuddy.ownerId = index.dataValues.ownerId;

                if (myBuddy.active) {
                  goal.myBuddy.current.push(myBuddy);
                }
              });

              goals.pastGoals.push(goal);
            }
          });
          let arr = [];
          goals.currentGoals.forEach(index => {
            if (!index.complete) {
              arr.push(index);
            }
          });

          goals.currentGoals = arr;

          resolve(goals);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // This method takes in the userId and will return all of the goals, associated milestones, and buddies that have joined each goal
  // This method also sorts the goals into finished and unfinished categories
  getAllGoals: userId => {
    return new Promise((resolve, reject) => {
      db.Goals.findAll({
        where: {
          UserId: userId
        },
        include: [db.Milestones, db.Buddy]
      })
        .then(resp => {
          const goals = {
            currentGoals: {
              complete: [],
              incomplete: []
            },
            pastGoals: {
              complete: [],
              incomplete: []
            }
          };

          resp.forEach(index => {
            let date = moment().format("YYYY-MM-DD");
            let goalDate = moment(index.dataValues.dueDate)
              .add("1", "day")
              .format("YYYY-MM-DD");
            if (moment(goalDate).isAfter(date)) {
              const goal = {};
              goal.id = index.dataValues.id;
              goal.name = index.dataValues.name;
              goal.category = index.dataValues.category;
              goal.dueDate = moment(index.dataValues.dueDate)
                .add("1", "day")
                .format("YYYY-MM-DD");
              goal.description = index.dataValues.description;
              goal.private = index.dataValues.private;
              goal.complete = index.dataValues.complete;
              goal.milestones = {
                completed: [],
                incomplete: []
              };
              goal.buddy = {
                current: [],
                past: []
              };
              index.dataValues.Milestones.forEach(index => {
                const milestone = {};
                milestone.id = index.dataValues.id;
                milestone.name = index.dataValues.name;
                milestone.frequency = index.dataValues.frequency;
                milestone.dueDate = index.dataValues.dueDate;
                milestone.completed = index.dataValues.completed;
                milestone.notes = index.dataValues.notes;
                milestone.goalId = index.dataValues.GoalId;
                milestone.userId = index.dataValues.UserId;
                milestone.category = goal.category;

                if (milestone.completed) {
                  goal.milestones.completed.push(milestone);
                } else {
                  goal.milestones.incomplete.push(milestone);
                }
              });
              index.dataValues.Buddies.forEach(index => {
                const buddy = {};
                buddy.id = index.dataValues.id;
                buddy.duration = index.dataValues.duration;
                buddy.active = index.dataValues.active;
                buddy.buddyId = index.dataValues.buddyId;
                buddy.goalId = index.dataValues.GoalId;
                buddy.ownerId = index.dataValues.UserId;

                if (buddy.active) {
                  goal.buddy.current.push(buddy);
                } else {
                  goal.buddy.past.push(buddy);
                }
              });

              if (goal.complete) {
                goals.currentGoals.complete.push(goal);
              } else {
                goals.currentGoals.incomplete.push(goal);
              }
            } else {
              const goal = {};
              goal.id = index.dataValues.id;
              goal.name = index.dataValues.name;
              goal.category = index.dataValues.category;
              goal.dueDate = moment(index.dataValues.dueDate)
                .add("1", "day")
                .format("YYYY-MM-DD");
              goal.description = index.dataValues.description;
              goal.private = index.dataValues.private;
              goal.complete = index.dataValues.complete;
              goal.milestones = {
                completed: [],
                incomplete: []
              };
              goal.buddy = {
                current: [],
                past: []
              };
              index.dataValues.Milestones.forEach(index => {
                const milestone = {};
                milestone.id = index.dataValues.id;
                milestone.name = index.dataValues.id;
                milestone.frequency = index.dataValues.frequency;
                milestone.dueDate = index.dataValues.dueDate;
                milestone.completed = index.dataValues.completed;
                milestone.notes = index.dataValues.notes;
                milestone.goalId = index.dataValues.GoalId;
                milestone.userId = index.dataValues.UserId;
                milestone.category = goal.category;

                if (milestone.completed) {
                  goal.milestones.completed.push(milestone);
                } else {
                  goal.milestones.incomplete.push(milestone);
                }
              });
              index.dataValues.Buddies.forEach(index => {
                const buddy = {};
                buddy.id = index.dataValues.id;
                buddy.duration = index.dataValues.duration;
                buddy.active = index.dataValues.active;
                buddy.buddyId = index.dataValues.buddyId;
                buddy.goalId = index.dataValues.GoalId;
                buddy.ownerId = index.dataValues.UserId;

                if (buddy.active) {
                  goal.buddy.current.push(buddy);
                } else {
                  goal.buddy.past.push(buddy);
                }
              });
              if (goal.complete) {
                goals.pastGoals.complete.push(goal);
              } else {
                goals.pastGoals.incomplete.push(goal);
              }
            }
          });

          resolve(goals);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // // This method will return all the unfinished goals that a user owns.
  // unfinishedGoals: userId => {
  //     return new Promise((resolve, reject) => {
  //         db.Goals.findAll({
  //             where: {
  //                 UserId: userId,
  //                 complete: false
  //             },
  //             include: [db.Milestones, db.Buddy]
  //         }).then(resp => {
  //             console.log(resp)

  //             resolve(resp)
  //         }).catch(err => {
  //             reject(err)
  //         })
  //     })
  // },

  // // This method will return all the finished goals a user owns.
  // finishedGoals: userId => {
  //     return new Promise((resolve, reject) => {
  //         db.Goals.findAll({
  //             where: {
  //                 UserId: userId,
  //                 complete: true
  //             },
  //             include: [db.Milestones, db.Buddy]
  //         }).then(resp => {
  //             console.log(resp)
  //             resolve(resp)
  //         }).catch(err => {
  //             reject(err)
  //         })
  //     })
  // },

  // This method will return any goals and associated milestones that the user has marked as private.
  // ** Still need to clean up the data this method sends. Need to add a private goal to the database first
  privateGoals: userId => {
    return new Promise((resolve, reject) => {
      db.Goals.findAll({
        where: {
          UserId: userId,
          private: true
        },
        include: [db.Milestones]
      })
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // This method will allow a user to edit info on a particular goal.
  updateGoal: (id, colName, info) => {
    return new Promise((resolve, reject) => {
      db.Goals.update(
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
          let results;

          const getGoal = async () => {
            await goalHelper.getBasicGoal(id).then(data => {
              console.log(data);
              let goalName = data.name;
              let userId = data.userId;
              getUser(goalName, userId);
            });
          };

          const getUser = async (goalName, userId) => {
            await goalHelper.getBasicUser(userId).then(data => {
              console.log("============");
              console.log(data);
              let user = data.username;
              let userId = data.id;

              let message = `${user} has completed their goal ${goalName}!`;
              getBuddy(message, userId);
            });
          };
          const getBuddy = async (message, userId) => {
            console.log("GET BUDDY FUNCTION");
            await goalHelper.getByGoal(id).then(data => {
              let notif = {
                message: message
              };

              if (data) {
                data.forEach(index => {
                  if (index.buddyId === userId) {
                    notif.UserId = index.ownerId;
                    alertBuddy(notif);
                  } else {
                    notif.UserId = index.buddyId;
                    alertBuddy(notif);
                  }
                });
              } else {
                return false;
              }
            });
          };

          const alertBuddy = async notification => {
            await notificationQuery.newNotification(notification).then(resp => {
              console.log(resp);
            });
          };

          if (colName === "complete") {
            getGoal();
          }

          if (resp[0] == 1) {
            results = "Info updated";
          } else {
            results = "Error updating info";
          }
          resolve(results);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // This method will delete a goal from the database selected by id
  deleteGoal: id => {
    return new Promise((resolve, reject) => {
      db.Goals.destroy({
        where: {
          id: id
        }
      })
        .then(resp => {
          let results;
          if (resp == 1) {
            results = "Buddy relation deleted";
          } else {
            results = "Error in deleteing relation";
          }

          resolve(results);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
