var User = require('../models/user');

/*====================================================
 Authentication routes
 ====================================================*/

module.exports = {
    register: function (req, res, next) {
        User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
            .then(function (user) {
                user.generateToken();
                return user.save();
            })
            .then(function (user) {
                var userToSend = user.toJSON();
                delete userToSend.password;
                delete userToSend.passwordSalt;
                return res.json({user: userToSend});
            })
            .catch(function (err) {
                return next(err);
            })
    },

    login: function (req, res, next) {
        return res.json({
            token: req.user.token,
            tokenExpiration: req.user.tokenExpiration
        })
    }
};