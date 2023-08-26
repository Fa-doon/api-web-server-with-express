const express = require("express");
const bodyParser = require("body-parser");
const controller = require("./items.controller.js");
const globalMiddleware = require("../middleware.js");

const itemsRouter = express.Router();
itemsRouter.use(bodyParser.json());

// Create an item
itemsRouter.post(
  "/",
  globalMiddleware.checkApi_key,
  globalMiddleware.checkAdmin,
  controller.postItem
);

// Get all items
itemsRouter.get(
  "/",
  globalMiddleware.checkApi_key,
  globalMiddleware.checkNormalUser,
  controller.getAllItems
);

// Get one item
itemsRouter.get(
  "/:id",
  globalMiddleware.checkApi_key,
  globalMiddleware.checkNormalUser,
  controller.getOneItem
);

//Update an item
itemsRouter.put(
  "/:id",
  globalMiddleware.checkApi_key,
  globalMiddleware.checkAdmin,
  controller.updateItem
);

// //Deleting an item
itemsRouter.delete(
  "/:id",
  globalMiddleware.checkApi_key,
  globalMiddleware.checkAdmin,
  controller.deleteItem
);

module.exports = itemsRouter;
