const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const itemsRouter = express.Router();
itemsRouter.use(bodyParser.json());

// Create an item
itemsRouter.post("/", (req, res) => {
  const file = fs.readFileSync("./db/items.json");
  const items = JSON.parse(file);
  const itemAdded = req.body;

  let prevId = items[items.length - 1].id;
  prevId++;

  const createdItem = { ...itemAdded, id: prevId };
  items.push(createdItem);

  fs.writeFile("./db/items.json", JSON.stringify(items), (err) => {
    if (err) {
      res.status(500);
      console.log(`An error occured`);
    }
    res.status(200).json(createdItem);
  });
});

// Get all items
itemsRouter.get("/", (req, res) => {
  const file = fs.readFileSync("./db/items.json");
  const items = JSON.parse(file);
  res.status(200).send(items);
});

// Get one item
itemsRouter.get("/:id", (req, res) => {
  const file = fs.readFileSync("./db/items.json");
  const items = JSON.parse(file);
  const id = req.params.id;

  const itemFound = items.find((item) => item.id == parseInt(id));

  if (!itemFound) {
    res.status(404).send("Item not found");
    return;
  }
  res.status(200).json(itemFound);
});

//Update an item
itemsRouter.put("/:id", (req, res) => {
  const file = fs.readFileSync("./db/items.json");
  const items = JSON.parse(file);
  const itemUpdate = req.body;

  const id = req.params.id;
  const idFound = items.findIndex((item) => item.id == parseInt(id));

  if (idFound == -1) {
    res.status(404).json({ error: "id not found" });
    return;
  }
  items[idFound] = { ...items[idFound], ...itemUpdate };

  fs.writeFile("./db/items.json", JSON.stringify(items), (err) => {
    if (err) {
      res.status(500).json({ error: "An error occured" });
    }
    res.json(items[idFound]);
  });
});

//Deleting an item
itemsRouter.delete("/:id", (req, res) => {
  const file = fs.readFileSync("./db/items.json");
  const items = JSON.parse(file);

  const id = req.params.id;
  const idFound = items.findIndex((item) => item.id == parseInt(id));

  if (idFound == -1) {
    res.status(404).json({ error: "id not found" });
    return;
  } else {
    items.splice(idFound, 1);
  }
  fs.writeFile("./db/items.json", JSON.stringify(items), (err) => {
    if (err) {
      res.status(500).json({ error: "An error occured" });
    }
    res.json(items);
  });
});

module.exports = itemsRouter;
