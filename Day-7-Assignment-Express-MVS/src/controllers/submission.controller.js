const express = require("express");
const router = new express.Router();
const Submission = require("../models/submission.model");
//Student curd ops

router.get("", async (req, res) => {
  try {
    const submission = await Submission.find().lean().exec();
    return res.status(200).send({ submission: submission });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("", async (req, res) => {
  try {
    const submission = await Submission.create(req.body);
    return res.status(201).send({ submission: submission });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});



module.exports = router;
