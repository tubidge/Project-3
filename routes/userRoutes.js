const user = require("../controller/userQueries");
const buddy = require("../controller/buddyQueries");
const helper = require("../utils/helperFunctions");

module.exports = app => {
  // This route will add a new user to the database
  // app.post("/add/user", (req, res) => {
  //   var firstName = req.body.firstName;
  //   var lastName = req.body.lastName;
  //   var username = req.body.username;
  //   var email = req.body.email;
  //   var password = req.body.password;
  //   var profilePic = req.body.profilePic;

  //   user
  //     .addUser(firstName, lastName, username, email, password, profilePic)
  //     .then(data => {
  //       res.send(data);
  //     })
  //     .catch(err => {
  //       res.send(err);
  //     });
  // });

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

  // This route will return a single user with their goals, milestones, and goal buddies
  // app.get("/user/:id", (req, res) => {
  //   user
  //     .findUser(req.params.id)
  //     .then(data => {
  //       res.send(data);
  //     })
  //     .catch(err => {
  //       res.send(err);
  //     });
  // });

  // // This route will update info on a user. The colName will dictate which column they are updating
  // // the info is the data that will replace the current data in that column
  // app.put("/user/:id", (req, res) => {
  //   // let colName = req.body.colName;
  //   // let info = req.body.info;
  //   let colName = "email";
  //   let info = "coleworld1@me.com";

  //   user
  //     .updateUser(req.params.id, colName, info)
  //     .then(data => {
  //       res.send(data);
  //     })
  //     .catch(err => {
  //       res.send(err);
  //     });
  // });
};
