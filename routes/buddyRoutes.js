var buddy = require('../controller/buddyQueries');

module.exports = app => {

    app.get('/buddy/goals/:id', (req, res) => {
        buddy.getBuddyGoalOwner(req.params.id).then(data => {
            res.json(data)
        }).catch(err => {
            res.send(err)
        })
    })



}