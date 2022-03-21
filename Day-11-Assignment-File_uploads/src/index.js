const express = require("express");

const userController = require("./controllers/user.controller");

const galleryController = require("./controllers/gallery.controller");

const updateUserController = require("./controllers/updateUser.controller")

const deleteUserController = require("./controllers/DeletUser.controller")

const app = express();

app.use(express.json());

app.use("/user", userController);

app.use("/gallery", galleryController);

app.use("/updateuser", updateUserController);

app.use("/deleteUser",deleteUserController );

module.exports = app;
