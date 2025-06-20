const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./db/connection');
const inventoryRoutes = require('./routes/inventory');
const authRoutes = require('./routes/auth');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Session config
app.use(session({
  secret: 'secretKey123',
  resave: false,
  saveUninitialized: true
}));

// Middleware to pass session user to all views
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use('/', authRoutes);       // Login/logout routes
app.use('/', inventoryRoutes);  // Product routes

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
