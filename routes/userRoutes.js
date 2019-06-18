const user = require('../controller/userQueries');
const buddy = require('../controller/buddyQueries');
const helper = require('../utils/helperFunctions')

module.exports = app => {

    // This route will add a new user to the database

    app.post('/add/user', (req, res) => {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        user.addUser(firstName, lastName, username, email, password).then(data => {
            console.log(data)
            res.json(data)
        }).catch(err => {
            res.send(err)
        })


    });

    // This route will return all users
    app.get('/all/users', (req, res) => {
        user.getAllUsers().then(data => {
            res.json(data)
        }).catch(err => {
            res.send(err)
        })
    });

    app.get('/user/:id', (req, res) => {
        user.findUser(req.params.id).then(data => {

            res.json(data)
        }).catch(err => {
            res.send(err)
        })
    })





}