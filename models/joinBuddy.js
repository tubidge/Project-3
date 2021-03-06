module.exports = (sequelize, DataTypes) => {
  const Buddy = sequelize.define("Buddy", {
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notEmpty: true
      }
    },
    endDate: {
      type: DataTypes.DATE,
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
    chatChannel: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined,
      validation: {
        notEmpty: true
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
  };

  return Buddy;
};
