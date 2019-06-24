var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
var db = require("./models");

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

app.use(express.static("public"));

require("./routes/userRoutes")(app);
require("./routes/goalRoutes")(app);
require("./routes/milestoneRoutes")(app);
require("./routes/buddyRoutes")(app);
require("./routes/messageRoutes")(app);

var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

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
