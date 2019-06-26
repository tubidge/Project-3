const message = require("../controller/messageQueries");
const moment = require("moment");

module.exports = app => {
  // This route will return all of the users that this particular user has messages with.
  //   I was thinking you can hit this route when we are displaying the messages page

  app.get("/messages/users/:id", (req, res) => {
    message
      .getUsers(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      });
  });

  app.get("/messages/:id/:friend", (req, res) => {
    console.log(req.params.id);
    console.log(req.params.friend);
    message
      .getUserMessages(req.params.id, req.params.friend)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get("/messages/buddy/:id", (req, res) => {
    message
      .getBuddyMessages(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.post("/message", (req, res) => {
    // let userMessage = req.body.message;
    // let sentBy = req.body.sentBy;
    // let sentTo = req.body.sentTo;
    // let buddyId = req.body.buddyId;
    let userMessage = "Yoyo";
    let sentBy = 1;
    let sentTo = 2;
    let buddyId = 1;

    message
      .sendMessage(userMessage, sentBy, sentTo, buddyId)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  });
};
