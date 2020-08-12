const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const OrederItem = sequelize.define('orderItem',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});

module.exports = OrederItem;