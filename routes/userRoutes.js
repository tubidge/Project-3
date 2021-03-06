const user = require("../controller/userQueries");
const buddy = require("../controller/buddyQueries");
const helper = require("../utils/helperFunctions");

module.exports = app => {
  // This route will add a new user to the database
  app.post("/add/user", (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var profilePic = req.body.profilePic;

    user
      .addUser(firstName, lastName, username, email, password, profilePic)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // This route will return all users
  app.get("/all/users", (req, res) => {
    user
      .getAllUsers()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get("/all/username", (req, res) => {
    user
      .getAllUsername()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get("/user/basic/:username", (req, res) => {
    user
      .getBasicUserByUsername(req.params.username)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get("/user/basic/:email", (req, res) => {
    user
      .getBasicUserByEmail(req.params.email)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get("/all/username", (req, res) => {
    user
      .getAllUsername()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // This route will return a single user with their goals, milestones, and goal buddies
  app.get("/user/email/:email", (req, res) => {
    user
      .findUserByEmail(req.params.email)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // This route will return a single user with their goals, milestones, and goal buddies
  app.get("/user/:id", (req, res) => {
    user
      .findUser(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get("/basic/user/:id", (req, res) => {
    user
      .getBasicUser(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get("/user/email/basic/:email", (req, res) => {
    user
      .getBasicUserByEmail(req.params.email)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get("/user/goal/:id", (req, res) => {
    user
      .getUserByGoal(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get("/user/buddies/:id", (req, res) => {
    user
      .getBuddyComponent(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get("/goal/page/:email", (req, res) => {
    user
      .getGoalPageInfo(req.params.email)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // This route will update info on a user. The colName will dictate which column they are updating
  // the info is the data that will replace the current data in that column
  app.put("/user/:id", (req, res) => {
    let colName = req.body.data.colName;
    let info = req.body.data.info;
    user
      .updateUser(req.params.id, colName, info)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get("/user/buddies/:id", (req, res) => {
    user
      .getBuddyComponent(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });
};
