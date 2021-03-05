const mongoose = global.mongoose;

const Booking = mongoose.model("Booking", {
  id: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  apartmentId: {
    type: Number,
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

module.exports = {
  booking: Booking,
};
