module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

    profilePic: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    }
  });

  User.associate = function(model) {
    User.hasMany(model.Goals, {
      onDelete: "cascade"
    });
    User.hasMany(model.Milestones, {
      onDelete: "cascade"
    });
    User.hasMany(model.Buddy, {
      onDelete: "cascade"
    });
  };

  return User;
};
