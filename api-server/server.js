const express = require("express");
const itemsRouter = require("./items/items-route.js");
const usersRouter = require("./users/users-route.js");

const app = express();
const port = 3000;

app.use("/items", itemsRouter);
app.use("/users", usersRouter);

// app.get("/", (req, res) => {
//   res.status(200).send("This is the home page");
// });

app.get("*", (req, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
