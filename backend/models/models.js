const mongoose = global.mongoose;

const User = mongoose.model("User", {
  /*id: {
    type: String,
    required: true,
    unique: true,
  },*/
  fullName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Apartment = mongoose.model("Apartment", {
  /*id: {
    type: String,
    required: true,
    unique: true,
  },*/
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },
  region: String,
});

const Booking = mongoose.model("Booking", {
  /*id: {
    type: String,
    required: true,
    unique: true,
  },*/
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  apartmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apartment",
    required: true,
  },

  startDate: {
    type: Number,
    required: true,
  },
  endDate: {
    type: Number,
    required: true,
  },
});

const AvailableDates = mongoose.model("AvailableDates", {
  /*id: {
    type: String,
    required: true,
    unique: true,
  },*/
  apartmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apartment",
    required: true,
  },
  availableStartDate: {
    type: Number,
    required: true,
  },
  availableEndDate: {
    type: Number,
    required: true,
  },
});

const Amenities = mongoose.model("Amenities", {
 /* id: {
    type: String,
    required: true,
    unique: true,
  },*/

  apartmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apartment",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  description: String,
});

module.exports = {
  users: User,
  apartments: Apartment,
  amenities: Amenities,
  availableDates: AvailableDates,
  bookings: Booking,
};
