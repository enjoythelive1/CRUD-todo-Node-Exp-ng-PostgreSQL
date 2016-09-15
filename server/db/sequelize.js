var Sequelize = require('sequelize');
module.exports = new Sequelize(require('../config/database').conString);