var db = require('../models')

module.exports = {

    addMilestone: milestone => {
        return new Promise((resolve, reject) => {
            db.Milestones.create(milestone).then(resp => {
                console.log(resp);

                resolve(resp);
            }).catch(err => {
                reject(err)
            })

        })
    },

    getAllMilestones: userId => {
        return new Promise((resolve, reject) => {
            db.Milestones.findAll({
                where: {
                    UserId: userId
                }
            }).then(resp => {
                console.log(resp)

                resolve(resp)
            }).catch(err => {
                reject(err)
            })

        })
    },

    unfinishedMilestones: userId => {
        return new Promise((resolve, reject) => {
            db.Milestones.findAll({
                where: {
                    UserId: userId,
                    completed: false
                }
            }).then(resp => {
                console.log(resp)

                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },

    finishedMilestones: userId => {
        return new Promise((resolve, reject) => {
            db.Milestones.findAll({
                where: {
                    UserId: userId,
                    completed: true
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