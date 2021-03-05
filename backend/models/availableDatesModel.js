const mongoose = global.mongoose;

const AvailableDates = mongoose.model("AvailableDates", {
  id: {
    type: String,
    required: true,
    unique: true,
  },
  apartmentId: {
    type: Number,
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

module.exports = {
  availableDates: AvailableDates,
};
