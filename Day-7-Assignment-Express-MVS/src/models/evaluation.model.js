const mongoose = require("mongoose")

//evaluation Schema
const evaluationSchema = new mongoose.Schema(
    {
      dateofevaluation: { type: String, required: true },
  
      instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "batch",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  //evaluation model
  module.exports = mongoose.model("evaluation", evaluationSchema);