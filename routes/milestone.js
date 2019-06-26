var milestone = require("../controller/milestoneQueries");

module.exports = app => {
  app.post("/add/milestone", (req, res) => {
    var userMilestone = req.body;
    milestone
      .addMilestone(userMilestone)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get("/unfinished/milestones/:id", (req, res) => {
    milestone
      .unfinishedMilestones(req.params.id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get("/finished/milestones/:id", (req, res) => {
    milestone
      .finishedMilestones(req.params.id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.send(err);
      });
  });
};
