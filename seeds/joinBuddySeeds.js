const db = require("../models");

db.Buddy.bulkCreate([
  {
    duration: "1 week",
    buddyId: 2,
    UserId: 1,
    GoalId: 1
  },

  {
    duration: "1 week",
    buddyId: 1,
    UserId: 2,
    GoalId: 2
  },

  {
    duration: "1 week",
    buddyId: 4,
    UserId: 5,
    GoalId: 12
  },

  {
    duration: "1 week",
    buddyId: 5,
    UserId: 4,
    GoalId: 13
  },

  {
    duration: "1 week",
    buddyId: 6,
    UserId: 7,
    GoalId: 14
  },

  {
    duration: "1 week",
    buddyId: 7,
    UserId: 6,
    GoalId: 15
  }
]);
