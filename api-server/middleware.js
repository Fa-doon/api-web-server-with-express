const fs = require("fs");

const checkApi_key = (req, res, next) => {
  const file = fs.readFileSync("./db/users.json");
  const userDb = JSON.parse(file);

  const apiKey = req.headers.api_key;
  if (!apiKey) {
    return res
      .status(401)
      .json({ message: `User not authenticated. Please provide api_key` });
  }

  const userFound = userDb.find((user) => user.api_key === apiKey);
  if (!userFound) {
    return res.status(401).json({ message: `User not authenticated` });
  }

  next();
};

const checkAdmin = (req, res, next) => {
  const file = fs.readFileSync("./db/users.json");
  const userDb = JSON.parse(file);

  const apiKey = req.headers.api_key;

  const userFound = userDb.find((user) => user.api_key === apiKey);
  if (userFound.user_type !== "admin") {
    return res.status(403).json({ message: `You are not authorized` });
  }

  next();
};

module.exports = { checkApi_key, checkAdmin };
