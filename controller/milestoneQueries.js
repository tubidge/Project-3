const db = require("../models");
const moment = require("moment");
const momentRange = require("moment-range");
const range = momentRange.extendMoment(moment);
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const userQuery = require("./userQueries");
const helper = require("../utils/helperFunctions");
const goal = require("./goalQueries");
const buddyQuery = require("./buddyQueries");
const notificationQuery = require("./notificationQueries");

const Milestone = {
  // This method will create a new milestone in the database. The milestone parameter is an object that will be
  // constructed based off data from the req.body object and req.params.id

  populateMilestones: (milestone, days) => {
    return new Promise((resolve, reject) => {
      console.log("POPULATE RUNNING");
      helper
        .asyncForEach(days, async event => {
          milestone.dueDate = event;
          await Milestone.addMilestone(milestone);
        })
        .then(() => {
          resolve("Milestones Created");
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  configureMilestones: milestone => {
    return new Promise((resolve, reject) => {
      let dates = range.range(
        range(milestone.startDate),
        range(milestone.endDate)
      );
      const getUser = async () => {
        console.log("get user running");
        console.log(milestone);
        await userQuery
          .getBasicUser(milestone.UserId)
          .then(data => {
            let user = data.username;
            getGoal(user);
          })
          .catch(err => {
            console.log(err);
          });
      };

      const getGoal = async user => {
        await goal.getBasicGoal(milestone.GoalId).then(data => {
          let goalName = data.name;
          let message;
          if (milestone.frequency === "Never") {
            message = `${user} added ${
              milestone.name
            } as a milestone to their goal ${goalName}`;
          } else {
            message = `${user} added a ${milestone.frequency} ${
              milestone.name
            } milestone to their goal ${goalName}`;
          }
          getBuddy(message);
        });
      };

      const getBuddy = async message => {
        await buddyQuery.getByGoal(milestone.GoalId).then(data => {
          console.log(data);
          const notif = {
            message: message
          };
          data.forEach(index => {
            if (index.buddyId === milestone.UserId) {
              notif.UserId = index.ownerId;
              alertBuddy(notif);
            } else {
              notif.UserId = index.buddyId;
              alertBuddy(notif);
            }
          });
        });
      };

      const alertBuddy = async notification => {
        await notificationQuery.newNotification(notification).then(resp => {
          console.log(resp);
        });
      };

      if (milestone.frequency === "Never") {
        Milestone.addMilestone(milestone).then(data => {
          getUser();
          resolve(data);
        });
      } else {
        switch (milestone.frequency) {
          case "Daily":
            let results = Array.from(dates.by("day"));
            let arr = [];
            results.forEach(index => {
              arr.push(moment(index._d).format("YYYY-MM-DD"));
            });
            Milestone.populateMilestones(milestone, arr)
              .then(data => {
                console.log(".THEN STATEMENT");
                getUser();
                resolve(data);
              })
              .catch(err => {
                reject(err);
              });
            break;
          case "Weekly":
            let result = Array.from(dates.by("week"));
            let weekArr = [];
            result.forEach(index => {
              weekArr.push(moment(index._d).format("YYYY-MM-DD"));
            });

            Milestone.populateMilestones(milestone, weekArr)
              .then(data => {
                getUser();
                resolve(data);
              })
              .catch(err => {
                reject(err);
              });
            break;
          case "Monthly":
            let res = Array.from(dates.by("month"));
            let monthArr = [];
            res.forEach(index => {
              monthArr.push(moment(index._d).format("YYYY-MM-DD"));
            });

            Milestone.populateMilestones(milestone, monthArr)
              .then(data => {
                getUser();
                resolve(data);
              })
              .catch(err => {
                reject(err);
              });
            break;
        }
      }
    });
  },

  addMilestone: milestone => {
    return new Promise((resolve, reject) => {
      db.Milestones.create(milestone)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // This method will return all the milestones that a user owns
  getAllMilestones: userId => {
    return new Promise((resolve, reject) => {
      db.Milestones.findAll({
        where: {
          UserId: userId
        }
      })
        .then(resp => {
          const results = {
            completed: [],
            incomplete: []
          };

          resp.forEach(index => {
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
              results.completed.push(milestone);
            } else {
              results.incomplete.push(milestone);
            }
          });

          helper
            .asyncForEach(results.completed, async index => {
              await goal
                .getBasicGoal(index.goalId)
                .then(resp => {
                  let category = resp.category;
                  index.category = category;
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .then(() => {
              helper
                .asyncForEach(results.incomplete, async index => {
                  await goal
                    .getBasicGoal(index.goalId)
                    .then(resp => {
                      let category = resp.category;
                      index.category = category;
                    })
                    .catch(err => {
                      console.log(err);
                    });
                })
                .then(() => {
                  resolve(results);
                });
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getMilestonesByGoal: goalId => {
    return new Promise((resolve, reject) => {
      db.Milestones.findAll({
        where: {
          GoalId: goalId
        }
      })
        .then(resp => {
          const results = {
            completed: [],
            incomplete: []
          };

          resp.forEach(index => {
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
              results.completed.push(milestone);
            } else {
              results.incomplete.push(milestone);
            }
          });

          helper
            .asyncForEach(results.completed, async index => {
              await goal
                .getBasicGoal(index.goalId)
                .then(resp => {
                  let category = resp.category;
                  index.category = category;
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .then(() => {
              helper
                .asyncForEach(results.incomplete, async index => {
                  await goal
                    .getBasicGoal(index.goalId)
                    .then(resp => {
                      let category = resp.category;
                      index.category = category;
                    })
                    .catch(err => {
                      console.log(err);
                    });
                })
                .then(() => {
                  resolve(results);
                });
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getMilestoneByFreq: (id, freq) => {
    return new Promise((resolve, reject) => {
      db.Milestones.findAll({
        where: {
          GoalId: id,
          frequency: freq,
          completed: false
        }
      })
        .then(resp => {
          const milestones = [];
          const names = [];
          resp.forEach(index => {
            const milestone = {
              id: index.dataValues.id,
              name: index.dataValues.name,
              completed: index.dataValues.completed,
              frequency: index.dataValues.frequency
            };

            if (!names.includes(milestone.name)) {
              names.push(milestone.name);
              milestones.push(milestone);
            }
          });

          resolve(milestones);
        })
        .catch(err => {
          console.log(err);
        });
    });
  },

  // This method will return a single milestone selected off id
  getMilestone: id => {
    return new Promise((resolve, reject) => {
      db.Milestones.findAll({
        where: {
          id: id
        }
      })
        .then(resp => {
          const milestone = {
            id: resp[0].dataValues.id,
            name: resp[0].dataValues.name,
            frequency: resp[0].dataValues.frequency,
            dueDate: resp[0].dataValues.dueDate,
            startDate: resp[0].dataValues.startDate,
            endDate: resp[0].dataValues.endDate,

            completed: resp[0].dataValues.completed,
            notes: resp[0].dataValues.notes,
            goalId: resp[0].dataValues.GoalId,
            userId: resp[0].dataValues.UserId
          };
          resolve(milestone);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getDateRange: (startDate, endDate, user) => {
    return new Promise((resolve, reject) => {
      db.Milestones.findAll({
        where: {
          startDate: startDate,
          endDate: endDate,
          UserId: user
        }
      })
        .then(resp => {
          const results = [];

          resp.forEach(index => {
            const milestone = {
              id: index.dataValues.id,
              name: index.dataValues.name,
              frequency: index.dataValues.frequency,
              dueDate: index.dataValues.dueDate,
              startDate: index.dataValues.startDate,
              endDate: index.dataValues.endDate,
              notes: index.dataValues.notes
            };
            results.push(milestone);
          });

          db.Milestones.findAll({
            where: {
              [Op.or]: [{ dueDate: startDate }, { dueDate: endDate }],
              UserId: user
            }
          }).then(resp => {
            resp.forEach(index => {
              const milestone = {
                id: index.dataValues.id,
                name: index.dataValues.name,
                frequency: index.dataValues.frequency,
                dueDate: index.dataValues.dueDate,
                startDate: index.dataValues.startDate,
                endDate: index.dataValues.endDate,
                notes: index.dataValues.notes
              };
              results.push(milestone);
            });

            resolve(results);
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getDate: (id, date) => {
    return new Promise((resolve, reject) => {
      db.Milestones.findAll({
        where: {
          dueDate: date,
          GoalId: id
        }
      })
        .then(resp => {
          const results = [];
          resp.forEach(index => {
            const milestone = {
              id: index.dataValues.id,
              name: index.dataValues.name,
              frequency: index.dataValues.frequency,
              completed: index.dataValues.completed,
              dueDate: index.dataValues.dueDate,
              startDate: index.dataValues.startDate,
              endDate: index.dataValues.endDate,
              notes: index.dataValues.notes
            };
            results.push(milestone);
          });

          resolve(results);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // This method will allow a user to update a particular column's data based on the
  // milestone id that they pass in
  updateMilestone: (id, colName, info) => {
    return new Promise((resolve, reject) => {
      db.Milestones.update(
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

          const getMilestone = async id => {
            await db.Milestones.findOne({
              where: {
                id: id
              }
            })
              .then(data => {
                console.log(data.dataValues);
                let userId = data.dataValues.UserId;
                let milestone = data.dataValues.name;
                let goalId = data.dataValues.GoalId;
                getUser(userId, milestone, goalId);
              })
              .catch(err => {
                console.log(err);
              });
          };

          const getUser = async (userId, milestone, goalId) => {
            console.log({ userQuery });
            await userQuery
              .getBasicUser(userId)
              .then(data => {
                let user = data.username;
                getGoal(user, milestone, goalId, userId);
              })
              .catch(err => {
                console.log(err);
              });
          };

          const getGoal = async (user, milestone, goalId, userId) => {
            await goal.getBasicGoal(goalId).then(data => {
              let goalName = data.name;

              let message = `${user} completed ${milestone} for their goal ${goalName}`;
              getBuddy(goalId, message, userId);
            });
          };

          const getBuddy = async (goalId, message, userId) => {
            await buddyQuery.getByGoal(goalId).then(data => {
              console.log(data);
              const notif = {
                message: message
              };
              data.forEach(index => {
                if (index.buddyId === userId) {
                  notif.UserId = index.ownerId;
                  alertBuddy(notif);
                } else {
                  notif.UserId = index.buddyId;
                  alertBuddy(notif);
                }
              });
            });
          };

          const alertBuddy = async notification => {
            await notificationQuery.newNotification(notification).then(resp => {
              console.log(resp);
            });
          };

          if (colName === "completed") {
            getMilestone(id);
          }
          let results;
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

  // This method will allow a user to delete a milestone from the database
  deleteMilestone: id => {
    return new Promise((resolve, reject) => {
      db.Milestones.destroy({
        where: {
          id: id
        }
      })
        .then(resp => {
          let results;
          if (resp == 1) {
            results = "Milestone Deleted";
          } else {
            results = "Error in deleteing milestone";
          }

          resolve(results);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  deleteFrequency: (id, name, frequency) => {
    return new Promise((resolve, reject) => {
      db.Milestones.destroy({
        where: {
          GoalId: id,
          name: name,
          frequency: frequency
        }
      })
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

module.exports = Milestone;
