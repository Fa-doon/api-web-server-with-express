const fs = require("fs");

//create item
const postItem = (req, res) => {
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
};

const getAllItems = (req, res) => {
  const file = fs.readFileSync("./db/items.json");
  const items = JSON.parse(file);
  res.status(200).send(items);
};

//get one item
const getOneItem = (req, res) => {
  const file = fs.readFileSync("./db/items.json");
  const items = JSON.parse(file);
  const id = req.params.id;
  const itemFound = items.find((item) => item.id == parseInt(id));
  if (!itemFound) {
    res.status(404).json({ message: `Item not found` });
    return;
  }
  res.status(200).json(itemFound);
};

// update an item
const updateItem = (req, res) => {
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
};

// delete an item
const deleteItem = (req, res) => {
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
    res.json({ message: `Item successfully deleted` });
  });
};

module.exports = {
  postItem,
  getAllItems,
  getOneItem,
  updateItem,
  deleteItem,
};
