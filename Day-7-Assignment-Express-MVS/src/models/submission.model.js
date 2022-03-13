const mongoose = require("mongoose")

//submission Schema
const submissionSchema = new mongoose.Schema(
    {
      evaluationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "evaluation",
        required: true,
      },
      student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      marks: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
  
  //submission model
  module.exports = mongoose.model("submission", submissionSchema);
  