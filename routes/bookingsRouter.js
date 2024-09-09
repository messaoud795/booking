const express = require("express");
const {
  getAvailableTimeslots,
  createBooking,
} = require("../controllers/bookingsController");
const router = express.Router();

// Route for creating a new booking
router.post("/booking/create", createBooking);

// Route for getting available timeslots for a day or multiple days range
router.get("/available-timeslots", getAvailableTimeslots);

module.exports = router;
