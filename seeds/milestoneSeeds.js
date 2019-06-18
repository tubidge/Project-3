var db = require('../models');

db.Milestones.bulkCreate([{
        name: '1 hour workout',
        frequency: 'Daily',
        dueDate: '2019-06-15',
        UserId: 1,
        GoalId: 1,
    },

    {
        name: '2500 Calories per day',
        frequency: 'Daily',
        dueDate: '2019-06-15',
        UserId: 1,
        GoalId: 1,
    },

    {
        name: 'Cardio',
        frequency: 'Twice per week',
        dueDate: '2019-06-15',
        UserId: 1,
        GoalId: 1,
    },

    {
        name: 'Read 1 hour',
        frequency: 'Daily',
        dueDate: '2019-09-01',
        UserId: 1,
        GoalId: 3,
    },

    {
        name: 'Take Muay Thai Class 3x per week',
        frequency: '3x per week',
        dueDate: '2020-01-01',
        UserId: 1,
        GoalId: 6,
    },

    {
        name: '30 Minute Cardio',
        frequency: 'Daily',
        dueDate: '2019-07-15',
        UserId: 2,
        GoalId: 2,
    },

    {
        name: 'Eat Clean. No sugar',
        frequency: 'Daily',
        dueDate: '2019-07-15',
        UserId: 2,
        GoalId: 2
    },

    {
        name: 'Take 100$ from each paycheck and put towards debt',
        frequency: 'Weekly',
        dueDate: '2019-08-10',
        UserId: 3,
        GoalId: 8,
    },

    {
        name: 'Take 50$ from each paycheck and put it in savings',
        frequency: 'Weekly',
        dueDate: '2020-07-10',
        UserId: 3,
        GoalId: 17,
    },

    {
        name: 'Plan a trip itinerary for Australia trip',
        dueDate: '2020-07-15',
        UserId: 3,
        GoalId: 17,
    }
])