module.exports = (sequelize, DataTypes) => {
    var BuddyGoal = sequelize.define("BuddyGoal", {
        duration: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "One Week",
            validate: {
                notEmpty: true
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            validate: {
                notEmpty: true
            }
        }
    });

    BuddyGoal.associate = model => {
        BuddyGoal.belongsTo(model.User, {
            foreignKey: {
                allowNull: false
            }
        });
        BuddyGoal.belongsTo(model.BuddyOne, {
            foreignKey: {
                allowNull: true
            }
        })
        BuddyGoal.belongsTo(model.BuddyTwo, {
            foreignKey: {
                allowNull: true
            }
        });
        BuddyGoal.belongsTo(model.BuddyThree, {
            foreignKey: {
                allowNull: true
            }
        });
        BuddyGoal.belongsTo(model.BuddyFour, {
            foreignKey: {
                allowNull: true
            }
        });
        BuddyGoal.belongsTo(model.BuddyFive, {
            foreignKey: {
                allowNull: true
            }
        })
    };

    return BuddyGoal;
};