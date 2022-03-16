const nodemailer = require("nodemailer");

  // create reusable transporter object using the default SMTP transport
module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "962a384e409e8f", // generated ethereal user
      pass: "7fad6fa3c9309e", // generated ethereal password
    },
  });