const { DataTypes } = require("sequelize");
const db = require("../db");

const Notes = db.define("notes", {
    owner_id: {
        type: DataTypes.INTEGER
    },
    plant_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    note: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Notes;