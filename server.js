const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

const PORT = process.env.PORT || 3001;
const db = require("./models");

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(fileUpload());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Upload Endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

require("./routes/userRoutes")(app);
require("./routes/goalRoutes")(app);
require("./routes/milestoneRoutes")(app);
require("./routes/buddyRoutes")(app);
require("./routes/messageRoutes")(app);

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
