module.exports = function(sequelize, DataTypes) {
  var Goal = sequelize.define("Goals", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 45]
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: ["^[a-z]+$", "i"]
      }
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true
        // May want to add validation here to only allow a dueDate set in the future
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [2, 255]
      }
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  Goal.associate = function(model) {
    Goal.belongsTo(model.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Goal.hasMany(model.Milestones, {
      onDelete: "cascade"
    });
    Goal.hasMany(model.Buddy, {
      onDelete: "cascade"
    });
  };
  return Goal;
};
