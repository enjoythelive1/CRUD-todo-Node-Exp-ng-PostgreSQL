var Sequelize = require('sequelize');
var sequelize = require('../db/sequelize');

var Todo = module.exports = sequelize.define('todos', {
    text: {
        type: Sequelize.DataTypes.STRING
    },
    done: {
        type: Sequelize.DataTypes.BOOLEAN
    }

    // TODO: todos belong to User
}, {
    paranoid: false,
    timestamps: false
});

Todo.sync()
    .then(function () {
        console.log('Todo model synced'.green)
    }, function (err) {
        console.error('Failed syncing model Todo, because of', err);
    });