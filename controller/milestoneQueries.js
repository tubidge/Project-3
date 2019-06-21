const db = require('../models')
const moment = require('moment')

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
                const results = {
                    completed: [],
                    incomplete: []
                }
                resp.forEach(index => {
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
                        results.completed.push(milestone)
                    } else {
                        results.incomplete.push(milestone)
                    }
                })

                resolve(results)
            }).catch(err => {
                reject(err)
            })

        })
    },

    // This method will return a single milestone selected off id
    getMilestone: id => {
        return new Promise((resolve, reject) => {
            db.Milestones.findAll({
                where: {
                    id: id
                }
            }).then(resp => {
                console.log(resp)
                const milestone = {
                    id: resp[0].dataValues.id,
                    name: resp[0].dataValues.name,
                    frequency: resp[0].dataValues.frequency,
                    dueDate: moment(resp[0].dataValues.dueDate).add('1', 'day').format('YYYY-MM-DD'),
                    completed: resp[0].dataValues.completed,
                    notes: resp[0].dataValues.notes,
                    goalId: resp[0].dataValues.GoalId,
                    userId: resp[0].dataValues.UserId
                }
                resolve(milestone)
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
    },

    // This method will allow a user to delete a milestone from the database
    deleteMilestone: id => {
        return new Promise((resolve, reject) => {
            db.Milestones.destroy({
                where: {
                    id: id
                }
            }).then(resp => {
                let results;
                if (resp == 1) {
                    results = 'Buddy relation deleted'
                } else {
                    results = 'Error in deleteing relation'
                }

                resolve(results)
            }).catch(err => {

                reject(err)
            })
        })
    }


}