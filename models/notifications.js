module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define("Notifications", {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true
      }
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    sendTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true
      }
    }
  });

  Notifications.associate = model => {
    Notifications.belongsTo(model.User, {
      foreignKey: {
        allowNull: true
      }
    });
    Notifications.belongsTo(model.Goals, {
      foreignKey: {
        allowNull: true
      }
    });
    Notifications.belongsTo(model.Milestones, {
      foreignKey: {
        allowNull: true
      }
    });
    Notifications.belongsTo(model.Buddy, {
      foreignKey: {
        allowNull: true
      }
    });
    Notifications.belongsTo(model.Followers, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Notifications;
};
