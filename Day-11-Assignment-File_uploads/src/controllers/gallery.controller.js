const express = require("express");

const path = require("path");

const app = require("..");

const User = require("../models/gallery.model");

const uploads = require("../midlewares/uploads");

const router = express.Router();


  router.post("", uploads.fields({name:"galleryPic",maxCount:5}), async (req, res) => { //can uplaod multiple file number of pics uploaded
    try {
        const pics = await User.create({
            galleryPic : req.file.path,
          });
      return res.status(200).send(pics);
    } catch (error) {
      return res.status(404).send({ message: error.message });
    }
  });

  module.exports = router;