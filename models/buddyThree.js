module.exports = (sequelize, DataTypes) => {
    const BuddyThree = sequelize.define('BuddyThree', {


    });

    BuddyThree.associate = model => {
        BuddyThree.hasMany(model.User, {

        });
        BuddyThree.hasMany(model.BuddyGoal, {
            onDelete: 'cascade'
        })

    }

    return BuddyThree;
}