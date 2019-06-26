const db = require("../models");

db.Message.create({
  message: "Hey whats up man?",
  sentBy: 1,
  sentTo: 4,
  BuddyId: 4
});

setTimeout(() => {
  db.Message.create({
    message: "not much dude. How goes your goal?",
    sentBy: 4,
    sentTo: 1,
    BuddyId: 6
  });
}, 1000);
setTimeout(() => {
  db.Message.create({
    message: "good dude. I wish I had a buddy that was more accountable tho",
    sentBy: 1,
    sentTo: 4,
    BuddyId: 4
  });
}, 1500);

setTimeout(() => {
  db.Message.create({
    message: "You bastard. I should report you",
    sentBy: 4,
    sentTo: 1,
    BuddyId: 6
  });
}, 2000);
setTimeout(() => {
  db.Message.create({
    message: "Take a joke dude",
    sentBy: 1,
    sentTo: 4,
    BuddyId: 4
  });
}, 2500);
setTimeout(() => {
  db.Message.create({
    message: "Your mom's a joke",
    sentBy: 4,
    sentTo: 1,
    BuddyId: 6
  });
}, 3000);
