var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '--------',
  database : 'dk_nascar'
});
connection.connect();

connection.query('SELECT * FROM drivers', function(err, rows, fields)
{
  if (err) throw err;

  console.log(rows[0]);
});

connection.end();
