module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notEmpty: true
      }
    },
    sentBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validation: {
        notEmpty: true,
        isNumeric: true,
        not: ["[a-z]", "i"]
      }
    },
    sentTo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validation: {
        notEmpty: true,
        isNumeric: true,
        not: ["[a-z]", "i"]
      }
    }
  });
  Message.associate = model => {
    Message.belongsTo(model.Buddy, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Message;
};
