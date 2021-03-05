const mongoose = global.mongoose;

const Amenities = mongoose.model("Amenities", {
  id: {
    type: String,
    required: true,
    unique: true,
  },

  apartmentId: {
    type: Number,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  description: String,
});

module.exports = {
  amenitie: Amenities,
};
