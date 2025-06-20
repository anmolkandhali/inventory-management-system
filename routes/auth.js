const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Login form page
router.get('/login', (req, res) => {
  res.render('login', { error: '' });
});

// Handle login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        req.session.user = results[0];
        res.redirect('/');
      } else {
        res.render('login', { error: 'Invalid credentials' });
      }
    }
  );
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
