const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const PDFDocument = require('pdfkit');

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  next();
}

// Middleware to check if user is admin
function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.send('Access denied: Admins only.');
  }
}

// GET: Show all products or filter by search
router.get('/', isLoggedIn, (req, res) => {
  const search = req.query.search;
  let query = 'SELECT * FROM products';
  let params = [];

  if (search) {
    query += ' WHERE name LIKE ?';
    params.push('%' + search + '%');
  }

  db.query(query, params, (err, results) => {
    if (err) throw err;
    res.render('index', { products: results, search: search || '' });
  });
});

// POST: Add new product OR update existing one (admin only)
router.post('/add', isLoggedIn, isAdmin, (req, res) => {
  const { name, quantity, price } = req.body;

  db.query(
    `INSERT INTO products (name, quantity, price)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE 
     quantity = quantity + VALUES(quantity),
     price = VALUES(price)`,
    [name, quantity, price],
    (err) => {
      if (err) throw err;
      res.redirect('/');
    }
  );
});

// GET: Delete product (admin only)
router.get('/delete/:id', isLoggedIn, isAdmin, (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// POST: Update product (admin only)
router.post('/edit/:id', isLoggedIn, isAdmin, (req, res) => {
  const id = req.params.id;
  const { name, quantity, price } = req.body;

  db.query(
    'UPDATE products SET name = ?, quantity = ?, price = ? WHERE id = ?',
    [name, quantity, price, id],
    (err) => {
      if (err) throw err;
      res.redirect('/');
    }
  );
});

// GET: Download product list as PDF
router.get('/download-pdf', isLoggedIn, (req, res) => {
  db.query('SELECT * FROM products', (err, products) => {
    if (err) throw err;

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=inventory.pdf');

    doc.pipe(res);

    doc.fontSize(18).text('Inventory Report', { align: 'center' });
    doc.moveDown();

    // Table headers
    doc.fontSize(12).text('Name', 50, doc.y);
    doc.text('Qty', 200, doc.y);
    doc.text('Price ($)', 250, doc.y);
    doc.text('Added Date', 330, doc.y);
    doc.moveDown();

    // Table rows
    products.forEach(product => {
      doc.text(product.name, 50, doc.y);
      doc.text(product.quantity.toString(), 200, doc.y);
      doc.text(Number(product.price).toFixed(2), 250, doc.y);
      doc.text(new Date(product.created_at).toDateString(), 330, doc.y);
      doc.moveDown();
    });

    doc.end();
  });
});


module.exports = router;
