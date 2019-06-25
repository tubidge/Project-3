const express = require("express");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./models");

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api/users", (req, res) => {
  db.User.findAll({
    include: [db.Goals, db.Milestones]
  })
    .then(resp => {
      console.log("this is the result");
      console.log(resp);
      res.json(resp);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/user/:id", (req, res) => {
  return new Promise((resolve, reject) => {
    db.User.findAll({
      where: {
        id: id
      },
      include: [db.Goals, db.Milestones]
    })
      .then(resp => {
        console.log("query");
        console.log(resp[0].dataValues.firstName);
        const data = resp[0].dataValues;
        const user = {
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          email: data.email,
          buddies: [
            {
              buddy: {
                buddyNum: "buddyOne",
                id: data.BuddyOneId
              }
            },
            {
              buddy: {
                buddyNum: "buddyTwo",
                id: data.BuddyTwoId
              }
            },
            {
              buddy: {
                buddyNum: "buddyThree",
                id: data.BuddyThreeId
              }
            },
            {
              buddy: {
                buddyNum: "buddyFour",
                id: data.BuddyFourId
              }
            },
            {
              buddy: {
                buddyNum: "buddyFive",
                id: data.BuddyFiveId
              }
            }
          ],
          goals: data.Goals,
          milestones: data.Milestones
        };

        const getBuddies = () => {
          helper
            .asyncForEach(user.buddies, async buddy => {
              switch (buddy.buddy.buddyNum) {
                case "buddyOne":
                  if (buddy.buddy.id === null) {
                    user.buddies[0].buddy.users = null;
                    user.buddies[0].buddy.buddyGoals = null;
                    return false;
                  } else {
                    await buddyQuery
                      .getBuddyOneGoal(buddy.buddy.id)
                      .then(resp => {
                        user.buddies[0].buddy.users = resp[0].dataValues.Users;
                        user.buddies[0].buddy.buddyGoals =
                          resp[0].dataValues.BuddyGoals;
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }

                  break;
                case "buddyTwo":
                  if (buddy.buddy.id === null) {
                    user.buddies[1].buddy.users = null;
                    user.buddies[1].buddy.buddyGoals = null;
                    return false;
                  } else {
                    await buddyQuery
                      .getBuddyTwoGoal(buddy.buddy.id)
                      .then(resp => {
                        user.buddies[1].buddy.users = resp[0].dataValues.Users;
                        user.buddies[1].buddy.buddyGoals =
                          resp[0].dataValues.BuddyGoals;
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }
                  break;
                case "buddyThree":
                  if (buddy.buddy.id === null) {
                    user.buddies[2].buddy.users = null;
                    user.buddies[2].buddy.buddyGoals = null;
                    return false;
                  } else {
                    await buddyQuery
                      .getBuddyGoalThree(buddy.buddy.id)
                      .then(resp => {
                        user.buddies[2].buddy.users = resp[0].dataValues.Users;
                        user.buddies[2].buddy.buddyGoals =
                          resp[0].dataValues.BuddyGoals;

                        console.log(user.buddies);
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }
                  break;
                case "buddyFour":
                  if (buddy.buddy.id === null) {
                    user.buddies[3].buddy.users = null;
                    user.buddies[3].buddy.buddyGoals = null;
                    return false;
                  } else {
                    await buddyQuery
                      .getBuddyGoalFour(buddy.buddy.id)
                      .then(resp => {
                        user.buddies[3].buddy.users = resp[0].dataValues.Users;
                        user.buddies[3].buddy.buddyGoals =
                          resp[0].dataValues.BuddyGoals;
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }
                  break;
                case "buddyFive":
                  if (buddy.buddy.id === null) {
                    user.buddies[4].buddy.users = null;
                    user.buddies[4].buddy.buddyGoals = null;
                    return false;
                  } else {
                    await buddyQuery
                      .getBuddyGoalFive(buddy.buddy.id)
                      .then(resp => {
                        user.buddies[4].buddy.users = resp[0].dataValues.Users;
                        user.buddies[4].buddy.buddyGoals =
                          resp[0].dataValues.BuddyGoals;
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }
                  break;
              }
            })
            .then(() => {
              res.json(resp);
              resolve(user);
            });
        };
        getBuddies();
      })
      .catch(err => {
        reject(err);
      });
  });
});

// Add routes, both API and view
app.use(routes);

const syncOptions = {
  force: false
};

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
