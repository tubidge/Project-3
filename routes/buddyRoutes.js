var buddy = require("../controller/buddyQueries");

module.exports = app => {
  // This route will get all the buddy relationships based on the user id that "owns" the relationship
  // app.get("/buddy/owner/:id", (req, res) => {
  //   buddy
  //     .getByOwner(req.params.id)
  //     .then(data => {
  //       res.send(data);
  //     })
  //     .catch(err => {
  //       res.send(err);
  //     });
  // });

  // This route will get all buddy relationships associated with a goal's id
  app.get("/buddy/goal/:id", (req, res) => {
    buddy
      .getByGoal(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // This route will get all buddy relationships that a user is associated on.
  app.get("/buddy/all/:id", (req, res) => {
    buddy
      .getAllBuddiesId(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // This route will return a single buddy relationship based on the row id.
  app.get("/buddy/:id", (req, res) => {
    buddy
      .getById(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // This route will add a new buddy relationship to the database. This relationship will be defaulted to active.
  app.post("/buddy/add", (req, res) => {
    const newBuddy = {
      duration: req.body.duration,
      buddyId: req.body.buddyId,
      GoalId: req.body.goalId,
      UserId: req.body.userId
    };

    buddy
      .addBuddyRelation(newBuddy)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // This route will update a particular column's info based on row id and column name.
  // I'm picturing this will mostly be used for setting the active status to false, but we could
  // potentially allow for user's to extend the time of the relationship
  app.put("/buddy/:id", (req, res) => {
    let colName = req.body.data.colName;
    let info = req.body.data.info;
    console.log(req.params.id);
    console.log(req.body);
    console.log(colName);
    console.log(info);
    buddy
      .updateBuddyRelation(req.params.id, colName, info)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // This route will delete a buddy relationship from the databased based off of id
  app.delete("/buddy/:id", (req, res) => {
    buddy
      .deleteBuddyRelation(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        res.send(err);
      });
  });
};
