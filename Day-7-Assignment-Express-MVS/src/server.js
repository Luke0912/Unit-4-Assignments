const router = require("./index");

const express = require("express");

const app = express();

app.use(express.json());

app.use(router);

const connect = require("./configs/db");

app.listen(5500, async () => {
  try {
    await connect();
  } catch (error) {
    console.log(error);
  }

  console.log("listening on port 5500");
});
