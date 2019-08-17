const cron = require("node-schedule");
const moment = require("moment");
const queries = require("./queries");

module.exports = {
  asyncForEach: async function(array, callback) {
    for (let index = 0; index < array.length; index++) {
      console.log("running");

      await callback(array[index], index, array);
    }
  },

  // ! isLoggedIn middleware
  isLoggedIn: function(req, res, next) {
    let array = req.url.split("/");
    let tripId = array[array.length - 1];

    console.log(tripId);

    if (req.isAuthenticated()) return next();
    res.redirect("/login" + "?tripId=" + tripId);
  },

  createChronJob: (date, milestoneId) => {
    let reminder = new Date(date);

    cron.scheduleJob(reminder, () => {
      console.log("==================");
      console.log("Successful ChronJob");
      queries.getMilestoneNotifications(milestoneId);
    });
  }
};
