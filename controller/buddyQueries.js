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


                resolve(resp)
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

                resolve(resp)
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