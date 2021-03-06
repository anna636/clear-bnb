const mongoose = global.mongoose;

const User = mongoose.model("User", {
  fullName: {
    type: String,
    unique: false,
    required: true,
  },
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
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,   // Comment out if adding new appartments with Postman!!
  },
  title: {
    type: String,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  maxGuests: {
    type: Number,
    required: true,
  },
  gallery: [
    {
      type: String,
      required: true
    },
  ],
  amenities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Amenities",
    },
  ],
  availableDates:
  {
    availableStartDate: {
      type: String,
      required: true,
    },
    availableEndDate: {
      type: String,
      required: true,
    }
  },

  bookedDates: [
    {
      type: String,
    }
  ],
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

const Amenities = mongoose.model("Amenities", {
  name: {
    type: String,
    required: true,
  },

  icon: {
    type: String,
    required: true,
  },
});

module.exports = {
  users: User,
  apartments: Apartment,
  amenities: Amenities,
  bookings: Booking,
};
