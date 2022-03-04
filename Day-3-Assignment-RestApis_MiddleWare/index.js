const express = require("express");

const app = express();

app.get("/books", logger, (req, res) => {
  res.send();
});

function logger(res, req, next) {
  console.log("Fetching all books");
  next();
}

app.get("/book/:name", singleBook, (req, res) => {
  res.send({ bookNAme: req.name });
});

function singleBook(req, res, next) {
  const {name}= req.params
  req.name = name
  next();
}

const PORT = 4000;
app.listen(PORT, () => {
  console.log("Listening on port 4000");
});
