'user strict';
//shared user connection for REST services
var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
  connectionLimit : process.env.DB_CONLIMIT,
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

connection.connect(function(err) {
  if (err) {
    console.error('db.js error connecting: ' + err);
    return;
  }

 console.log('db.js connected as id ' + connection.threadId);
});

module.exports = connection;
