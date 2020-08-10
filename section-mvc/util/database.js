const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs-database','root','159357',{
    host:'localhost',
    dialect:'mysql'
});

module.exports = sequelize;
// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'nodejs-database',
//     password:'159357'
// });

// module.exports = pool.promise();