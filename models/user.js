module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
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
                notEmpty: true,
                isUnique: function (value, next) {
                    User.find({
                        where: {
                            username: value
                        }
                    }).then(user => {
                        if (user) {
                            return next('Username already in use!')
                        }
                        next()
                    }).catch(err => {
                        next(err)
                    })

                }
            }
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
                isUnique: function (value, next) {
                    User.find({
                        where: {
                            email: value
                        }
                    }).then(user => {
                        if (user) {
                            return next('Email already in use!')
                        }
                        next()
                    }).catch(err => {
                        next(err)
                    })
                }
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

    User.associate = function (model) {
        User.hasMany(model.Goals, {
            onDelete: 'cascade'
        });
        User.hasMany(model.Milestones, {
            onDelete: 'cascade'
        });

    }

    return User;

}