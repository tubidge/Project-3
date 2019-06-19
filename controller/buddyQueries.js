var db = require('../models');

module.exports = {

    getBuddyId: id => {
        return new Promise((resolve, reject) => {
            db.Buddy.findAll({
                where: {
                    buddyId: id
                }
            }).then(resp => {
                console.log(resp)

                resolve(resp)
            }).catch(err => {
                reject(err)
            })

        })
    },

    getById: id => {
        return new Promise((resolve, reject) => {
            db.Buddy.findAll({
                where: {
                    id: id
                }
            }).then(resp => {
                console.log(resp)

                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },

    getByOwner: id => {
        return new Promise((resolve, reject) => {
            db.Buddy.findAll({
                where: {
                    UserId: id
                }
            }).then(resp => {
                console.log(resp)

                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },

    getByGoal: id => {
        return new Promise((resolve, reject) => {
            db.Buddy.findAll({
                where: {
                    GoalId: id
                }
            }).then(resp => {
                console.log(resp)

                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },

    addBuddyRelation: (newBuddy) => {
        return new Promise((resolve, reject) => {
            db.Buddy.create(newBuddy).then(resp => {
                console.log(resp)

                resolve(resp);
            }).catch(err => {
                reject(err)
            })
        })
    },

    deleteBuddyRelation: id => {
        return new Promise((resolve, reject) => {
            db.Buddy.destroy({
                where: {
                    id: id
                }
            }).then(resp => {
                console.log(resp)

                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    }


}