var goal = require('../controller/goalQueries');

module.exports = app => {

    // This route will add a new goal for a user.
    // The req.body object needs to have name, category, dueDate, and userId
    // It can also have a description, and private
    app.post('/add/goal', (req, res) => {
        var userGoal = req.body;
        goal.addGoal(userGoal).then(resp => {
            res.json(resp)
        }).catch(err => {
            res.send(err)
        })
    });

    // This route will return all the goals of a user
    // note the req.params.id is the userId
    app.get('/all/goals/:id', (req, res) => {
        goal.getAllGoals(req.params.id).then(data => {
            res.json(data)
        }).catch(err => {
            res.json(err)
        })
    });

    // This route will return all the unfinished goals of a user
    // note the req.params.id is the userId
    app.get('/unfinished/goals/:id', (req, res) => {
        goal.unfinishedGoals(req.params.id).then(data => {
            res.json(data)
        }).catch(err => {
            res.send(err)
        })
    });

    // This route will return all the finished goals of a user
    // note the req.params.id is the userId
    app.get('/finished/goals/:id', (req, res) => {
        goal.finishedGoals(req.params.id).then(data => {
            res.json(data)
        }).catch(err => {
            res.send(err)
        })
    });

    // This route will return all the private goals of a user
    app.get('/private/goals/:id', (req, res) => {
        goal.privateGoals(req.params.id).then(data => {
            res.json(data)
        }).catch(err => {
            res.send(err)
        })

    });


}