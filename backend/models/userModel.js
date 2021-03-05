const mongoose = global.mongoose;

const User = mongoose.model("User", {
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
  id: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = {
  user: User,
};
