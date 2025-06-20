============================================
Inventory Management System – Final Project
============================================

👨‍💻 Developed by: Anmol
📚 Course: MSE800 – Professional Software Engineering
🏫 Programme: Master of Software Engineering
📁 Project Folder: inventory-system

------------------------------
🔧 How to Run the Application
------------------------------

1. ✅ Prerequisites:
   - Node.js installed (https://nodejs.org)
   - MySQL or XAMPP installed and running
   - Code editor ( VS Code)

2. 📥 Unzip the folder and open it in VS Code:
   - inventory-system/

3. 🔌 Install dependencies:
   Open terminal and run:
   > npm install

4. ⚙️ Setup the MySQL database:
   - Open phpMyAdmin
   - Create a new database called: **inventory_db**
   - Import the file: **inventory_db.sql**

5. 🔒 Credentials (already inserted in DB):
   - Admin: `admin` / `admin123`
   - User: `user` / `user123`

6. ▶️ Start the app:
   > node app.js

7. 🌐 Open your browser:
   > http://localhost:3000

------------------------------
📁 Project Structure
------------------------------
- app.js ..................... Main server file
- db/connection.js ........... MySQL connection config
- routes/inventory.js ........ All inventory management routes
- views/index.ejs ............ Dashboard UI (EJS template)
- views/login.ejs ............ Login page
- public/ .................... Static assets (if used)
- inventory_db.sql ........... MySQL DB export
- reflection_report.pdf ...... Report for submission

------------------------------
✅ Features Implemented
------------------------------
✔ User & Admin login system  
✔ Role-based access control  
✔ Add / Edit / Delete products (admin only)  
✔ Real-time stock table with low-stock highlight  
✔ Search/filter by product name  
✔ Total Price (Qty × Price) column  
✔ PDF export of inventory  
✔ Protected routes (auth middleware)  
✔ Neat and colorful UI theme  



