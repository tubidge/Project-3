module.exports = (sequelize, DataTypes) => {
    const BuddyFour = sequelize.define('BuddyFour', {


    });

    BuddyFour.associate = model => {
        BuddyFour.hasMany(model.User, {

        });
        BuddyFour.hasMany(model.BuddyGoal, {
            onDelete: 'cascade'
        })

    }

    return BuddyFour;
}