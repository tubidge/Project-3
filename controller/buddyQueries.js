var db = require('../models');

module.exports = {

    // This id is the buddyId. This method will return all active buddy goal relationships that this id is associated with
    getBuddyId: id => {
        return new Promise((resolve, reject) => {
            db.Buddy.findAll({
                where: {
                    buddyId: id,
                    active: 1
                }
            }).then(resp => {
                console.log(resp)

                resolve(resp)
            }).catch(err => {
                reject(err)
            })

        })
    },

    // This id is the row id. This method will return a single buddy relationship
    getById: id => {
        return new Promise((resolve, reject) => {
            db.Buddy.findAll({
                where: {
                    id: id,
                    active: 1
                }
            }).then(resp => {
                console.log(resp)

                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },

    // This id is the id of the Owner/UserId. This method will return all active buddy relationships that this user "owns"
    getByOwner: id => {
        return new Promise((resolve, reject) => {
            db.Buddy.findAll({
                where: {
                    UserId: id,
                    active: 1
                }
            }).then(resp => {
                console.log(resp)

                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },

    // This id is the GoalId. This method will return all active buddy relationships that are linked to this goal
    getByGoal: id => {
        return new Promise((resolve, reject) => {
            db.Buddy.findAll({
                where: {
                    GoalId: id,
                    active: 1
                }
            }).then(resp => {
                console.log(resp)

                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },

    // This method will add a new buddy relationship to the database. The newBuddy parameter is an object that will be constructed off
    // the req.body that is passed from the frontend
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

    // This method will take the id of a buddy relationship and delete it from the database
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