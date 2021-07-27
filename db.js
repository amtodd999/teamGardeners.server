const {Sequelize} = require('sequelize');

const db = new Sequelize(process.env.URL_SECRET);

//const db = new Sequelize("postgres://postgres:KristynaBV!80!@localhost:5432/team-gardener");

module.exports = db;