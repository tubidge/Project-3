const goal = require("../controller/goalQueries");

module.exports = app => {
  // This route will add a new goal for a user.
  // The req.body object needs to have name, category, dueDate, and UserId
  // It can also have a description, and private
  app.post("/add/goal", (req, res) => {
    const userGoal = req.body;
    goal
      .addGoal(userGoal)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // This route will return all the goals of a user
  // note the req.params.id is the userId
  app.get("/all/goals/:id", (req, res) => {
    goal
      .getAllGoals(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get("/goal/search/:id/:search", (req, res) => {
    goal
      .searchGoalName(req.params.id, req.params.search)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // This route will return a single goal based on the goal id
  app.get("/goal/:id", (req, res) => {
    console.log("running");
    console.log(req.params.id);
    goal
      .getGoal(req.params.id)
      .then(data => {
        console.log("goal response");
        console.log(data);
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get("/goal/basic/:id", (req, res) => {
    goal
      .getBasicGoal(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get("/goal/category/:id/:category", (req, res) => {
    goal
      .getCategoryGoals(req.params.id, req.params.category)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // // This route will return all the unfinished goals of a user
  // // note the req.params.id is the userId
  // app.get('/unfinished/goals/:id', (req, res) => {
  //     goal.unfinishedGoals(req.params.id).then(data => {
  //         res.send(data)
  //     }).catch(err => {
  //         res.send(err)
  //     })
  // });

  // This route will return all the finished goals of a user
  // note the req.params.id is the userId
  // app.get('/finished/goals/:id', (req, res) => {
  //     goal.finishedGoals(req.params.id).then(data => {
  //         res.send(data)
  //     }).catch(err => {
  //         res.send(err)
  //     })
  // });

  // This route will return all the private goals of a user
  app.get("/private/goals/:id", (req, res) => {
    goal
      .privateGoals(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // This route will select a goal by id from the database and then update
  // a particular column's info
  app.put("/goal/update/:id", (req, res) => {
    let colName = "complete";
    let info = true;
    goal
      .updateGoal(req.params.id, colName, info)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // This route will delete a goal from the databased
  app.delete("/goal/:id", (req, res) => {
    goal
      .deleteGoal(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });
};
