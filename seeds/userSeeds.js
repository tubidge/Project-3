var db = require("../models");

db.User.bulkCreate([
  {
    firstName: "J.",
    lastName: "Cole",
    username: "dreamville1",
    email: "coleworld1@me.com"
  },
  {
    firstName: "Arian",
    lastName: "Foster",
    username: "foster12",
    email: "arianfoster@me.com",
    password: "enter123"
  },
  {
    firstName: "Tyson",
    lastName: "Rodgers",
    username: "bmx123",
    email: "tyso@me.com",
    password: "enter123"
  },
  {
    firstName: "Josh",
    lastName: "Jacobsen",
    username: "joshrocks500",
    email: "joshrocks@me.com",
    password: "enter123"
  },
  {
    firstName: "John",
    lastName: "Doe",
    username: "jdoe1234",
    email: "jdoe1234@me.com",
    password: "enter123"
  },
  {
    firstName: "Bobby",
    lastName: "Feeno",
    username: "podGawd12",
    email: "feeno12@me.com",
    password: "enter123"
  },
  {
    firstName: "Mike",
    lastName: "Trought",
    username: "mikey123",
    email: "miek@me.com",
    password: "enter123"
  },
  {
    firstName: "Yoseph",
    lastName: "Smith",
    username: "yoyo1234",
    email: "brosmith1@me.com",
    password: "enter123"
  },
  {
    firstName: "Jesus",
    lastName: "Christ",
    username: "sonofgod2",
    email: "holyshepard1@me.com",
    password: "enter123"
  }
]);
