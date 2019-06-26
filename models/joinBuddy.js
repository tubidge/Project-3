module.exports = (sequelize, DataTypes) => {
  const Buddy = sequelize.define("Buddy", {
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notEmpty: true
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    buddyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validation: {
        isNumeric: true,
        not: ["[a-z]", "i"]
      }
    }
  });

  Buddy.associate = model => {
    Buddy.belongsTo(model.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Buddy.belongsTo(model.Goals, {
      foreignKey: {
        allowNull: false
      }
    });
    Buddy.hasMany(model.Message, {});
  };

  return Buddy;
};
