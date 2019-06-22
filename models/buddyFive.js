module.exports = (sequelize, DataTypes) => {
    const BuddyFive = sequelize.define('BuddyFive', {


    });

    BuddyFive.associate = model => {
        BuddyFive.hasMany(model.User, {

        });
        BuddyFive.hasMany(model.BuddyGoal, {
            onDelete: 'cascade'
        })

    }

    return BuddyFive;
}