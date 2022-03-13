const mongoose = require("mongoose")

//student schema
const studentSchema = new mongoose.Schema(
    {
      rollId: { type: String, required: true },
      currentbatch: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
  
  //student model
  module.exports = mongoose.model("student", studentSchema);