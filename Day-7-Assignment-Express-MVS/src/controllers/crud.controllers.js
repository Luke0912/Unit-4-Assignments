const express = require("express");
const router = new express.Router();
const Submission = require("../models/submission.model");

//Q1
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const submission = await Submission.find({ evaluationId: id });
    console.log(submission);
    return res.status(200).send(submission);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

router.get("", async (req, res) => {
  try {
    const highestmarks = await Submission.find({}).populate("student_id");
    highestmarks.sort((a, b) => {
      return Number(b.marks) - Number(a.marks);
    });

    return res.status(200).send(highestmarks[0]);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});
module.exports = router;
