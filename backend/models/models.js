const mongoose = global.mongoose;

const User = mongoose.model("User", {
  fullName: {
    type: String,
    unique: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
});

const Apartment = mongoose.model("Apartment", {
  ownerId: {
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

  maxGuests: {
    type: Number,
    required: true,
  },

  gallery: [],

  amenities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Amenities",
    },
  ],

  availableDates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AvailableDates"
    }
  ]
});

const Booking = mongoose.model("Booking", {
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
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});

const AvailableDates = mongoose.model("AvailableDates", {
  apartmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apartment",
    required: true,
  },
  availableStartDate: {
    type: String,
    required: true,
  },
  availableEndDate: {
    type: String,
    required: true,
  },
});

const Amenities = mongoose.model("Amenities", {
  apartmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apartment",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  icon: String,
});

module.exports = {
  users: User,
  apartments: Apartment,
  amenities: Amenities,
  availableDates: AvailableDates,
  bookings: Booking,
};
