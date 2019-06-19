const db = require('../models');
const helper = require('../utils/helperFunctions');
const moment = require('moment');

module.exports = {

    // This method will create a new user
    addUser: (firstName, lastName, username, email, password) => {
        return new Promise((resolve, reject) => {
            db.User.create({
                firstName: firstName,
                lastName: lastName,
                username,
                username,
                email: email,
                password: password
            }).then(resp => {
                console.log(resp)
                resolve(resp)
            }).catch(err => {
                reject(err)
            })

        })
    },

    // This method will return all users with their goals and milestones
    getAllUsers: () => {
        return new Promise((resolve, reject) => {
            db.User.findAll({
                include: [db.Goals, db.Milestones]
            }).then(resp => {
                console.log(resp)
                resolve(resp)
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
                const user = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    username: data.username,
                    email: data.email,
                    buddies: [],
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

                if (data.Buddies.length > 0) {
                    data.Buddies.forEach(index => {
                        if (index.dataValues.active) {
                            const buddy = {};
                            buddy.id = index.dataValues.id;
                            buddy.duration = index.dataValues.duration;
                            buddy.active = index.dataValues.active;
                            buddy.buddyId = index.dataValues.buddyId;
                            buddy.goalId = index.dataValues.GoalId;
                            buddy.ownerId = index.dataValues.UserId;
                            user.buddies.push(buddy)
                        } else {
                            return false
                        }
                    })
                }

                if (data.Goals.length > 0) {

                    data.Goals.forEach(index => {
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

                resolve(user)
            }).catch(err => {
                reject(err)
            })
        })
    }






}