const db = require('../models');
const helper = require('../utils/helperFunctions');
const buddy = require('../controller/buddyQueries')
const moment = require('moment');

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
            }).then(resp => {
                console.log(resp)
                const results = {
                    id: resp.dataValues.id,
                    firstName: resp.dataValues.firstName,
                    lastName: resp.dataValues.lastName,
                    username: resp.dataValues.username,
                    email: resp.dataValues.email,
                    profilePic: resp.dataValues.profilePic
                }
                resolve(results)
            }).catch(err => {
                reject(err)
            })

        })
    },

    // This method will return all users
    getAllUsers: () => {
        return new Promise((resolve, reject) => {
            db.User.findAll({

            }).then(resp => {
                console.log(resp.length)
                const users = [];
                resp.forEach(index => {
                    const user = {
                        id: index.dataValues.id,
                        firstName: index.dataValues.firstName,
                        lastName: index.dataValues.lastName,
                        username: index.dataValues.username,
                        email: index.dataValues.email,
                        profilePic: index.dataValues.profilePic
                    }
                    users.push(user)
                })
                resolve(users)
            }).catch(err => {
                reject(err)
            })

        })
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
            }).then(resp => {

                console.log('query')
                console.log(resp[0].dataValues.Milestones)
                const data = resp[0].dataValues;
                const goalIds = [];
                const user = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    username: data.username,
                    email: data.email,
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
                }

                const getBuddies = id => {
                    helper.asyncForEach(id, async event => {
                        console.log(event)
                        await buddy.getBuddyId(id).then(resp => {

                            if (resp.length > 0) {

                                resp.forEach(index => {

                                    if (index.dataValues.active) {
                                        const buddy = {};
                                        buddy.id = index.dataValues.id;
                                        buddy.duration = index.dataValues.duration;
                                        buddy.active = index.dataValues.active;
                                        buddy.buddyId = index.dataValues.buddyId;
                                        buddy.goalId = index.dataValues.GoalId;
                                        buddy.ownerId = index.dataValues.UserId;
                                        user.buddies.myBuddies.push(buddy)
                                    } else {
                                        return false
                                    }
                                })
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    }).then(() => {
                        assignBuddies(goalIds)
                    })
                }

                const assignBuddies = goalId => {
                    helper.asyncForEach(goalId, async event => {
                        await buddy.getByGoal(event).then(resp => {
                            console.log('This repsonses')
                            console.log(resp[0].dataValues)
                            const buddy = {
                                id: resp[0].dataValues.id,
                                duration: resp[0].dataValues.duration,
                                active: resp[0].dataValues.active,
                                buddyId: resp[0].dataValues.buddyId,
                                goalId: resp[0].dataValues.GoalId,
                                ownerId: resp[0].dataValues.UserId
                            }
                            user.buddies.buddiesWith.push(buddy)


                        }).catch(err => {
                            console.log(err)
                        })
                    }).then(() => {
                        resolve(user)
                    })

                }

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
                        goalIds.push(index.dataValues.id)
                        let date = moment().format('YYYY-MM-DD');
                        let goalDate = moment(index.dataValues.dueDate).add('1', 'day').format('YYYY-MM-DD');
                        if (moment(goalDate).isAfter(date)) {

                            const goal = {};
                            goal.id = index.dataValues.id;
                            goal.name = index.dataValues.name;
                            goal.category = index.dataValues.category;
                            goal.description = index.dataValues.description;
                            goal.dueDate = moment(index.dataValues.dueDate).add('1', 'day').format('YYYY-MM-DD');
                            goal.private = index.dataValues.private;
                            goal.complete = index.dataValues.complete;
                            goal.userId = index.dataValues.UserId;
                            if (goal.complete) {
                                user.activeGoals.completed.push(goal)
                            } else {
                                user.activeGoals.incomplete.push(goal)
                            }
                        } else {

                            const goal = {};
                            goal.id = index.dataValues.id;
                            goal.name = index.dataValues.name;
                            goal.category = index.dataValues.category;
                            goal.description = index.dataValues.description;
                            goal.dueDate = moment(index.dataValues.dueDate).add('1', 'day').format('YYYY-MM-DD');
                            goal.private = index.dataValues.private;
                            goal.complete = index.dataValues.complete;
                            goal.userId = index.dataValues.UserId;
                            if (goal.complete) {
                                user.pastGoals.completed.push(goal)
                            } else {
                                user.pastGoals.incomplete.push(goal)
                            }
                        }
                    })
                }

                if (data.Milestones.length > 0) {
                    data.Milestones.forEach(index => {
                        let date = moment().format('YYYY-MM-DD');
                        let milestoneDate = moment(index.dataValues.dueDate).add('1', 'day').format('YYYY-MM-DD');

                        if (moment(milestoneDate).isAfter(date)) {
                            const milestone = {};
                            milestone.id = index.dataValues.id;
                            milestone.name = index.dataValues.name;
                            milestone.frequency = index.dataValues.frequency;
                            milestone.dueDate = moment(index.dataValues.dueDate).add('1', 'day').format('YYYY-MM-DD');
                            milestone.completed = index.dataValues.completed;
                            milestone.notes = index.dataValues.notes;
                            milestone.goalId = index.dataValues.GoalId;
                            milestone.userId = index.dataValues.UserId;

                            if (milestone.completed) {
                                user.activeMilestones.completed.push(milestone)
                            } else {
                                user.activeMilestones.incomplete.push(milestone)
                            }
                        } else {
                            const milestone = {};
                            milestone.id = index.dataValues.id;
                            milestone.name = index.dataValues.name;
                            milestone.frequency = index.dataValues.frequency;
                            milestone.dueDate = moment(index.dataValues.dueDate).add('1', 'day').format('YYYY-MM-DD');
                            milestone.completed = index.dataValues.completed;
                            milestone.notes = index.dataValues.notes;
                            milestone.goalId = index.dataValues.GoalId;
                            milestone.userId = index.dataValues.UserId;

                            if (milestone.completed) {
                                user.pastMilestones.completed.push(milestone)
                            } else {
                                user.pastMilestones.incomplete.push(milestone)
                            }
                        }
                    })

                }

                getBuddies(id)

            }).catch(err => {
                reject(err)
            })
        })
    },

    updateUser: (id, colName, info) => {
        return new Promise((resolve, reject) => {
            db.User.update({
                [colName]: info
            }, {
                where: {
                    id: id
                }
            }).then(resp => {
                console.log(resp)
                let results;
                if (resp[0] == 1) {
                    results = 'Info updated'
                } else {
                    results = 'Error updating info'
                }
                resolve(results)
            }).catch(err => {
                reject(err)
            })
        })
    }






}