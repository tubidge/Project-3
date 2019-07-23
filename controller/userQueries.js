const db = require("../models");
const helper = require("../utils/helperFunctions");
const buddy = require("../controller/buddyQueries");
const moment = require("moment");
const goalQuery = require("./goalQueries");

module.exports = {
  // This method will create a new user
  addUser: (firstName, lastName, username, email, password, profilePic) => {
    return new Promise((resolve, reject) => {
      db.User.create({
        firstName: firstName,
        lastName: lastName,
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
  },

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
              image: index.dataValues.image
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

  getAllUsername: () => {
    return new Promise((resolve, reject) => {
      db.User.findAll({})
        .then(resp => {
          console.log(resp.length);
          const data = [{}];
          resp.forEach(index => {
            const user = {
              id: index.dataValues.id,
              username: index.dataValues.username,
              email: index.dataValues.email,
              image: index.dataValues.image
            };
            data.push(user);
          });
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getUserByGoal: goalId => {
    return new Promise((resolve, reject) => {
      db.Goals.findAll({
        where: {
          id: goalId
        }
      })
        .then(resp => {
          console.log(resp);

          let userId = resp[0].dataValues.UserId;

          db.User.findAll({
            where: {
              id: userId
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
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getBasicUserByUsername: username => {
    return new Promise((resolve, reject) => {
      db.User.findAll({
        where: {
          username: username
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
  },

  getBasicUserByEmail: email => {
    return new Promise((resolve, reject) => {
      db.User.findAll({
        where: {
          email: email
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
  },

  getGoalPageInfo: email => {
    return new Promise((resolve, reject) => {
      db.User.findAll({
        where: {
          email: email
        },
        include: [db.Goals, db.Buddy]
      })
        .then(resp => {
          console.log(resp);
          const data = resp[0].dataValues;
          const goalIds = [];
          const id = data.id;

          const user = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
            image: data.image,
            buddies: {
              myBuddies: []
            },

            activeGoals: {
              completed: [],
              incomplete: []
            },

            pastGoals: {
              completed: [],
              incomplete: []
            }
          };

          const getBuddies = id => {
            console.log(`getbuddies id ${id}`);
            helper
              .asyncForEach(id, async event => {
                console.log("test");

                await buddy
                  .getAllBuddiesId(id)
                  .then(resp => {
                    console.log(resp);
                    console.log("resp");
                    if (resp.length > 0) {
                      resp.forEach(index => {
                        console.log("index");
                        console.log(index);
                        if (index.active) {
                          const myBuddy = {};
                          myBuddy.id = index.id;
                          myBuddy.duration = index.duration;
                          myBuddy.active = index.active;
                          myBuddy.buddyId = index.buddyId;
                          myBuddy.buddyGoal = index.buddyGoal;
                          myBuddy.channel = index.chatChannel;
                          myBuddy.goalId = index.goalId;
                          myBuddy.ownerId = index.ownerId;
                          console.log(myBuddy);
                          user.buddies.myBuddies.push(myBuddy);
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
                const buddyArr = [];
                helper
                  .asyncForEach(user.buddies.myBuddies, async event => {
                    console.log(event);
                    console.log(typeof event.buddyId);
                    console.log("this is the event");
                    console.log(typeof id);
                    if (parseInt(id) === event.buddyId) {
                      console.log("true");
                      await db.User.findAll({
                        where: {
                          id: event.ownerId
                        }
                      }).then(resp => {
                        console.log("async await");
                        console.log(resp);
                        const buddyData = {
                          id: event.id,
                          email: resp[0].dataValues.email,
                          username: resp[0].dataValues.username,
                          channel: event.channel
                        };

                        buddyArr.push(buddyData);
                        console.log(buddyArr);
                        user.buddies.allBuddies = buddyArr;
                      });
                    } else {
                      console.log("false");
                      await db.User.findAll({
                        where: {
                          id: event.buddyId
                        }
                      }).then(resp => {
                        console.log("async await");
                        console.log(resp);
                        const buddyData = {
                          id: event.id,
                          email: resp[0].dataValues.email,
                          username: resp[0].dataValues.username,
                          channel: event.channel
                        };

                        buddyArr.push(buddyData);
                        console.log(buddyArr);
                        user.buddies.allBuddies = buddyArr;
                      });
                    }
                  })
                  .then(() => {
                    user.activeGoals.completed.forEach(index => {
                      user.pastGoals.completed.push(index);
                    });
                    user.activeGoals.completed = [];

                    resolve(user);
                  });
              });
          };

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
          getBuddies(id);
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
        include: [db.Goals, db.Milestones, db.Buddy]
      })
        .then(resp => {
          console.log("query");
          console.log(resp[0].dataValues.Milestones);
          const data = resp[0].dataValues;
          const goalIds = [];
          const user = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
            image: data.image,
            buddies: {
              myBuddies: []
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
            console.log(`getbuddies id ${id}`);
            helper
              .asyncForEach(id, async event => {
                console.log("test");

                await buddy
                  .getAllBuddiesId(id)
                  .then(resp => {
                    console.log(resp);
                    console.log("resp");
                    if (resp.length > 0) {
                      resp.forEach(index => {
                        console.log("index");
                        console.log(index);
                        if (index.active) {
                          const myBuddy = {};
                          myBuddy.id = index.id;
                          myBuddy.duration = index.duration;
                          myBuddy.active = index.active;
                          myBuddy.buddyId = index.buddyId;
                          myBuddy.buddyGoal = index.buddyGoal;
                          myBuddy.channel = index.chatChannel;
                          myBuddy.goalId = index.goalId;
                          myBuddy.ownerId = index.ownerId;
                          console.log(myBuddy);
                          user.buddies.myBuddies.push(myBuddy);
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
                const buddyArr = [];
                helper
                  .asyncForEach(user.buddies.myBuddies, async event => {
                    console.log(event);
                    console.log(typeof event.buddyId);
                    console.log("this is the event");
                    console.log(typeof id);
                    if (parseInt(id) === event.buddyId) {
                      console.log("true");
                      await db.User.findAll({
                        where: {
                          id: event.ownerId
                        }
                      }).then(resp => {
                        console.log("async await");
                        console.log(resp);
                        const buddyData = {
                          id: event.id,
                          email: resp[0].dataValues.email,
                          username: resp[0].dataValues.username,
                          channel: event.channel
                        };

                        buddyArr.push(buddyData);
                        console.log(buddyArr);
                        user.buddies.allBuddies = buddyArr;
                      });
                    } else {
                      console.log("false");
                      await db.User.findAll({
                        where: {
                          id: event.buddyId
                        }
                      }).then(resp => {
                        console.log("async await");
                        console.log(resp);
                        const buddyData = {
                          id: event.id,
                          email: resp[0].dataValues.email,
                          username: resp[0].dataValues.username,
                          channel: event.channel
                        };

                        buddyArr.push(buddyData);
                        console.log(buddyArr);
                        user.buddies.allBuddies = buddyArr;
                      });
                    }
                  })
                  .then(() => {
                    resolve(user);
                  });
              });
          };

          // const assignBuddies = goalId => {
          //   helper
          //     .asyncForEach(goalId, async event => {
          //       console.log(goalId);
          //       console.log(event);
          //       await buddy
          //         .getByGoal(event)
          //         .then(resp => {
          //           console.log("issue");
          //           console.log(resp);
          //           const myBuddy = {
          //             id: resp[0].id,
          //             duration: resp[0].duration,
          //             active: resp[0].active,
          //             buddyId: resp[0].buddyId,
          //             channel: resp[0].chatChannel,
          //             goalId: resp[0].goalId,
          //             ownerId: resp[0].ownerId
          //           };
          //           console.log(myBuddy);
          //           user.buddies.buddiesWith.push(myBuddy);
          //         })
          //         .catch(err => {
          //           console.log(err);
          //         });
          //     })
          //     .then(() => {
          //       const buddyArr = [];
          //       helper
          //         .asyncForEach(user.buddies.myBuddies, async event => {
          //           console.log(event);
          //           console.log("this is the event");
          //           await db.User.findAll({
          //             where: {
          //               id: event.ownerId
          //             }
          //           }).then(resp => {
          //             console.log("async await");
          //             console.log(resp);
          //             const buddyData = {
          //               id: event.id,
          //               email: resp[0].dataValues.email,
          //               username: resp[0].dataValues.username,
          //               channel: event.channel
          //             };

          //             buddyArr.push(buddyData);
          //             console.log(buddyArr);
          //           });
          //         })
          //         .then(() => {
          //           helper
          //             .asyncForEach(user.buddies.buddiesWith, async event => {
          //               await db.User.findAll({
          //                 where: {
          //                   id: event.buddyId
          //                 }
          //               }).then(resp => {
          //                 for (var i = 0; i < buddyArr.length; i++) {
          //                   console.log(buddyArr[i].email);
          //                   if (
          //                     !buddyArr[i].email === resp[0].dataValues.email
          //                   ) {
          //                     const buddyData = {
          //                       id: event.id,
          //                       email: resp[0].dataValues.email,
          //                       channel: resp[0].dataValues.chatChannel
          //                     };
          //                     buddyArr.push(buddyData);
          //                   }
          //                 }
          //                 console.log(buddyArr);
          //                 user.buddies.allBuddies = buddyArr;
          //               });
          //             })
          //             .then(() => {
          //               resolve(user);
          //             });
          //         });
          //     });
          // };

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
              let milestoneDate = moment(index.dataValues.dueDate).format(
                "YYYY-MM-DD"
              );

              if (moment(milestoneDate).isAfter(date)) {
                const milestone = {};
                milestone.id = index.dataValues.id;
                milestone.name = index.dataValues.name;
                milestone.frequency = index.dataValues.frequency;
                milestone.dueDate = moment(index.dataValues.dueDate).format(
                  "YYYY-MM-DD"
                );
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
                milestone.dueDate = moment(index.dataValues.dueDate).format(
                  "YYYY-MM-DD"
                );
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

  // findUserByEmail: email => {
  //   return new Promise((resolve, reject) => {
  //     db.User.findAll({
  //       where: {
  //         email: email
  //       },
  //       include: [db.Goals, db.Milestones, db.Buddy]
  //     })
  //       .then(resp => {
  //         console.log("query");
  //         const data = resp[0].dataValues;
  //         const userId = data.id;
  //         const goalIds = [];
  //         const user = {
  //           id: data.id,
  //           firstName: data.firstName,
  //           lastName: data.lastName,
  //           username: data.username,
  //           email: data.email,
  //           image: data.image,
  //           created: data.createdAt,
  //           buddies: {
  //             myBuddies: []
  //           },
  //           activeGoals: {
  //             completed: [],
  //             incomplete: []
  //           },
  //           activeMilestones: {
  //             completed: [],
  //             incomplete: []
  //           },
  //           pastGoals: {
  //             completed: [],
  //             incomplete: []
  //           },
  //           pastMilestones: {
  //             completed: [],
  //             incomplete: []
  //           }
  //         };
  //         const getBuddies = async id => {
  //           console.log(`getbuddies id ${id}`);
  //           console.log("test");
  //           await buddy
  //             .getAllBuddiesId(id)
  //             .then(resp => {
  //               console.log("where the fuck is this");
  //               console.log(resp);
  //               console.log("resp");
  //               if (resp.length > 0) {
  //                 resp.forEach(index => {
  //                   console.log("index");
  //                   console.log(index);
  //                   if (index.active) {
  //                     const myBuddy = {};
  //                     myBuddy.id = index.id;
  //                     myBuddy.duration = index.duration;
  //                     myBuddy.active = index.active;
  //                     myBuddy.buddyId = index.buddyId;
  //                     myBuddy.buddyGoal = index.buddyGoal;
  //                     myBuddy.channel = index.chatChannel;
  //                     myBuddy.goalId = index.goalId;
  //                     myBuddy.ownerId = index.ownerId;
  //                     console.log(myBuddy);
  //                     user.buddies.myBuddies.push(myBuddy);
  //                   } else {
  //                     return false;
  //                   }
  //                 });
  //               }
  //             })
  //             .then(() => {
  //               const buddyArr = [];
  //               helper
  //                 .asyncForEach(user.buddies.myBuddies, async event => {
  //                   console.log(event);
  //                   console.log(typeof event.buddyId);
  //                   const getGoal = id => {
  //                     goalQuery.getBasicGoal(id).then(resp => {
  //                       console.log("=========-------=======");
  //                       console.log("BUDDY");
  //                       console.log(resp);
  //                       goalName = resp.name;
  //                     });
  //                   };
  //                   const getUserGoal = id => {
  //                     goalQuery.getBasicGoal(id).then(resp => {
  //                       console.log("=========-------=======");
  //                       console.log("USER");
  //                       console.log(resp);
  //                       userGoal = resp.name;
  //                     });
  //                   };
  //                   console.log("this is the event");
  //                   console.log(typeof id);
  //                   let goalName;
  //                   let userGoal;
  //                   getUserGoal(event.goalId);
  //                   getGoal(event.buddyGoal);
  //                   if (parseInt(id) === event.buddyId) {
  //                     console.log("true");
  //                     await db.User.findAll({
  //                       where: {
  //                         id: event.ownerId
  //                       }
  //                     }).then(resp => {
  //                       console.log("async await");
  //                       console.log(resp);
  //                       const buddyData = {
  //                         id: event.id,
  //                         email: resp[0].dataValues.email,
  //                         username: resp[0].dataValues.username,
  //                         channel: event.channel,
  //                         buddyId: resp[0].dataValues.id,
  //                         image: resp[0].dataValues.image,
  //                         buddyGoal: userGoal,
  //                         userGoal: goalName
  //                       };
  //                       buddyArr.push(buddyData);
  //                       console.log(buddyArr);
  //                       user.buddies.allBuddies = buddyArr;
  //                     });
  //                   } else {
  //                     console.log("false");
  //                     await db.User.findAll({
  //                       where: {
  //                         id: event.buddyId
  //                       }
  //                     }).then(resp => {
  //                       console.log("async await");
  //                       console.log(resp);
  //                       const buddyData = {
  //                         id: event.id,
  //                         email: resp[0].dataValues.email,
  //                         username: resp[0].dataValues.username,
  //                         channel: event.channel,
  //                         buddyId: resp[0].dataValues.id,
  //                         image: resp[0].dataValues.image,
  //                         buddyGoal: goalName,
  //                         userGoal: userGoal
  //                       };
  //                       buddyArr.push(buddyData);
  //                       console.log(buddyArr);
  //                       user.buddies.allBuddies = buddyArr;
  //                     });
  //                   }
  //                 })
  //                 .then(() => {
  //                   resolve(user);
  //                 });
  //             })
  //             .catch(err => {
  //               console.log(err);
  //             });
  //         };
  //         // const assignBuddies = goalId => {
  //         //   helper
  //         //     .asyncForEach(goalId, async event => {
  //         //       console.log(goalId);
  //         //       console.log(event);
  //         //       await buddy
  //         //         .getByGoal(event)
  //         //         .then(resp => {
  //         //           console.log("issue");
  //         //           console.log(resp);
  //         //           const myBuddy = {
  //         //             id: resp[0].id,
  //         //             duration: resp[0].duration,
  //         //             active: resp[0].active,
  //         //             buddyId: resp[0].buddyId,
  //         //             channel: resp[0].chatChannel,
  //         //             goalId: resp[0].goalId,
  //         //             ownerId: resp[0].ownerId
  //         //           };
  //         //           console.log(myBuddy);
  //         //           user.buddies.buddiesWith.push(myBuddy);
  //         //         })
  //         //         .catch(err => {
  //         //           console.log(err);
  //         //         });
  //         //     })
  //         //     .then(() => {
  //         //       const buddyArr = [];
  //         //       helper
  //         //         .asyncForEach(user.buddies.myBuddies, async event => {
  //         //           console.log(event);
  //         //           console.log("this is the event");
  //         //           await db.User.findAll({
  //         //             where: {
  //         //               id: event.ownerId
  //         //             }
  //         //           }).then(resp => {
  //         //             console.log("async await");
  //         //             console.log(resp);
  //         //             const buddyData = {
  //         //               id: event.id,
  //         //               email: resp[0].dataValues.email,
  //         //               channel: event.channel
  //         //             };
  //         //             buddyArr.push(buddyData);
  //         //             console.log(buddyArr);
  //         //           });
  //         //         })
  //         //         .then(() => {
  //         //           helper
  //         //             .asyncForEach(user.buddies.buddiesWith, async event => {
  //         //               console.log("and this");
  //         //               console.log(event);
  //         //               await db.User.findAll({
  //         //                 where: {
  //         //                   id: event.buddyId
  //         //                 }
  //         //               }).then(resp => {
  //         //                 console.log("find this");
  //         //                 console.log(resp);
  //         //                 for (var i = 0; i < buddyArr.length; i++) {
  //         //                   console.log(buddyArr[i].email);
  //         //                   if (
  //         //                     !buddyArr[i].email === resp[0].dataValues.email
  //         //                   ) {
  //         //                     const buddyData = {
  //         //                       id: event.id,
  //         //                       email: resp[0].dataValues.email,
  //         //                       channel: resp[0].dataValues.chatChannel
  //         //                     };
  //         //                     buddyArr.push(buddyData);
  //         //                   }
  //         //                 }
  //         //                 console.log(buddyArr);
  //         //                 user.buddies.allBuddies = buddyArr;
  //         //               });
  //         //             })
  //         //             .then(() => {
  //         //               resolve(user);
  //         //             });
  //         //         });
  //         //     });
  //         // };
  //         if (data.Goals.length > 0) {
  //           data.Goals.forEach(index => {
  //             goalIds.push(index.dataValues.id);
  //             let date = moment().format("YYYY-MM-DD");
  //             let goalDate = moment(index.dataValues.dueDate)
  //               .add("1", "day")
  //               .format("YYYY-MM-DD");
  //             if (moment(goalDate).isAfter(date)) {
  //               const goal = {};
  //               goal.id = index.dataValues.id;
  //               goal.name = index.dataValues.name;
  //               goal.category = index.dataValues.category;
  //               goal.description = index.dataValues.description;
  //               goal.dueDate = moment(index.dataValues.dueDate)
  //                 .add("1", "day")
  //                 .format("YYYY-MM-DD");
  //               goal.private = index.dataValues.private;
  //               goal.complete = index.dataValues.complete;
  //               goal.userId = index.dataValues.UserId;
  //               if (goal.complete) {
  //                 user.activeGoals.completed.push(goal);
  //               } else {
  //                 user.activeGoals.incomplete.push(goal);
  //               }
  //             } else {
  //               const goal = {};
  //               goal.id = index.dataValues.id;
  //               goal.name = index.dataValues.name;
  //               goal.category = index.dataValues.category;
  //               goal.description = index.dataValues.description;
  //               goal.dueDate = moment(index.dataValues.dueDate)
  //                 .add("1", "day")
  //                 .format("YYYY-MM-DD");
  //               goal.private = index.dataValues.private;
  //               goal.complete = index.dataValues.complete;
  //               goal.userId = index.dataValues.UserId;
  //               if (goal.complete) {
  //                 user.pastGoals.completed.push(goal);
  //               } else {
  //                 user.pastGoals.incomplete.push(goal);
  //               }
  //             }
  //           });
  //         }
  //         if (data.Milestones.length > 0) {
  //           data.Milestones.forEach(index => {
  //             let date = moment().format("YYYY-MM-DD");
  //             let milestoneDate = moment(index.dataValues.dueDate)
  //               .add("1", "day")
  //               .format("YYYY-MM-DD");
  //             if (moment(milestoneDate).isAfter(date)) {
  //               const milestone = {};
  //               milestone.id = index.dataValues.id;
  //               milestone.name = index.dataValues.name;
  //               milestone.frequency = index.dataValues.frequency;
  //               milestone.dueDate = moment(index.dataValues.dueDate)
  //                 .add("1", "day")
  //                 .format("YYYY-MM-DD");
  //               milestone.completed = index.dataValues.completed;
  //               milestone.notes = index.dataValues.notes;
  //               milestone.goalId = index.dataValues.GoalId;
  //               milestone.userId = index.dataValues.UserId;
  //               if (milestone.completed) {
  //                 user.activeMilestones.completed.push(milestone);
  //               } else {
  //                 user.activeMilestones.incomplete.push(milestone);
  //               }
  //             } else {
  //               const milestone = {};
  //               milestone.id = index.dataValues.id;
  //               milestone.name = index.dataValues.name;
  //               milestone.frequency = index.dataValues.frequency;
  //               milestone.dueDate = moment(index.dataValues.dueDate)
  //                 .add("1", "day")
  //                 .format("YYYY-MM-DD");
  //               milestone.completed = index.dataValues.completed;
  //               milestone.notes = index.dataValues.notes;
  //               milestone.goalId = index.dataValues.GoalId;
  //               milestone.userId = index.dataValues.UserId;
  //               if (milestone.completed) {
  //                 user.pastMilestones.completed.push(milestone);
  //               } else {
  //                 user.pastMilestones.incomplete.push(milestone);
  //               }
  //             }
  //           });
  //         }
  //         getBuddies(userId);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
  // },

  findUserByEmail: email => {
    return new Promise((resolve, reject) => {
      db.User.findAll({
        where: {
          email: email
        },
        include: [db.Goals, db.Milestones, db.Buddy]
      })
        .then(resp => {
          console.log("query");

          const data = resp[0].dataValues;
          const userId = data.id;
          const goalIds = [];
          const user = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
            image: data.image,
            created: data.createdAt,
            buddies: {
              myBuddies: []
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

          const getBuddies = async id => {
            console.log(`getbuddies id ${id}`);
            console.log("test");

            await buddy
              .getAllBuddiesId(id)
              .then(resp => {
                console.log("where the fuck is this");
                console.log(resp);
                console.log("resp");
                if (resp.length > 0) {
                  resp.forEach(index => {
                    console.log("index");
                    console.log(index);
                    if (index.active) {
                      const myBuddy = {};
                      myBuddy.id = index.id;
                      myBuddy.duration = index.duration;
                      myBuddy.active = index.active;
                      myBuddy.endDate = index.endDate;
                      myBuddy.buddyId = index.buddyId;
                      myBuddy.buddyGoal = index.buddyGoal;
                      myBuddy.channel = index.chatChannel;
                      myBuddy.goalId = index.goalId;
                      myBuddy.ownerId = index.ownerId;
                      myBuddy.image = index.image;
                      console.log(myBuddy);
                      user.buddies.myBuddies.push(myBuddy);
                    } else {
                      return false;
                    }
                  });
                }
              })
              .then(() => {
                const buddyArr = [];
                helper
                  .asyncForEach(user.buddies.myBuddies, async event => {
                    console.log(event);
                    console.log(typeof event.buddyId);
                    const getGoal = id => {
                      goalQuery.getBasicGoal(id).then(resp => {
                        console.log("=========-------=======");
                        console.log("BUDDY");
                        console.log(resp);
                        goalName = resp.name;
                      });
                    };
                    const getUserGoal = id => {
                      goalQuery.getBasicGoal(id).then(resp => {
                        console.log("=========-------=======");
                        console.log("USER");
                        console.log(resp);
                        userGoal = resp.name;
                      });
                    };

                    console.log("this is the event");
                    console.log(typeof id);
                    let goalName;
                    let userGoal;
                    getUserGoal(event.goalId);
                    getGoal(event.buddyGoal);
                    if (parseInt(id) === event.buddyId) {
                      console.log("true");
                      await db.User.findAll({
                        where: {
                          id: event.ownerId
                        }
                      }).then(resp => {
                        console.log("async await");
                        console.log(resp);
                        const buddyData = {
                          id: event.id,
                          email: resp[0].dataValues.email,
                          username: resp[0].dataValues.username,
                          channel: event.channel,
                          endDate: event.endDate,
                          buddyId: resp[0].dataValues.id,

                          image: resp[0].dataValues.image,

                          buddyGoal: userGoal,
                          userGoal: goalName
                        };

                        buddyArr.push(buddyData);
                        console.log(buddyArr);
                        user.buddies.allBuddies = buddyArr;
                      });
                    } else {
                      console.log("false");
                      await db.User.findAll({
                        where: {
                          id: event.buddyId
                        }
                      }).then(resp => {
                        console.log("async await");
                        console.log(resp);
                        const buddyData = {
                          id: event.id,
                          email: resp[0].dataValues.email,
                          username: resp[0].dataValues.username,
                          channel: event.channel,
                          endDate: event.endDate,
                          buddyId: resp[0].dataValues.id,
                          image: resp[0].dataValues.image,
                          buddyGoal: goalName,
                          userGoal: userGoal
                        };

                        buddyArr.push(buddyData);
                        console.log(buddyArr);
                        user.buddies.allBuddies = buddyArr;
                      });
                    }
                  })
                  .then(() => {
                    resolve(user);
                  });
              })
              .catch(err => {
                console.log(err);
              });
          };

          // const assignBuddies = goalId => {
          //   helper
          //     .asyncForEach(goalId, async event => {
          //       console.log(goalId);
          //       console.log(event);
          //       await buddy
          //         .getByGoal(event)
          //         .then(resp => {
          //           console.log("issue");
          //           console.log(resp);
          //           const myBuddy = {
          //             id: resp[0].id,
          //             duration: resp[0].duration,
          //             active: resp[0].active,
          //             buddyId: resp[0].buddyId,
          //             channel: resp[0].chatChannel,
          //             goalId: resp[0].goalId,
          //             ownerId: resp[0].ownerId
          //           };
          //           console.log(myBuddy);
          //           user.buddies.buddiesWith.push(myBuddy);
          //         })
          //         .catch(err => {
          //           console.log(err);
          //         });
          //     })
          //     .then(() => {
          //       const buddyArr = [];
          //       helper
          //         .asyncForEach(user.buddies.myBuddies, async event => {
          //           console.log(event);
          //           console.log("this is the event");
          //           await db.User.findAll({
          //             where: {
          //               id: event.ownerId
          //             }
          //           }).then(resp => {
          //             console.log("async await");
          //             console.log(resp);
          //             const buddyData = {
          //               id: event.id,
          //               email: resp[0].dataValues.email,
          //               channel: event.channel
          //             };

          //             buddyArr.push(buddyData);
          //             console.log(buddyArr);
          //           });
          //         })
          //         .then(() => {
          //           helper
          //             .asyncForEach(user.buddies.buddiesWith, async event => {
          //               console.log("and this");
          //               console.log(event);
          //               await db.User.findAll({
          //                 where: {
          //                   id: event.buddyId
          //                 }
          //               }).then(resp => {
          //                 console.log("find this");
          //                 console.log(resp);
          //                 for (var i = 0; i < buddyArr.length; i++) {
          //                   console.log(buddyArr[i].email);
          //                   if (
          //                     !buddyArr[i].email === resp[0].dataValues.email
          //                   ) {
          //                     const buddyData = {
          //                       id: event.id,
          //                       email: resp[0].dataValues.email,
          //                       channel: resp[0].dataValues.chatChannel
          //                     };
          //                     buddyArr.push(buddyData);
          //                   }
          //                 }
          //                 console.log(buddyArr);
          //                 user.buddies.allBuddies = buddyArr;
          //               });
          //             })
          //             .then(() => {
          //               resolve(user);
          //             });
          //         });
          //     });
          // };

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

          getBuddies(userId);
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
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
