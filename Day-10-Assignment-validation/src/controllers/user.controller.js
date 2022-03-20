const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const User = require("../models/user.model");

router.post(
  "",
  body("first_name").not().isEmpty(),
  body("last_name").not().isEmpty(),
  body("email").not().isEmpty().isEmail(),
  body("pincode").not().isEmpty().isLength({ min: 6 }),
  body("age")
    .not()
    .isEmpty()
    .custom((val) => {
      if (val < 1 || val > 60) {
        throw new Error("Incorrect age provided");
      }
      return true;
    }),
  body("gender")
    .not()
    .isEmpty()
    .custom((val) => {
      if (val === "Male" || val === "Female" || val === "Others") {
        return true;
      }
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      console.log({ errors });
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await User.create(req.body);
      res.status(201).send(user);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
);

module.exports = router;
