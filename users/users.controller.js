const fs = require("fs");
const randomString = require("randomstring");

const createUser = (req, res) => {
  const file = fs.readFileSync("./db/users.json");
  const usersDb = JSON.parse(file);

  const newUser = req.body;

  // check if username already exists/no duplicate username
  const existingUser = usersDb.find(
    (user) => user.username === newUser.username
  );
  if (existingUser) {
    return res.status(400).json({ message: `Username already exists` });
  }

  const randomKey = randomString.generate({
    length: 15,
    charset: "alphabetic",
  });
  newUser.api_key = randomKey;

  if (newUser.username == "Ada") {
    newUser.user_type = "admin";
  } else {
    newUser.user_type = "user";
  }

  usersDb.push(newUser);

  fs.writeFile("./db/users.json", JSON.stringify(usersDb), (err) => {
    if (err) {
      res.status(500).json({ message: `Internal server error` });
    }
    res.status(200).json(newUser);
  });
};

module.exports = { createUser };
