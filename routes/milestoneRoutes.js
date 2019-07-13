const milestone = require("../controller/milestoneQueries");

module.exports = app => {
  // This route will add a new milestone to the database.
  // The req.body object needs to contain name, frequency, dueDate, GoalId, and UserId
  // It can also include notes, and a completed boolean (we shouldn't ever send a completed boolean tho)
  app.post("/add/milestone", (req, res) => {
    console.log(req.body);
    // const userMilestone = req.body.data;
    let userMilestone = {
      name: "Assess BMI",
      frequency: "Monthly",
      startDate: "2019-07-12",
      endDate: "2019-11-01",
      UserId: 1,
      GoalId: 1
    };
    milestone
      .configureMilestones(userMilestone)
      .then(data => {
        console.log("response data");
        console.log(data);
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // This route will get all milestones that a user owns
  // Note the req.params.id is the userId
  app.get("/all/milestones/:id", (req, res) => {
    milestone
      .getAllMilestones(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get("/milestone/range/:start/:end", (req, res) => {
    milestone
      .getDateRange(req.params.start, req.params.end, 1)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // This route will return a single milestone queried off of id
  app.get("/milestone/:id", (req, res) => {
    milestone
      .getMilestone(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // This route will update a milestone selected off of id.
  // It will update the info for the column name that is passed in
  app.put("/milestone/:id", (req, res) => {
    let colName = req.body.data.colName;
    let info = req.body.data.info;
    console.log(req.body);

    milestone
      .updateMilestone(req.params.id, colName, info)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.catch(err);
      });
  });

  // This route will delete a milestone selected off id
  app.delete("/milestone/:id", (req, res) => {
    milestone
      .deleteMilestone(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });
};
