const db = require("../models");
const moment = require("moment");
const momentRange = require("moment-range");
const range = momentRange.extendMoment(moment);
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const helper = require("../utils/helperFunctions");

const Milestone = {
  // This method will create a new milestone in the database. The milestone parameter is an object that will be
  // constructed based off data from the req.body object and req.params.id

  populateMilestones: (milestone, days) => {
    return new Promise((resolve, reject) => {
      helper
        .asyncForEach(days, async event => {
          milestone.dueDate = event;
          console.log(milestone);
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

      if (milestone.frequency === "Never") {
        Milestone.addMilestone(milestone).then(data => {
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

            console.log(arr);
            Milestone.populateMilestones(milestone, arr)
              .then(data => {
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

            console.log(weekArr);
            Milestone.populateMilestones(milestone, weekArr)
              .then(data => {
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

            console.log(monthArr);
            Milestone.populateMilestones(milestone, monthArr)
              .then(data => {
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
          console.log(resp);

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
          console.log(resp);
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

          resolve(results);
        })
        .catch(err => {
          reject(err);
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
          console.log(resp);
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
    // let start = startDate.concat(" 00:00:00");
    // let end = endDate.concat(" 00:00:00");
    // console.log(start);
    // console.log(end);
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

module.exports = Milestone;
