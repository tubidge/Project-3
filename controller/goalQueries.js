var db = require('../models');

module.exports = {

    // This method will add a goal to the database. The goal parameter is an object that will be constructed 
    // from the req.body data sent from the frontend
    addGoal: (goal) => {
        return new Promise((resolve, reject) => {
            db.Goals.create(goal).then(resp => {
                console.log(resp)

                resolve(resp)
            }).catch(err => {
                reject(err)
            })


        })
    },

    // This method takes in the userId and will return all of the goals, associated milestones, and buddies that have joined each goal
    // This method also sorts the goals into finished and unfinished categories
    getAllGoals: userId => {
        return new Promise((resolve, reject) => {
            db.Goals.findAll({
                where: {
                    UserId: userId
                },
                include: [db.Milestones, db.Buddy]
            }).then(resp => {
                console.log(resp)


                resolve(resp)
            }).catch(err => {
                reject(err)
            })

        })
    },

    // This method will return all the unfinished goals that a user owns. 
    unfinishedGoals: userId => {
        return new Promise((resolve, reject) => {
            db.Goals.findAll({
                where: {
                    UserId: userId,
                    complete: false
                },
                include: [db.Milestones, db.Buddy]
            }).then(resp => {
                console.log(resp)

                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },

    // This method will return all the finished goals a user owns.
    finishedGoals: userId => {
        return new Promise((resolve, reject) => {
            db.Goals.findAll({
                where: {
                    UserId: userId,
                    complete: true
                },
                include: [db.Milestones, db.Buddy]
            }).then(resp => {
                console.log(resp)
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },

    // This method will return any goals and associated milestones that the user has marked as private.
    privateGoals: userId => {
        return new Promise((resolve, reject) => {
            db.Goals.findAll({
                where: {
                    UserId: userId,
                    private: true
                },
                include: [db.Milestones]
            }).then(resp => {
                console.log(resp)
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },

    // This method will allow a user to edit info on a particular goal. 
    updateGoal: (id, colName, info) => {
        return new Promise((resolve, reject) => {
            db.Goals.update({
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

    // This method will delete a goal from the database selected by id
    deleteGoal: id => {
        return new Promise((resolve, reject) => {
            db.Goals.destroy({
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