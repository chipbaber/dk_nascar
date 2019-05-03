'user strict';
//shared user connection for REST services
var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '-------',
    database : 'dk_nascar',
    port: 3306
});

connection.connect(function(err) {
  if (err) {
    console.error('db.js error connecting: ' + err);
    return;
  }

 console.log('db.js connected as id ' + connection.threadId);
});

module.exports = connection;
