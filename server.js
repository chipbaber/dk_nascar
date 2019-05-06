const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 8081;
  require('dotenv').config();

const mysql = require('mysql');

// connection configurations
const mc = mysql.createConnection({
  connectionLimit : process.env.DB_CONLIMIT,
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE
});

mc.connect(function(err) {
  if (err) {
    console.error('server.js error connecting: ' + err);
    return;
  }

 console.log('server.js connected as id ' + mc.threadId);
});




app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/appRoutes.js'); //importing route
routes(app); //register the route
