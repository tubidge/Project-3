const milestone = require("../controller/milestoneQueries");
const notifications = require("../controller/notificationQueries");
module.exports = app => {
  // This route will add a new milestone to the database.
  // The req.body object needs to contain name, frequency, dueDate, GoalId, and UserId
  // It can also include notes, and a completed boolean (we shouldn't ever send a completed boolean tho)
  app.post("/add/milestone", (req, res) => {
    console.log(req.body.data);
    const userMilestone = req.body.data;
    // let userMilestone = {
    //   name: "2 hour workout",
    //   frequency: "Weekly",
    //   startDate: "2019-08-12",
    //   endDate: "2019-08-30",
    //   UserId: 1,
    //   GoalId: 3
    // };
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

  // This route will create a reminder notification for a specific milestone. The object needs to include the MilestoneId and the UserId
  app.post("/milestone/reminder", (req, res) => {
    let reminder = req.body.data;
    notifications
      .addMilestoneReminder(reminder)
      .then(data => {
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

  app.get("/milestone/frequency/:id/:freq", (req, res) => {
    milestone
      .getMilestoneByFreq(req.params.id, req.params.freq)
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

  app.get("/milestone/date/:id/:date", (req, res) => {
    milestone
      .getDate(req.params.id, req.params.date)
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
    // let colName = req.body.data.colName;
    // let info = req.body.data.info;

    let colName = "completed";
    let info = true;
    milestone
      .updateMilestone(req.params.id, colName, info)
      .then(data => {
        console.log(data);
        res.send(data);
      })
      .catch(err => {
        res.send(err);
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

  app.delete("/milestone/:id/:name/:freq", (req, res) => {
    milestone
      .deleteFrequency(req.params.id, req.params.name, req.params.freq)
      .then(data => {
        res.send(`${data} milestones deleted`);
      })
      .catch(err => {
        res.send(err);
      });
  });
};
