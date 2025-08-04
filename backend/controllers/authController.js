const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Owner } = require("../models");

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const owner = await Owner.create({ username, password: hashed });
  res.json({ message: "Owner registered", owner });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const owner = await Owner.findOne({ where: { username } });
  if (!owner) return res.status(404).json({ error: "Not found" });

  const match = await bcrypt.compare(password, owner.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: owner.id }, "secret", { expiresIn: "1d" });
  res.json({ token, ownerId: owner.id });
};
