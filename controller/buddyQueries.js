var db = require("../models");
const helper = require("../utils/helperFunctions");
const goalQuery = require("./goalQueries");
const moment = require("moment");

module.exports = {
  // This id is the buddyId. This method will return all active buddy goal relationships that this id is associated with
  getAllBuddiesId: id => {
    return new Promise((resolve, reject) => {
      db.Buddy.findAll({
        where: {
          buddyId: id,
          active: 1
        }
      })
        .then(resp => {
          const results = [];
          resp.forEach(index => {
            let buddy = {
              id: index.dataValues.id,
              duration: index.dataValues.duration,
              endDate: index.dataValues.endDate,
              buddyId: index.dataValues.buddyId,
              buddyGoal: index.dataValues.buddyGoal,
              active: index.dataValues.active,
              chatChannel: index.dataValues.chatChannel,
              goalId: index.dataValues.GoalId,
              ownerId: index.dataValues.UserId
            };

            results.push(buddy);
          });

          db.Buddy.findAll({
            where: {
              UserId: id,
              active: 1
            }
          }).then(data => {
            data.forEach(index => {
              let buddy = {
                id: index.dataValues.id,
                duration: index.dataValues.duration,
                buddyId: index.dataValues.buddyId,
                endDate: index.dataValues.endDate,
                buddyGoal: index.dataValues.buddyGoal,
                chatChannel: index.dataValues.chatChannel,
                active: index.dataValues.active,
                goalId: index.dataValues.GoalId,
                ownerId: index.dataValues.UserId
              };

              results.push(buddy);
            });
            helper
              .asyncForEach(results, async index => {
                await goalQuery.getBasicGoal(index.buddyGoal).then(data => {
                  console.log(data);
                  index.buddyGoalName = data.name;
                });
              })
              .then(() => {
                helper
                  .asyncForEach(results, async index => {
                    await goalQuery.getBasicGoal(index.goalId).then(data => {
                      console.log(data);
                      index.userGoalName = data.name;
                    });
                  })
                  .then(() => {
                    resolve(results);
                  });
              });
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // This id is the row id. This method will return a single buddy relationship
  getById: id => {
    return new Promise((resolve, reject) => {
      db.Buddy.findAll({
        where: {
          id: id,
          active: 1
        }
      })
        .then(resp => {
          const buddy = {
            id: resp[0].dataValues.id,
            duration: resp[0].dataValues.duration,
            buddyId: resp[0].dataValues.buddyId,
            endDate: resp[0].dataValues.endDate,
            buddyGoal: resp[0].dataValues.buddyGoal,
            goalId: resp[0].dataValues.GoalId,
            chatChannel: resp[0].chatChannel,
            active: resp[0].dataValues.active,
            ownerId: resp[0].dataValues.UserId
          };

          resolve(buddy);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // This id is the id of the Owner/UserId. This method will return all active buddy relationships that this user "owns"
  // getByOwner: id => {
  //   return new Promise((resolve, reject) => {
  //     db.Buddy.findAll({
  //       where: {
  //         UserId: id,
  //         active: 1
  //       }
  //     })
  //       .then(resp => {
  //         const results = [];
  //         resp.forEach(index => {
  //           const buddy = {
  //             id: index.dataValues.id,
  //             duration: index.dataValues.duration,
  //             buddyId: index.dataValues.buddyId,
  //             buddyGoal: index.dataValues.buddyGoal,
  //             chatChannel: index.dataValues.chatChannel,
  //             active: index.dataValues.active,
  //             goalId: index.dataValues.GoalId,
  //             ownerId: index.dataValues.UserId
  //           };

  //           results.push(buddy);
  //         });

  //         resolve(results);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
  // },

  // This id is the GoalId. This method will return all active buddy relationships that are linked to this goal
  getByGoal: id => {
    return new Promise((resolve, reject) => {
      db.Buddy.findAll({
        where: {
          GoalId: id,
          active: 1
        }
      })
        .then(resp => {
          const results = [];
          resp.forEach(index => {
            const buddy = {
              id: index.dataValues.id,
              duration: index.dataValues.duration,
              endDate: index.dataValues.endDate,
              buddyId: index.dataValues.buddyId,
              buddyGoal: index.dataValues.buddyGoal,
              active: index.dataValues.active,
              chatChannel: index.dataValues.chatChannel,
              goalId: index.dataValues.GoalId,
              ownerId: index.dataValues.UserId
            };

            results.push(buddy);
          });
          db.Buddy.findAll({
            where: {
              buddyGoal: id,
              active: 1
            }
          }).then(resp => {
            console.log(resp);
            resp.forEach(index => {
              const buddy = {
                id: index.dataValues.id,
                duration: index.dataValues.duration,
                endDate: index.dataValues.endDate,
                buddyId: index.dataValues.buddyId,
                buddyGoal: index.dataValues.buddyGoal,
                active: index.dataValues.active,
                chatChannel: index.dataValues.chatChannel,
                goalId: index.dataValues.GoalId,
                ownerId: index.dataValues.UserId
              };

              results.push(buddy);
            });
            resolve(results);
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // This method will add a new buddy relationship to the database. The newBuddy parameter is an object that will be constructed off
  // the req.body that is passed from the frontend
  addBuddyRelation: newBuddy => {
    return new Promise((resolve, reject) => {
      console.log(newBuddy);
      let num;
      let time;

      switch (newBuddy.duration) {
        case "1 week":
          num = 1;
          time = "weeks";
          break;
        case "2 weeks":
          num = 2;
          time = "weeks";
          break;
        case "3 weeks":
          num = 3;
          time = "weeks";
          break;
        case "4 weeks":
          num = 4;
          time = "weeks";
          break;
      }

      newBuddy.endDate = moment().add(`${num}`, `${time}`);
      console.log(newBuddy);
      db.Buddy.create(newBuddy)
        .then(resp => {
          console.log(resp);
          const results = {
            id: resp.dataValues.id,
            duration: resp.dataValues.duration,
            active: resp.dataValues.active,
            endDate: resp.dataValues.endDate,
            buddyId: resp.dataValues.buddyId,
            buddyGoal: resp.dataValues.buddyGoal,
            chatChannel: resp.dataValues.chatChannel,
            goalId: resp.dataValues.GoalId,
            ownerId: resp.dataValues.UserId
          };
          resolve(results);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // This method will take the id of a buddy relationship and delete it from the database
  deleteBuddyRelation: id => {
    return new Promise((resolve, reject) => {
      db.Buddy.destroy({
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
  },

  updateBuddyRelation: (id, colName, info) => {
    return new Promise((resolve, reject) => {
      db.Buddy.update(
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
  }
};
