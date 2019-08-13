module.exports = (sequelize, DataTypes) => {
  const Requests = sequelize.define("Requests", {
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notEmpty: true
      }
    },

    message: {
      type: DataTypes.STRING,
      allowNull: true,
      validation: {
        len: [1, 255]
      }
    },

    buddyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validation: {
        isNumeric: true,
        not: ["[a-z]", "i"]
      }
    },

    buddyGoal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validation: {
        isNumeric: true,
        not: ["[a-z]", "i"]
      }
    }
  });

  Requests.associate = model => {
    Requests.belongsTo(model.Goals, {
      foreignKey: {
        allowNull: false
      }
    });
    Requests.belongsTo(model.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Requests.hasMany(model.Notifications, {
      onDelete: "cascade"
    });
  };
  return Requests;
};
