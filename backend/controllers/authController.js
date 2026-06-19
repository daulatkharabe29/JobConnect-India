const jwt = require("jsonwebtoken");

const ADMIN = {
  username: "admin",
  password: "admin123"
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (
    username === ADMIN.username &&
    password === ADMIN.password
  ) {
    const token = jwt.sign(
      { role: "admin" },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
};

module.exports = { login };