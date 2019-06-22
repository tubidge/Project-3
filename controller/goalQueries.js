var db = require('../models');

module.exports = {
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

    getAllGoals: userId => {
        return new Promise((resolve, reject) => {
            db.Goals.findAll({
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

    unfinishedGoals: userId => {
        return new Promise((resolve, reject) => {
            db.Goals.findAll({
                where: {
                    UserId: userId,
                    complete: false
                }
            }).then(resp => {
                console.log(resp)

                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },

    finishedGoals: userId => {
        return new Promise((resolve, reject) => {
            db.Goals.findAll({
                where: {
                    UserId: userId,
                    complete: true
                }
            }).then(resp => {
                console.log(resp)
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },

    privateGoals: userId => {
        return new Promise((resolve, reject) => {
            db.Goals.findAll({
                where: {
                    UserId: userId,
                    private: true
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