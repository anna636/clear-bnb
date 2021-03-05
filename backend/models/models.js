const user = require("./userModel.js");
const booking = require("./bookingModel.js");
const apartment = require("./apartmentModel.js");
const amenities = require("./amenitiesModel.js");
const availableDates = require("./availableDatesModel.js");


module.exports = {
  users: user,
  bookings: booking,
  apartments: apartment,
  amenities: amenities,
  availableDates: availableDates,
};