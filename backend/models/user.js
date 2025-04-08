const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true, // ensure it's required if you want to enforce it
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
