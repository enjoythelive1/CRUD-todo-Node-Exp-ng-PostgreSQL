var passport = require('passport');
var passportJwt = require('passport-jwt');
var User = require('../models/user');
var JwtStrategy = passportJwt.Strategy;
var ExtractJwt = passportJwt.ExtractJwt;
var jwtConfig = require("../config/jwt-config.js");


passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: jwtConfig.secretOrKey
}, function (jwt_payload, done) {
    User.findById(jwt_payload.sub)
        .then(function (user) {
            done(null, user || false)
        }, function (err) {
            done(err, false)
        });
}));
