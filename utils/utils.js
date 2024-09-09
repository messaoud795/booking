const moment = require("moment");
const { fullDayTimeslots } = require("../constants/timeslots");

const getTime = (isoDateString) => {
  const date = new Date(isoDateString);

  // Extracting components
  const hours = date.getUTCHours(); // Use getHours() for local time
  const minutes = date.getUTCMinutes(); // Use getMinutes() for local time

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return formattedTime;
};

// Format available slots for display

const getAvailableSlots = () => {
  const currentTime = moment(); // Gets the current time with date
  const currentTimeFormatted = currentTime.format("HH:mm");

  const slots = fullDayTimeslots.filter((slot) => {
    const start = moment(slot.start, "HH:mm");
    // Check if the slot starts after the current time
    return start.isAfter(currentTimeFormatted);
  });
  return slots.map((slot) => ({
    start: moment(slot.start, "HH:mm").format("HH:mm"),
    end: moment(slot.end, "HH:mm").format("HH:mm"),
  }));
};

const setTimeForCurrentDay = (currentDay, ts) => {
  return moment(ts, "HH:mm").set({
    year: currentDay.year(),
    month: currentDay.month(),
    date: currentDay.date(),
  });
};

const getDayAvailableSlots = (
  currentDay,
  dayStart,
  dayEnd,
  bookedSlots,
  currentTime
) => {
  return fullDayTimeslots
    .map((ts) => {
      const timeslotStart = setTimeForCurrentDay(currentDay, ts.start);
      const timeslotEnd = setTimeForCurrentDay(currentDay, ts.end);

      // Check if timeslot is within the day range and not overlapping with any bookings
      const isAvailable =
        timeslotStart.isBetween(dayStart, dayEnd, null, "[)") &&
        timeslotStart.isAfter(currentTime) && // Ensure slot is after the current time
        !bookedSlots.some(
          (b) => timeslotEnd.isAfter(b.start) && timeslotStart.isBefore(b.end)
        );

      return isAvailable
        ? {
            start: timeslotStart.format("YYYY-MM-DDTHH:mm:ssZ"),
            end: timeslotEnd.format("YYYY-MM-DDTHH:mm:ssZ"),
          }
        : null;
    })
    .filter((slot) => slot !== null);
};

module.exports = {
  getTime,
  getAvailableSlots,
  getDayAvailableSlots,
};
