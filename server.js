const express = require("express");
var path = require("path");
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

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "/client/public/index.html"), function(
    err
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

require("./routes/userRoutes")(app);
require("./routes/goalRoutes")(app);
require("./routes/milestoneRoutes")(app);
require("./routes/buddyRoutes")(app);
require("./routes/messageRoutes")(app);
require("./routes/followerRoutes")(app);

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
