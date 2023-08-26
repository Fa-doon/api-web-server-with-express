const checkBody = (req, res, next) => {
  if (!req.body.username || !req.body.username.trim()) {
    return res.status(401).json({ message: `Please enter username` });
  }

  if (!req.body.password || !req.body.password.trim()) {
    res.status(401).json({ message: `Please enter password` });
  }

  next();
};

module.exports = { checkBody };
