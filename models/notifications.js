module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("Notifications", {
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
    }
  });

  Notification.associate = model => {
    Notification.belongsTo(model.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Notification;
};
