const express = require("express");
const bodyParser = require("body-parser");
const controller = require("./users.controller.js");
const middleware = require("./users.middleware.js");

const usersRouter = express.Router();
usersRouter.use(bodyParser.json());

usersRouter.post("/", middleware.checkBody, controller.createUser);

module.exports = usersRouter;
