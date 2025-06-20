const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',     // ✅ your database host
  user: 'sql12786845',                   // ✅ your database username
  password: '69Uxdk48f4',                // ✅ your database password
  database: 'sql12785845',               // ✅ your database name
  port: 3306                             // ✅ port for MySQL
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err.message);
    return;
  }
  console.log('✅ Connected to remote MySQL database');
});

module.exports = db;
