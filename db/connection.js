// db/connection.js
const mysql = require('mysql2');

// Create connection to MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // XAMPP default
  password: '',        // Leave blank for XAMPP default
  database: 'inventory_db' // Your database name
});

// Connect and show result
connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected!');
});

module.exports = connection;
