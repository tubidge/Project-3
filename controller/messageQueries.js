const db = require("../models");
const moment = require("moment");
const helper = require("../utils/helperFunctions");
const userQuery = require("../controller/userQueries");

module.exports = {
  sendMessage: (message, sentBy, sentTo, buddyId) => {
    return new Promise((resolve, reject) => {
      db.Message.create({
        message: message,
        sentBy: sentBy,
        sentTo: sentTo,
        BuddyId: buddyId
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

  getBuddyMessages: buddyId => {
    return new Promise((resolve, reject) => {
      db.Message.findAll({
        where: {
          BuddyId: buddyId
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
  },

  getUsers: id => {
    return new Promise((resolve, reject) => {
      db.Message.findAll({
        where: {
          sentBy: id
        }
      })
        .then(resp => {
          console.log("sent resp");
          console.log(resp);
          const messages = {};

          messages.sent = resp;

          db.Message.findAll({
            where: {
              sentTo: id
            }
          })
            .then(resp => {
              console.log("rec resp");
              console.log(resp);
              messages.recieved = resp;

              const user = {
                users: []
              };
              const users = [];

              messages.sent.forEach(index => {
                if (users.includes(index.sentTo)) {
                  return false;
                } else {
                  users.push(index.sentTo);
                }
              });
              messages.recieved.forEach(index => {
                if (users.includes(index.sentBy)) {
                  return false;
                } else {
                  users.push(index.sentBy);
                }
              });

              const configUsers = id => {
                helper
                  .asyncForEach(id, async event => {
                    console.log("running");
                    console.log(event);
                    await userQuery.getBasicUser(event).then(data => {
                      console.log(data);
                      user.users.push(data);
                    });
                  })
                  .then(() => {
                    resolve(user);
                  });
              };
              console.log(users);
              configUsers(users);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getUserMessages: (id, buddyId) => {
    return new Promise((resolve, reject) => {
      db.Message.findAll({
        where: {
          sentBy: id,
          sentTo: buddyId
        }
      })
        .then(resp => {
          console.log(resp);
          const messages = {
            sent: resp
          };
          db.Message.findAll({
            where: {
              sentBy: buddyId,
              sentTo: id
            }
          }).then(resp => {
            messages.recieved = resp;
            resolve(messages);
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
