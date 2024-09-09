const Booking = require("../models/bookings");
const moment = require("moment");
const { getDayAvailableSlots } = require("../utils/utils");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { username, startDate, endDate } = req.body;
    const booking = await Booking.createBooking(username, startDate, endDate);
    res.status(201).json({
      message: "Booking is created successfully!",
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all available timeslots between startDate (or now) and endDate
exports.getAvailableTimeslots = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Validate the query params
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Please provide startDate and endDate in the query" });
    }

    // Convert the query parameters into moment objects
    const now = moment(); // Current time
    const start = moment(startDate); // The requested startDate
    const end = moment(endDate); // The requested endDate

    // Ensure that start is not earlier than the current time
    const effectiveStart = start.isBefore(now) ? now : start;

    // Fetch booked slots between startDate and endDate from the database
    const bookings = await Booking.getAvailableTimeslots(
      effectiveStart.format("YYYY-MM-DD  HH:mm"),
      end.format("YYYY-MM-DD  HH:mm")
    );
    // Filter the available timeslots
    const availableTimeslots = generateAvailableTimeslots(
      bookings,
      effectiveStart,
      end
    );

    res.status(200).json(availableTimeslots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Utility function to generate available timeslots within the specified range
const generateAvailableTimeslots = (bookings, start, end) => {
  const currentTime = moment();
  const bookedSlots = bookings.map((b) => ({
    start: moment(b.startDate),
    end: moment(b.endDate),
  }));

  const availableSlots = [];

  // Iterate over each day in the range
  let currentDay = moment(start).startOf("day");
  const endDay = moment(end).startOf("day"); // Use startOf for endDay to exclude it from the timeslot generation

  while (currentDay.isBefore(endDay)) {
    // Use isBefore to ensure we don't include the end day
    const dayStart = currentDay.clone().startOf("day");
    const dayEnd = currentDay.clone().endOf("day");

    // Filter timeslots within the current day range
    const dayAvailableSlots = getDayAvailableSlots(
      currentDay,
      dayStart,
      dayEnd,
      bookedSlots,
      currentTime
    );

    availableSlots.push(...dayAvailableSlots);
    currentDay.add(1, "day");
  }

  return availableSlots;
};
