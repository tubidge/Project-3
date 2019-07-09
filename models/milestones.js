module.exports = function(sequelize, DataTypes) {
  var Milestone = sequelize.define("Milestones", {
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
      defaultValue: "Never",
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

    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true
      }
    },

    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true
      }
    },

    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [2, 300]
      }
    }
  });

  Milestone.associate = function(model) {
    Milestone.belongsTo(model.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Milestone.belongsTo(model.Goals, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Milestone;
};
