const requestQueries = require("../controller/requestQueries");

module.exports = app => {
  app.post("/request", (req, res) => {
    // let request = req.body.data;
    let request = {
      duration: "2 weeks",
      message: "I would love to join your goal and be a part of your journey",
      buddyId: 3,
      buddyGoal: 17,
      GoalId: 3,
      UserId: 1
    };
    requestQueries
      .addRequest(request)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.delete("/request/:id", (req, res) => {
    requestQueries
      .deleteRequest(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });
};
