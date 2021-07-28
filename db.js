const {Sequelize} = require('sequelize');

const db = new Sequelize(process.env.URL_SECRET);

module.exports = db;
