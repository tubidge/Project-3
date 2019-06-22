var db = require("../models");

db.BuddyGoal.bulkCreate([{
        duration: '1 week',
        UserId: 1,
        BuddyOneId: 1
    },
    {
        duration: '3 days',
        UserId: 7,
        BuddyOneId: 2
    },
    {
        duration: '1 week',
        UserId: 4,
        BuddyOneId: 3

    },
    {
        duration: '1 day',
        UserId: 2,
        BuddyTwoId: 1

    },
    {
        duration: '1 week',
        UserId: 1,
        BuddyTwoId: 2
    },
    {
        duration: '1 week',
        UserId: 5,
        BuddyTwoId: 3
    },
    {
        duration: '1 week',
        UserId: 7,
        BuddyTwoId: 4
    },
    {
        duration: '2 weeks',
        UserId: 2,
        BuddyThreeId: 1
    },
    {
        duration: '1 week',
        UserId: 1,
        BuddyThreeId: 2
    },
    {
        duration: '3 days',
        UserId: 3,
        BuddyThreeId: 3
    }
])