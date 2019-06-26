var db = require('../models');

module.exports = {

    getBuddyGoalOwner: id => {
        return new Promise((resolve, reject) => {
            db.BuddyGoal.findAll({
                where: {
                    id: id
                },
                include: [db.User]
            }).then(resp => {
                const results = [];
                resp.forEach(index => {

                    const buddy = {
                        id: index.dataValues.id,
                        duration: index.dataValues.duration,
                        buddyId: index.dataValues.buddyId,
                        active: index.dataValues.active,
                        goalId: index.dataValues.GoalId,
                        ownerId: index.dataValues.UserId

                    }

                resolve(resp)
            }).then(err => {
                reject(err)
            })


        })
    },

    getBuddyOneGoal: id => {
        return new Promise((resolve, reject) => {
            db.BuddyOne.findAll({
                where: {
                    id: id
                },
                include: [db.User, db.BuddyGoal]
            }).then(resp => {



                const buddy = {
                    id: resp[0].dataValues.id,
                    duration: resp[0].dataValues.duration,
                    buddyId: resp[0].dataValues.buddyId,
                    goalId: resp[0].dataValues.GoalId,
                    active: resp[0].dataValues.active,
                    ownerId: resp[0].dataValues.UserId

                }



                resolve(buddy)
            }).catch(err => {
                reject(err)
            })
        })
    },

    getBuddyTwoGoal: id => {
        return new Promise((resolve, reject) => {
            db.BuddyTwo.findAll({
                where: {
                    id: id
                },
                include: [db.User, db.BuddyGoal]
            }).then(resp => {

                const results = [];
                resp.forEach(index => {

                    const buddy = {
                        id: index.dataValues.id,
                        duration: index.dataValues.duration,
                        buddyId: index.dataValues.buddyId,
                        active: index.dataValues.active,
                        goalId: index.dataValues.GoalId,
                        ownerId: index.dataValues.UserId

                    }

                    results.push(buddy)
                })

                resolve(results)
            }).catch(err => {

                reject(err)
            })
        })
    },

    getBuddyGoalThree: id => {
        return new Promise((resolve, reject) => {
            db.BuddyThree.findAll({
                where: {
                    id: id
                },
                include: [db.User, db.BuddyGoal]
            }).then(resp => {
                const results = [];
                resp.forEach(index => {

                    const buddy = {
                        id: index.dataValues.id,
                        duration: index.dataValues.duration,
                        buddyId: index.dataValues.buddyId,
                        active: index.dataValues.active,
                        goalId: index.dataValues.GoalId,
                        ownerId: index.dataValues.UserId

                    }


                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },

    getBuddyGoalFour: id => {
        return new Promise((resolve, reject) => {
            db.BuddyFour.findAll({
                where: {
                    id: id
                },
                include: [db.User, db.BuddyGoal]
            }).then(resp => {


                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },

    getBuddyGoalFive: id => {
        return new Promise((resolve, reject) => {
            db.BuddyFive.findAll({
                where: {
                    id: id
                },
                include: [db.User, db.BuddyGoal]
            }).then(resp => {


                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    }



}