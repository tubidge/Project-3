var db = require("../models");

db.Goals.bulkCreate([
  {
    name: "Lose 25 lbs",
    category: "Fitness",
    dueDate: "2019-07-25",
    UserId: 1
  },

  {
    name: "Lose 15 lbs",
    category: "Fitness",
    dueDate: "2019-07-15",
    UserId: 2
  },

  {
    name: "Finish a book every week",
    category: "Education",
    dueDate: "2019-09-01",
    UserId: 1
  },

  {
    name: "Put 1500$ into savings",
    category: "Financial",
    dueDate: "2019-08-28",
    UserId: 5
  },

  {
    name: "Participate in Olympic distance triathalon",
    category: "Fitness",
    dueDate: "2019-07-30",
    UserId: 4
  },

  {
    name: "Learn Muay Thai",
    category: "Fitness",
    dueDate: "2020-01-01",
    UserId: 1
  },

  {
    name: "Get down to single digit body fat %",
    category: "Fitness",
    dueDate: "2019-10-01",
    UserId: 6
  },

  {
    name: "Have zero personal debt",
    category: "Financial",
    dueDate: "2019-08-20",
    UserId: 3
  },

  {
    name: "Have 10,000$ in savings",
    category: "Financial",
    dueDate: "2020-02-05",
    UserId: 6
  },

  {
    name: "Learn Spanish fluently",
    category: "Education",
    dueDate: "2020-01-10",
    UserId: 8
  },

  {
    name: "Interview 100 inspirational people",
    category: "Education",
    dueDate: "2020-02-10",
    UserId: 9
  },

  {
    name: "Write a full-length book",
    category: "Education",
    dueDate: "2020-01-01",
    UserId: 5
  },

  {
    name: "Create an online course",
    category: "Education",
    dueDate: "2020-03-01",
    UserId: 4
  },

  {
    name: "Participate in a 10 day meditation retreat",
    category: "Wellness",
    dueDate: "2019-09-20",
    UserId: 7
  },

  {
    name: "60 days of meditation",
    category: "Wellness",
    dueDate: "2019-08-20",
    UserId: 6
  },

  {
    name: "30 days of helping others",
    category: "Wellness",
    dueDate: "2019-10-02",
    UserId: 9
  },

  {
    name: "Travel throughout Australia",
    category: "Travel",
    dueDate: "2020-10-02",
    UserId: 3
  }
]);
