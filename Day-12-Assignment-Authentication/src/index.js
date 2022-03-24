const express = require("express");
const connect = require("./configs/db");

const postController = require("./controllers/post.controllers");

const { register, login } = require("./controllers/auth.controller");
const app = express();

app.use(express.json());

app.post("/register", register);

app.post("/login", login);

app.use("/posts", postController);

app.listen(5000, async () => {
  try {
    await connect();
    console.log("listening on port 5000");
  } catch (err) {
    console.log(err.message);
  }
});
