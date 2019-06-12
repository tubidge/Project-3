module.exports = function (sequelize, DataTypes) {
    var Milestone = sequelize.define('Milestones', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 100]
            }
        },

        frequency: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Never',
            validate: {
                notEmpty: true
            }

        },

        dueDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true,
                isDate: true
            }
        },

        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }

    });

    Milestone.associate = function (model) {
        Milestone.belongsTo(model.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Milestone.belongsTo(model.Goals, {
            foreignKey: {
                allowNull: false
            }
        })
    }


}