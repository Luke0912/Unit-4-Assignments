const express = require("express");
const app = express()
const Student = require("../models/student.model")
//Batch curd ops

app.get("", async (req, res) => {
    try {
      const student = await Student.find().lean().exec();
      return res.status(200).send({ student: student });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  });
  
  app.post("", async (req, res) => {
    try {
      const student = await Student.create(req.body);
      return res.status(201).send({ student: student });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  });

  module.exports = app