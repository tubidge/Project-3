const db = require("../models");
const moment = require("moment");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
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
  getBasicGoal: id => {
    return new Promise((resolve, reject) => {
      db.Goals.findAll({
        where: {
          id: id
        }
      })
        .then(resp => {
          console.log(resp);
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
            image: resp[0].dataValues.image
          };
          resolve(results);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
