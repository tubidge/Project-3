const db = require("../models");

db.Buddy.bulkCreate([
  {
    duration: "1 week",
    buddyId: 2,
    buddyGoal: 2,
    UserId: 1,
    GoalId: 1
  },

  {
    duration: "1 week",
    buddyId: 4,
    buddyGoal: 13,
    UserId: 5,
    GoalId: 12
  },

  {
    duration: "1 week",
    buddyId: 6,
    buddyGoal: 15,
    UserId: 7,
    GoalId: 14
  }
]);

db.Buddy.bulkCreate([
  {
    duration: "1 week",
    buddyId: 4,
    buddyGoal: 5,
    UserId: 1,
    GoalId: 6
  }
]);
