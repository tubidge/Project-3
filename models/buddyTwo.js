module.exports = (sequelize, DataTypes) => {
    const BuddyTwo = sequelize.define('BuddyTwo', {


    });

    BuddyTwo.associate = model => {
        BuddyTwo.hasMany(model.User, {

        });
        BuddyTwo.hasMany(model.BuddyGoal, {
            onDelete: 'cascade'
        })

    }

    return BuddyTwo;
}