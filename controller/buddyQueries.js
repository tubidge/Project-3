var db = require("../models");

module.exports = {
  // This id is the buddyId. This method will return all active buddy goal relationships that this id is associated with
  getBuddyId: id => {
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
            const buddy = {
              id: index.dataValues.id,
              duration: index.dataValues.duration,
              buddyId: index.dataValues.buddyId,
              active: index.dataValues.active,
              chatChannel: index.dataValues.chatChannel,
              goalId: index.dataValues.GoalId,
              ownerId: index.dataValues.UserId
            };

            results.push(buddy);
          });

          resolve(results);
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
  getByOwner: id => {
    return new Promise((resolve, reject) => {
      db.Buddy.findAll({
        where: {
          UserId: id,
          active: 1
        }
      })
        .then(resp => {
          const results = [];
          resp.forEach(index => {
            const buddy = {
              id: index.dataValues.id,
              duration: index.dataValues.duration,
              buddyId: index.dataValues.buddyId,
              chatChannel: index.dataValues.chatChannel,
              active: index.dataValues.active,
              goalId: index.dataValues.GoalId,
              ownerId: index.dataValues.UserId
            };

            results.push(buddy);
          });

          resolve(results);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

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
              buddyId: index.dataValues.buddyId,
              active: index.dataValues.active,
              chatChannel: index.dataValues.chatChannel,
              goalId: index.dataValues.GoalId,
              ownerId: index.dataValues.UserId
            };

            results.push(buddy);
          });

          resolve(results);
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
      db.Buddy.create(newBuddy)
        .then(resp => {
          console.log(resp);
          const results = {
            id: resp.dataValues.id,
            duration: resp.dataValues.duration,
            active: resp.dataValues.active,
            buddyId: resp.dataValues.buddyId,
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
