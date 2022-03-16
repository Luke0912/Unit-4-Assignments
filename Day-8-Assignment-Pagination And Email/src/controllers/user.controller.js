const express = require("express");

const app = require("..");

const User = require("../models/user.model");
const transporter = require("../configs/mail");
const path = require("path");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const page = req.query.page;
    const pagesize = req.query.pagesize;

    const skip = (page-1) * pagesize;

    const user = await User.find().skip(skip).limit(pagesize).lean().exec();

    const totalpage = Math.ceil(
      (await User.find().countDocuments()) / pagesize
    );

    return res.status(200).send({ user, totalpage });
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
});

router.post("", async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log();
    await transporter.sendMail({
      from: '"Amazon admin" <admin@amazon.com>', // sender address
      to: user.email, // list of receivers
      subject: `Welcome to ABC system ${user.firstname} ${user.lastname}`, // Subject line
      text: `Hi ${user.firstname}, Please confirm your email address`, // plain text body
      html: `<b>${user.firstname} ${user.lastname} has registered with us Please welcome ${user.firstname} ${user.lastname}</b>`, // html body
    });

    return res.status(201).send({ message: "user registration successfull" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
