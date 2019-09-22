const mysql = require('mysql');
const connection = mysql.createPool({
  connectionLimit: 10,
  host: 'us-cdbr-iron-east-02.cleardb.net',
  user: 'b4baf6e05af88d',
  password: 'f6f171b8',
  database: 'heroku_54da4dae1aaaab8',
});

module.exports = connection; 
