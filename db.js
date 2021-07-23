const {Sequelize} = require('sequelize');

const db = new Sequelize(process.env.URL_SECRET || `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/<dbName>`, {
    dialect: 'postgres',
    ssl: process.env.ENVIRONMENT === 'production'
});

module.exports = db;