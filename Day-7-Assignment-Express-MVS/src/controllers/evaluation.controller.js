const express = require("express");
const app = express()
const Evaluation = require("../models/evaluation.model")

//Evaluation curd ops

app.get("", async (req, res) => {
    try {
      const evaluation = await Evaluation.find().lean().exec();
      return res.status(200).send({ evaluation: evaluation });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  });
  
  app.post("", async (req, res) => {
    try {
      const evaluation = await Evaluation.create(req.body);
      return res.status(201).send({ evaluation: evaluation });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  });
  module.exports = app