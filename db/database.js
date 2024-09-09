const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create a connection to SQLite database in the 'database' folder
const db = new sqlite3.Database(
  path.join(__dirname, "bookings_db.sqlite"),
  (err) => {
    if (err) {
      console.error("Error opening database:", err);
    } else {
      console.log("Connected to SQLite database (bookings_db).");

      // Create the bookings table if it doesn't exist
      db.run(`CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      startDate DATE,
      endDate DATE
    )`);
    }
  }
);

module.exports = db;
