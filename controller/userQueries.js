var db = require('../models')

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

    // This method will return a single user with their goals and milestones
    findUser: id => {
        return new Promise((resolve, reject) => {
            db.User.findAll({
                where: {
                    id: id
                },
                include: [db.Goals, db.Milestones]
            }).then(resp => {
                console.log(resp)

                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    }






}