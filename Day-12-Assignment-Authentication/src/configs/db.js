const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://pankajKandpal:pankand@cluster0.g4xc3.mongodb.net/authentication?retryWrites=true&w=majority"
  );
};
