var db = require('../models')

module.exports = {

    // This method will create a new milestone in the database. The milestone parameter is an object that will be
    // constructed based off data from the req.body object and req.params.id 
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

    // This method will return all the milestones that a user owns
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

    // This method will return all the unfinished milestones that a user owns
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

    // This method will return all the finished milestones that a user owns
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
    },

    // This method will allow a user to update a particular column's data based on the 
    // milestone id that they pass in
    updateMilestone: (id, colName, info) => {
        return new Promise((resolve, reject) => {
            db.Milestones.update({
                [colName]: info
            }, {
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

    // This method will allow a user to delete a milestone from the database
    deleteMilestone: id => {
        return new Promise((resolve, reject) => {
            db.Milestones.destroy({
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