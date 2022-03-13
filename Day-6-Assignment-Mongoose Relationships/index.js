const bodyParser = require("body-parser");
const express = require("express");
const { path } = require("express/lib/application");
const { send } = require("express/lib/response");
const res = require("express/lib/response");

const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://shubham09:qwerty12@cluster0.ry4r4.mongodb.net/assignment6?retryWrites=true&w=majority"
  );
};

//Uesr Schema

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: false },
});

//user Model

const User = mongoose.model("user", userSchema);

//Book Schema

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    body: { type: String, required: true },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      required: true,
    },
    checkedoutId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Checkedout",
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

//Bookmodel
const Book = mongoose.model("book", bookSchema);

//Section schema

const sectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

//Section Model

const Section = mongoose.model("section", sectionSchema);

//authorSchema

const authorSchema = new mongoose.Schema({
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
});

//authorModel
const Author = mongoose.model("author", authorSchema);

//book_author Schema

const bookAuthorSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
    required: true,
  },
});

//book_author model

const Bookauthor = mongoose.model("Bookauthor", bookAuthorSchema);

//checkedOut_Schema

const checkedOutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
    required: true,
  },
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "section",
    required: true,
  },
  checkouttime: {
    type: String,
    required: false,
    default: null,
  },
  checkintime: {
    type: String,
    required: false,
    default: null,
  },
});

//ckeckedout_Model

const Checkedout = mongoose.model("Checkedout", checkedOutSchema);

//user crud ops

app.get("/user", async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    return res.status(200).send({ user: user });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

app.post("/user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).send({ user: user });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

//book crud ops

app.get("/book", async (req, res) => {
  try {
    const book = await Book.find().lean().exec();

    return res.status(200).send({ book: book });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

app.post("/book", async (req, res) => {
  try {
    const book = await Book.create(req.body);

    return res.status(201).send({ book: book });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

//section crud ops

app.get("/section", async (req, res) => {
  try {
    const section = await Section.find().lean().exec();
    return res.status(200).send({ section });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

app.post("/section", async (req, res) => {
  try {
    const section = await Section.create(req.body);
    return res.status(200).send({ section: section });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

//author crud ops

app.get("/author", async (req, res) => {
  try {
    const author = await Author.find().lean().exec();

    return res.status(201).send({ author: author });
  } catch (error) {
    return res.status(500).send({ message: error.message });
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

//book author crud ops

app.get("/bookauthor", async (req, res) => {
  try {
    const bookauthor = await Bookauthor.find().lean().exec();

    return res.status(201).send({ bookauthor: bookauthor });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

app.post("/bookauthor", async (req, res) => {
  try {
    const bookauthor = await Bookauthor.create(req.body);

    return res.status(201).send({ bookauthor: bookauthor });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

//checkedout crud ops

app.get("/checkout", async (req, res) => {
  try {
    const checkout = await Checkedout.find().lean().exec();

    return res.status(201).send({ checkout: checkout });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

app.post("/checkout", async (req, res) => {
  try {
    const checkout = await Checkedout.create(req.body);

    return res.status(201).send({ checkout: checkout });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

//Q1

app.get("/book/:authorId", async (req, res) => {
  try {
    const _id = req.params.authorId;
    const allbooks = await Bookauthor.find({ authorId: _id })
      .populate({
        path: "authorId",
      })
      .populate({ path: "bookId" });
    const books = allbooks.map((book) => {
      return book.bookId;
    });
    const author = allbooks[0].authorId;

    const isUserAuthor = author.userId === undefined ? false : true;
    if (isUserAuthor) {
      const user = await User.findById(author.userId);
      return res.status(200).send({ books, author: user });
    }
    res.status(200).send({ books, author });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//Q2
app.get("/booksection", async (req, res) => {
  try {
    const genre = req.query.genre;
    const sectionId = await Section.findOne({ name: genre }, { _id: 1 });
    const books = await Book.find({ sectionId });
    res.send({ books });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//Q3
app.get("/bookstatus", async (req, res) => {
  try {
    const present = req.query.present;
    const sectionId = await Section.findOne({ name: present }, { _id: 1 });
    const checkedoutId = await Checkedout.find({ sectionId }, { sectionId: 1 });
    const book = await Book.find(
      { checkedoutId },
      { checkedoutId: 1 }
    ).populate("checkedoutId");
    let newarr = [];
    for (var i = 0; i < book.length; i++) {
      if (book[i]["checkedoutId"].checkintime !== null) {
        newarr.push(book[i]);
      }
    }
    console.log(newarr);
    res.status(200).send(newarr);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//Q3 type 2
app.get("/booksleft", async (req, res) => {
  try {
    const checkbook = await Book.find(
      {},
      { name: 1 },
      { checkedoutId: 1 }
    ).populate("checkedoutId");
    let newarr = [];

    for (var i = 0; i < checkbook.length; i++) {
      if (
        checkbook[i]["checkedoutId"] === null ||
        (checkbook[i]["checkedoutId"] !== null &&
          checkbook[i]["checkedoutId"].checkintime !== null)
      ) {
        newarr.push(checkbook[i]);
      }
    }

    console.log(newarr);
    res.status(200).send(newarr);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//Q4

app.get("/section/:id",async (req,res) => {
try {
  const {id} = req.params
  const sectionbook = await Book.find({},{id})
  res.status(200).send(sectionbook)
} catch (error) {
  res.status(400).send({ error: error.message });
}
})

app.listen(4500, async () => {
  try {
    await connect();
  } catch (error) {
    console.log(error);
  }

  console.log("listening on port 4500");
});
