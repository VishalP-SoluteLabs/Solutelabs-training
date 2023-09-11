// const Sequelize = require('sequelize');  //Capital 'S' because we are calling a constructor (name can be anyone though)

// const sequelize = new Sequelize('node-complete', 'root', '123456', {
//     dialect: 'mysql',     //'dialect' means data exchange language or type of sql engine that we are going to run
//     host: 'localhost'
// });


// module.exports = sequelize;



// Using mysql without sequelize:
const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    database: 'node-complete',
    password:'123456'
});

module.exports = pool.promise();