const mongoose = require("mongoose")

//user Schema
const userSchema = new mongoose.Schema(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      gender: { type: String, required: true },
      dateOfBirth: { type: String, required: true },
      type: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
  //user model
  module.exports = mongoose.model("user", userSchema);