const db = require("../db/database");

// Create a new booking
exports.createBooking = (username, startDate, endDate) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO bookings (username, startDate, endDate) VALUES (?, ?, ?)`;
    db.run(query, [username, startDate, endDate], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, username, startDate, endDate });
      }
    });
  });
};

// Fetch all available timeslots for a range of dates
exports.getAvailableTimeslots = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM bookings 
      WHERE (startDate >= ? AND startDate <= ?) 
      OR (endDate >= ? AND endDate <= ?)`;

    db.all(query, [startDate, endDate, startDate, endDate], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
