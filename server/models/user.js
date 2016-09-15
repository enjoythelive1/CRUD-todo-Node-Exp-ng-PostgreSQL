var Sequelize = require('sequelize');
var sequelize = require('../db/sequelize');
var crypto = require("crypto");
var jsonwebtoken = require("jsonwebtoken");

var User = module.exports = sequelize.define('users', {
    firstname: {
        type: Sequelize.DataTypes.STRING
    },

    lastname: {
        type: Sequelize.DataTypes.STRING
    },

    username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true
    },

    password: {
        type: Sequelize.DataTypes.BLOB,
        set: function (val) {
            var salt = crypto.randomBytes(16);
            var passHash = crypto.pbkdf2Sync(val, new Buffer(salt), 100000, 512, 'sha512');

            this.setDataValue('passwordSalt', salt);
            this.setDataValue('password', passHash);
        }
    },

    passwordSalt: {
        type: Sequelize.DataTypes.BLOB
    },

    token: {
        type: Sequelize.DataTypes.STRING
    },

    tokenExpiration: {
        type: Sequelize.DataTypes.DATE
    }
}, {
    paranoid: false,
    timestamps: false,
    instanceMethods: {
        generateToken: function () {
            // set expiration to 60 days
            this.tokenExpiration = new Date();
            this.tokenExpiration.setDate(this.tokenExpiration.getDate() + 60);

            var payload = {
                sub: this.id,
                exp: parseInt(this.tokenExpiration.getTime() / 1000),
                username: this.username,
                name: {
                    firstname: this.firstname,
                    lastname: this.lastname
                }
            };

            this.token = jsonwebtoken.sign(payload, require('../config/jwt-config').secretOrKey);
        },

        validPassword: function (password) {
            var passHash = new Buffer(crypto.pbkdf2Sync(password, this.passwordSalt, 100000, 512, 'sha512'));
            var userPassHash = new Buffer(this.password);

            return passHash.equals(userPassHash);
        }
    }
});

User.sync()
    .then(function () {
        console.log('User model synced'.green)
    }, function (err) {
        console.error('Failed syncing model User, because of', err);
    });