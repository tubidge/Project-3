module.exports = (sequelize, DataTypes) => {
    const BuddyOne = sequelize.define('BuddyOne', {


    });

    BuddyOne.associate = model => {
        BuddyOne.hasMany(model.User, {

        });
        BuddyOne.hasMany(model.BuddyGoal, {
            onDelete: 'cascade'
        })

    }

    return BuddyOne;
}