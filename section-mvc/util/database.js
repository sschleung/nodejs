

const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'nodejs-database',
    password:'159357'
});

module.exports = pool.promise();