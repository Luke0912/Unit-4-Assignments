const mongoose = require("mongoose")

//batch Schema
const batchSchema = new mongoose.Schema(
    {
      batchname: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
  
  //batch model
  module.exports = mongoose.model("batch", batchSchema);
  