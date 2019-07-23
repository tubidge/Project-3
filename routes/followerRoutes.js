const follower = require("../controller/followerQueries");

module.exports = app => {
  app.post("/follower", (req, res) => {
    let data = {
      follower: 2,
      GoalId: 6
    };

    follower
      .addFollower(data)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get("/followers/:id", (req, res) => {
    follower
      .getFollowers(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get("/following/:id", (req, res) => {
    follower
      .getFollowing(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.put("/followers/:id", (req, res) => {
    let colName = req.body.data.colName;
    let info = req.body.data.info;

    follower
      .editFollowerRel(req.params.id, colName, info)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.delete("/follower/:id", (req, res) => {
    follower
      .deleteFollowerRel(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });
};
