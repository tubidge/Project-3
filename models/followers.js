module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define("Followers", {
    follower: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    getNotifications: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });

  Followers.associate = model => {
    Followers.belongsTo(model.Goals, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Followers;
};
