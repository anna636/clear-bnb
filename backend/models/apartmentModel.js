const mongoose = global.mongoose;

const Apartment = mongoose.model("Apartment", {
  id: {
    type: String,
    required: true,
    unique: true,
  },
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

module.exports = {
  apartment: Apartment,
};
