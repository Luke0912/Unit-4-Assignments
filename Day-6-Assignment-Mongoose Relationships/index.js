const bodyParser = require("body-parser");
const express = require("express");

const mongoose = require("mongoose");

const app = express();

app.use(express.json())

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://shubham09:qwerty12@cluster0.ry4r4.mongodb.net/assignment6?retryWrites=true&w=majority"
  );
};

//Author Schema

const authorSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: false },
});

//Author Model

const Author = mongoose.model("author", authorSchema);

//Book schema

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    body: { type: String, required: true },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Book Model

const Book = mongoose.model("book", bookSchema);

//Section Schema

const sectionSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

app.get("/author", async (req, res) => {
  try {
    const author = await Author.find().lean().exec();

    return res.status(200).send({ author: author }); //200 status code ok
  } catch (error) {
    return res.status(500).send({ message: "something went wrong" }); ////500 status code ok
  }
});

app.post("/author", async (req, res) => {
  try {
    const author = await Author.create(req.body);

    return res.status(201).send({ author: author });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

app.listen(4500, async () => {
  try {
    await connect();
  } catch (error) {
    console.log(error);
  }

  console.log("listening on port 4500");
});
